#!/usr/bin/env bash
# usage: ./scripts/mark-step-done.sh 3
TODO_FILE="todo.md"
STEP="$1"

if [ -z "$STEP" ]; then
  echo "Usage: $0 <STEP_NUMBER>"
  exit 1
fi

if [ ! -f "$TODO_FILE" ]; then
  echo "todo.md not found"
  exit 1
fi

# replace the first occurrence of "- [ ] Step ${STEP}:" -> "- [x] Step ${STEP}:"
if grep -q "^- \\[ \\] Step ${STEP}:" "$TODO_FILE"; then
  sed -i "0,/- \\[ \\] Step ${STEP}:/s//- [x] Step ${STEP}:/" "$TODO_FILE"
elif grep -q "Step ${STEP}" "$TODO_FILE"; then
  sed -i "0,/- \\[ \\] .*Step ${STEP}.*$/s//- [x] &/" "$TODO_FILE"
else
  echo "Step ${STEP} not found in todo.md"
  exit 2
fi

# update progress header
./scripts/update-todo.sh

echo "Marked Step ${STEP} as done and updated progress."
