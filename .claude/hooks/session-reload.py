#!/usr/bin/env python3
"""
Session Reload Hook - After Compaction

Outputs instructions to read required context files and creates pending reads list.
"""

import os
import sys
from pathlib import Path

# Add lib to path for imports
sys.path.insert(0, str(Path(__file__).parent / "lib"))
from config import (
    get_required_files,
    cleanup_flag,
    create_pending_reads,
    get_in_progress_tasks,
    build_task_xml,
    PRE_COMPACTION_FLAG,
)


def main() -> int:
    claude_project_dir = os.environ.get("CLAUDE_PROJECT_DIR", "")
    base_dir = Path(claude_project_dir)

    # Get in-progress tasks
    in_progress_tasks = get_in_progress_tasks(base_dir)
    task_xml = build_task_xml(in_progress_tasks, claude_project_dir)

    # Get required files from config
    required_files = get_required_files(base_dir)

    # Add plan files from in-progress tasks to required files
    for task in in_progress_tasks:
        plan_path = task.get('plan_path', '')
        if plan_path:
            if plan_path.startswith('/'):
                required_files.append(plan_path)
            else:
                required_files.append(plan_path)

    # Build file list for prompt
    file_bullets = "\n".join(f"- `{claude_project_dir}/{f}`" if not f.startswith('/') else f"- `{f}`" for f in required_files)

    # Build reload context message - tasks at the top
    output_parts = ["<reload_context_system_message>"]
    output_parts.append("This conversation was recently compacted.")

    if task_xml:
        output_parts.append("")
        output_parts.append(task_xml)

    output_parts.append("")
    output_parts.append("Read these files before continuing:")
    output_parts.append("")
    output_parts.append(file_bullets)
    output_parts.append("")
    output_parts.append(f"For each in-progress task, also read:")
    output_parts.append(f"1. The context file: `{claude_project_dir}/.meridian/tasks/TASK-###/TASK-###-context.md`")
    output_parts.append(f"2. The plan file (if listed above)")
    output_parts.append("")
    output_parts.append("The context file contains the previous agent's progress, decisions, and next steps.")
    output_parts.append("")
    output_parts.append(f"After reviewing, check `{claude_project_dir}/.meridian/relevant-docs.md` for additional required docs.")
    output_parts.append("</reload_context_system_message>")

    print("\n".join(output_parts), end="")

    # Create pending reads directory with marker files
    absolute_files = []
    for f in required_files:
        if f.startswith('/'):
            absolute_files.append(f)
        else:
            absolute_files.append(f"{claude_project_dir}/{f}")
    create_pending_reads(base_dir, absolute_files)

    # Clean up flags
    cleanup_flag(base_dir, PRE_COMPACTION_FLAG)

    return 0


if __name__ == "__main__":
    sys.exit(main())
