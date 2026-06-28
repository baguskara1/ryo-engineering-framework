#!/bin/bash

set -e

REPO_PATH="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG_PATH="$HOME/.config/opencode"

mkdir -p "$CONFIG_PATH"

if [ -L "$CONFIG_PATH/skills" ]; then
    rm "$CONFIG_PATH/skills"
fi

ln -s "$REPO_PATH/skills" "$CONFIG_PATH/skills"

echo "✅ Ryo Engineering Framework installed."
echo "Repository: $REPO_PATH"
echo "Symlink: $CONFIG_PATH/skills"