#!/bin/bash

# Check if folder name is provided
if [ -z "$1" ]; then
    echo "Please provide a folder name."
    exit 1
fi

# Folder name
FOLDER_NAME=$1

# Create the folder
mkdir -p "$FOLDER_NAME"

# Array of file suffixes
FILES=('-table-columns' '-table-floating-bar' '-toolbar-actions' '-provider' '-data-table')

# Create the files inside the folder
for SUFFIX in "${FILES[@]}"; do
    touch "$FOLDER_NAME/$FOLDER_NAME$SUFFIX.tsx"
done

echo "Folder and files created successfully."