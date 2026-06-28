#!/bin/bash

set -e

if [ $# -lt 2 ]; then
    echo ""
    echo "Usage:"
    echo "  ./scripts/create-skill.sh <category> <skill-name>"
    echo ""
    exit 1
fi

CATEGORY="$1"
SKILL="$2"

BASE="skills/$CATEGORY/$SKILL"

echo "Creating skill: $BASE"

mkdir -p "$BASE/prompts"

touch "$BASE/manifest.yaml"
touch "$BASE/metadata.yaml"
touch "$BASE/README.md"
touch "$BASE/SKILL.md"
touch "$BASE/examples.md"
touch "$BASE/checklist.md"
touch "$BASE/decision-tree.md"
touch "$BASE/troubleshooting.md"
touch "$BASE/references.md"
touch "$BASE/CHANGELOG.md"
touch "$BASE/VERSION.md"

touch "$BASE/prompts/system.md"
touch "$BASE/prompts/review.md"
touch "$BASE/prompts/generate.md"

echo ""
echo "======================================"
echo "✅ Skill created successfully!"
echo "======================================"
echo "$BASE"