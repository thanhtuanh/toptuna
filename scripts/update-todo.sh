#!/usr/bin/env bash
# updates the "Progress: X/Y" first line in todo.md based on checklist
TODO_FILE="todo.md"
if [ ! -f "$TODO_FILE" ]; then
  echo "todo.md not found"
  exit 1
fi

DONE=$(grep -cE '^- \[x\] ' "$TODO_FILE" || true)
TOTAL=$(grep -cE '^- \[[ x]\] ' "$TODO_FILE" || true)

if [ "$TOTAL" -eq 0 ]; then
  PROG="0/0"
else
  PROG="$DONE/$TOTAL"
fi

# replace the first line starting with "Progress:"
# if no Progress line exists, add one at top
if grep -q '^Progress:' "$TODO_FILE"; then
  sed -i "1s/.*/Progress: $PROG/" "$TODO_FILE"
else
  sed -i "1iProgress: $PROG\n" "$TODO_FILE"
fi

echo "Updated Progress: $PROG"
