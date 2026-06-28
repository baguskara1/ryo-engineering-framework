#!/bin/bash

VERSION="0.1.0"

COMMAND="$1"
SUBCOMMAND="$2"
CATEGORY="$3"
NAME="$4"

check_directory() {
    local DIR="$1"
    local LABEL="$2"

    if [ -d "$DIR" ]; then
        echo "✅ $LABEL"
    else
        echo "❌ $LABEL (missing)"
    fi
}

case "$COMMAND" in

version)
    echo ""
    echo "🚀 Ryo Engineering Framework"
    echo "Version : $VERSION"
    echo "Platform: $(uname)"
    echo ""
    ;;

doctor)
    echo ""
    echo "🔍 Running Ryo Doctor..."
    echo ""

    check_directory "skills" "Skills"
    check_directory "docs" "Documentation"
    check_directory "templates" "Templates"
    check_directory "scripts" "Scripts"
    check_directory "specs" "Specifications" 

    echo ""
    ;;

list)
    echo ""
    echo "📦 Available Categories"
    echo ""

    find skills -mindepth 1 -maxdepth 1 -type d

    echo ""
    ;;

create)

    if [ "$SUBCOMMAND" = "skill" ]; then

        if [ -z "$CATEGORY" ] || [ -z "$NAME" ]; then
            echo ""
            echo "Usage:"
            echo "bash cli/ryo.sh create skill <category> <name>"
            echo ""
            exit 1
        fi

        bash scripts/create-skill.sh "$CATEGORY" "$NAME"

    else

        echo "Unknown create command."

    fi

    ;;    

*)
    echo ""
    echo "Ryo CLI v$VERSION"
    echo ""
    echo "Usage:"
    echo "  bash cli/ryo.sh version"
    echo "  bash cli/ryo.sh doctor"
    echo "  bash cli/ryo.sh list"
    echo "  bash cli/ryo.sh create skill <category> <name>"
    echo ""
    ;;
esac