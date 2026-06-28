#!/bin/bash

echo "Checking framework structure..."

required=(
README.md
CHANGELOG.md
CONTRIBUTING.md
VERSION
docs
skills
)

for item in "${required[@]}"; do
    if [ ! -e "$item" ]; then
        echo "❌ Missing: $item"
        exit 1
    fi
done

echo "✅ Framework structure looks good."