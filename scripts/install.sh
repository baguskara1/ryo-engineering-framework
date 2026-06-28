#!/usr/bin/env bash

set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/skills"
CONFIG_DIR="$HOME/.config/opencode"

echo "🚀 Installing Ryo Engineering Framework..."

mkdir -p "$CONFIG_DIR"

if [ -L "$CONFIG_DIR/skills" ]; then
    echo "⚠️ Existing symlink found. Removing..."
    rm "$CONFIG_DIR/skills"
elif [ -d "$CONFIG_DIR/skills" ]; then
    echo "❌ A real 'skills' directory already exists."
    echo "Rename or remove it before continuing."
    exit 1
fi

ln -s "$SKILLS_DIR" "$CONFIG_DIR/skills"

echo ""
echo "✅ Installation complete!"
echo ""
echo "Repository : $REPO_ROOT"
echo "Skills Link: $CONFIG_DIR/skills"