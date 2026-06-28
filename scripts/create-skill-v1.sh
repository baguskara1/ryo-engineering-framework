#!/bin/bash

set -e

if [ $# -lt 2 ]; then
    echo ""
    echo "Usage:"
    echo "bash scripts/create-skill.sh <category> <skill-name>"
    exit 1
fi

CATEGORY="$1"
SKILL="$2"

DISPLAY_NAME=$(echo "$SKILL" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')

BASE="skills/$CATEGORY/$SKILL"
TEMPLATE="templates/skill"

echo "Creating $DISPLAY_NAME..."

mkdir -p "$BASE"

copy_template() {
    local source="$1"
    local target="$2"

    sed \
        -e "s/{{SKILL_NAME}}/$DISPLAY_NAME/g" \
        -e "s/{{SKILL_SLUG}}/$SKILL/g" \
        -e "s/{{CATEGORY}}/$CATEGORY/g" \
        "$source" > "$target"
}

find "$TEMPLATE" -type d | while read dir
do
    mkdir -p "${dir/$TEMPLATE/$BASE}"
done

find "$TEMPLATE" -type f | while read file
do
    TARGET="${file/$TEMPLATE/$BASE}"
    copy_template "$file" "$TARGET"
done

echo ""
echo "================================="
echo "✅ Skill Generated Successfully"
echo "================================="
echo ""
echo "$BASE"