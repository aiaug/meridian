#!/usr/bin/env python3
"""
Claude Init Hook - Session Start

Outputs instructions to read required context files and creates pending reads list.
"""

import os
import sys
from pathlib import Path

# Add lib to path for imports
sys.path.insert(0, str(Path(__file__).parent / "lib"))
from config import (
    get_required_files,
    read_file,
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

    # Add context and plan files from in-progress tasks to required files
    for task in in_progress_tasks:
        task_id = task.get('id', '')
        task_path = task.get('path', '')
        plan_path = task.get('plan_path', '')

        # Add context file
        if task_path and task_id:
            # Handle IDs with or without TASK- prefix
            id_part = task_id if task_id.startswith('TASK-') else f"TASK-{task_id}"
            context_file = f"{task_path}{id_part}-context.md"
            required_files.append(context_file)

        # Add plan file
        if plan_path:
            required_files.append(plan_path)

    # Build file list for prompt
    file_bullets = "\n".join(
        f"   - `{claude_project_dir}/{f}`" if not f.startswith('/') else f"   - `{f}`"
        for f in required_files
    )

    # Load agent prompt
    prompt_path = base_dir / ".meridian" / "prompts" / "agent-operating-manual.md"
    prompt_content = read_file(prompt_path)
    if not prompt_content.endswith("\n"):
        prompt_content += "\n"

    # Build output with task XML at the top
    output_parts = [prompt_content, "[SYSTEM]:\n"]

    if task_xml:
        output_parts.append(task_xml)
        output_parts.append("\n")

    output_parts.append(f"""
NEXT STEPS:
1. Read the following files before starting your work:
{file_bullets}

2. Read all additional relevant documents listed in `{claude_project_dir}/.meridian/relevant-docs.md`.

3. For each in-progress task listed above, read ALL files within its task folder.

4. Ask the user what they would like to work on.

IMPORTANT:
Claude must always complete all steps listed in this system message before doing anything else. Even if the user sends any message after this system message, Claude must first perform everything described above and only then handle the user's request.
""")

    print("".join(output_parts), end="")

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
