#!/usr/bin/env python3
"""
Smart Context Guard - PreToolUse Hook

Ensures required context files are read before allowing other tools.
Uses directory-based marker files for atomic operations (no race conditions).
"""

import json
import sys
import os
from pathlib import Path

# Add lib to path for imports
sys.path.insert(0, str(Path(__file__).parent / "lib"))
from config import (
    get_pending_reads,
    remove_pending_read,
    cleanup_pending_reads,
    PENDING_READS_DIR,
)


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(1)

    if input_data.get("hook_event_name") != "PreToolUse":
        sys.exit(0)

    cwd = input_data.get("cwd", os.getcwd())
    claude_project_dir = os.environ.get("CLAUDE_PROJECT_DIR", cwd)
    base_dir = Path(claude_project_dir)
    pending_dir = base_dir / PENDING_READS_DIR

    # No pending reads directory = allow everything
    if not pending_dir.exists() or not pending_dir.is_dir():
        sys.exit(0)

    # Get pending files
    pending_files = get_pending_reads(base_dir)

    # Empty list = clean up and allow
    if not pending_files:
        cleanup_pending_reads(base_dir)
        sys.exit(0)

    tool_name = input_data.get("tool_name", "")
    tool_input = input_data.get("tool_input", {})

    # Handle Read tool specially
    if tool_name == "Read":
        file_path = tool_input.get("file_path", "")

        # Try to remove this file from pending (atomic operation)
        if remove_pending_read(base_dir, file_path):
            # Clean up directory if now empty
            cleanup_pending_reads(base_dir)
            sys.exit(0)  # Allow this Read

    # Block: not a Read or Read for non-pending file
    # Re-fetch pending files in case another parallel read removed some
    pending_files = get_pending_reads(base_dir)

    if not pending_files:
        cleanup_pending_reads(base_dir)
        sys.exit(0)

    file_list = "\n".join(f"- `{f}`" for f in pending_files)

    output = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": (
                "**CONTEXT REVIEW REQUIRED**\n\n"
                "You must read all required context files before using other tools.\n\n"
                f"**Remaining files to read ({len(pending_files)}):**\n{file_list}\n\n"
                "Use the Read tool to read these files, then you may continue."
            )
        }
    }

    print(json.dumps(output))
    sys.exit(0)


if __name__ == "__main__":
    main()
