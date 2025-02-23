#!/bin/bash

# Function to print usage instructions
usage() {
    echo "Usage: ts -c <filename> | ts -m <filename>"
    exit 1
}

# Function to generate new filename with current date
generate_new_filename() {
    local file="$1"
    local current_date=$(date +"%Y-%m-%d")

    # Extract the extension and basename
    extension="${file##*.}"
    basename="${file%.*}"

    # Special handling for dotfiles (files starting with '.')
    if [[ "$file" =~ ^\..* ]]; then
        # If it's a dotfile, append the date before the extension
        if [[ "$basename" == "$extension" ]]; then
            new_file="${basename}_${current_date}"
        else
            if [[ $basename == "" ]]; then
                new_file=".${extension}_${current_date}"
            else
                new_file="${basename}_${current_date}.${extension}"
            fi
        fi
    else
        # Handle regular files
        if [[ "$basename" == "$extension" ]]; then
            new_file="${basename}_${current_date}"
        else
            new_file="${basename}_${current_date}.${extension}"
        fi
    fi

    echo "$new_file"
}

# Check for valid arguments
if [[ $# -ne 2 ]]; then
    usage
fi

# Parse options
case $1 in
    -c)
        # Ensure the source file exists before copying
        if [[ ! -f "$2" ]]; then
            echo "Error: File '$2' not found."
            exit 1
        fi

        # Generate new filename
        new_file=$(generate_new_filename "$2")

        # Create a new file with the new name
        cp -p "$2" "$new_file"
        echo "Created new file: $new_file"
        ;;
    -m)
        # Ensure the source file exists before renaming
        if [[ ! -f "$2" ]]; then
            echo "Error: File '$2' not found."
            exit 1
        fi

        # Generate new filename
        new_file=$(generate_new_filename "$2")

        # Rename the file with the new name
        mv "$2" "$new_file"
        echo "Renamed file to: $new_file"
        ;;
    *)
        usage
        ;;
esac

