#!/usr/bin/env bash
# usage: ./scripts/mark-step-done.sh 3
# Marks a step in todo.md as done and updates progress. Logs changes and optionally commits to Git.
TODO_FILE="todo.md"
LOG_FILE="todo.log"
STEP="$1"

# Validate input
if [[ ! "$STEP" =~ ^[0-9]+$ ]]; then
  echo "Error: STEP must be a number (e.g., 3)"
  exit 1
fi

# Check if todo.md exists
if [ ! -f "$TODO_FILE" ]; then
  echo "Error: $TODO_FILE not found"
  exit 1
fi

# Check if step exists and is not already marked as done
if ! grep -q "^- \[ \] Step ${STEP}:" "$TODO_FILE"; then
  if grep -q "^- \[x\] Step ${STEP}:" "$TODO_FILE"; then
    echo "Error: Step ${STEP} is already marked as done"
    exit 2
  else
    echo "Error: Step ${STEP} not found in $TODO_FILE"
    exit 2
  fi
fi

# Platform-compatible sed (works on Linux and macOS)
sed_command="sed -i"
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed_command="sed -i ''"
fi

# Mark step as done
${sed_command} "0,/- \[ \] Step ${STEP}:/s//- [x] Step ${STEP}:/" "$TODO_FILE"

# Log the change
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
echo "[${TIMESTAMP}] Marked Step ${STEP} as done by user $(whoami)" >> "$LOG_FILE"

# Run update-todo.sh if it exists
if [ -f "./scripts/update-todo.sh" ]; then
  ./scripts/update-todo.sh || {
    echo "Warning: Failed to run update-todo.sh"
    exit 3
  }
else
  echo "Warning: update-todo.sh not found, skipping progress update"
fi

# Optional: Commit changes to Git
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git add "$TODO_FILE" "$LOG_FILE"
  git commit -m "chore(todo): Marked Step ${STEP} as done" || {
    echo "Warning: Failed to commit changes to Git"
  }
  # Uncomment to push automatically (use with caution)
  # git push origin "$(git rev-parse --abbrev-ref HEAD)"
fi

echo "Marked Step ${STEP} as done, logged to $LOG_FILE, and updated progress."