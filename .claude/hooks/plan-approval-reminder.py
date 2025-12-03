#!/usr/bin/env python3
"""
Plan Approval Reminder Hook - PostToolUse ExitPlanMode

Reminds Claude to create a task after plan is approved.
"""

import json
import sys
import os


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(1)

    tool_name = input_data.get("tool_name", "")
    claude_project_dir = os.environ.get("CLAUDE_PROJECT_DIR", "")

    if tool_name == "ExitPlanMode":
        output = {
            "decision": "block",
            "reason": (
                f"[SYSTEM]: If the user has approved the plan, you must:\n\n"
                f"1. **Archive the plan**: Copy the plan file from its current location (e.g., `~/.claude/plans/xxx.md`) "
                f"to the task folder: `{claude_project_dir}/.meridian/tasks/TASK-###/plan.md`\n"
                f"   Use: `cp <plan_file_path> {claude_project_dir}/.meridian/tasks/TASK-###/plan.md`\n\n"
                f"2. **Create/update the task**: Add the task to `{claude_project_dir}/.meridian/task-backlog.yaml` "
                f"and generate a task brief using the `task-manager` skill. Include `plan_path` pointing to the archived plan.\n\n"
                f"Skip task creation only for trivial changes or small bug fixes.\n"
                f"Before creating any new task brief, you MUST use the `task-manager` skill."
            ),
            "systemMessage": "[Meridian] Plan approved. Claude will archive the plan and create a task folder."
        }
        print(json.dumps(output))
        sys.exit(0)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
