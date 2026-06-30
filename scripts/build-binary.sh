#!/usr/bin/env bash
set -euo pipefail

echo "Building Ryo native binary..."

# Ensure dist/ is built first
if [ ! -f dist/index.js ]; then
    echo "Building TypeScript first..."
    npm run build
fi

# Try bun build --compile first (fastest)
if command -v bun &> /dev/null; then
    echo "Using bun build --compile..."
    bun build ./dist/index.js --compile --outfile ryo
    echo "Binary created: ryo"
    exit 0
fi

# Fallback to pkg (if available)
if command -v pkg &> /dev/null; then
    echo "Using pkg..."
    pkg dist/index.js --targets node20-macos-x64,node20-linux-x64,node20-win-x64 --output ryo
    echo "Binaries created in dist/"
    exit 0
fi

# Fallback to nexe
if command -v nexe &> /dev/null; then
    echo "Using nexe..."
    nexe dist/index.js --output ryo
    echo "Binary created: ryo"
    exit 0
fi

echo "No bundler found. Install one:"
echo "  npm install -g bun        # bun build --compile"
echo "  npm install -g pkg         # pkg ."
echo "  npm install -g nexe       # nexe"
exit 1
