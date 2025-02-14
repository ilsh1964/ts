#!/bin/bash

# Function to print usage instructions
usage() {
    echo "Usage: ts -c <filename> | ts -m <filename>"
    exit 1
}

# Check for valid arguments
if [[ $# -ne 2 ]]; then
    usage
fi

# Get current date in the format YYYY-MM-DD
current_date=$(date +"%Y-%m-%d")

# Parse options
case $1 in
    -c)
        # Create a new file with the new name
        extension="${2##*.}"
        basename="${2%.*}"
        if [[ "$basename" == "$extension" ]]; then
            new_file="${basename}_${current_date}"
        else
            new_file="${basename}_${current_date}.${extension}"
        fi
        cp -p "$2" "$new_file"
        echo "Created new file: $new_file"
        ;;
    -m)
        # Rename the file with the new name
        if [[ ! -f $2 ]]; then
            echo "Error: File '$2' not found."
            exit 1
        fi
        extension="${2##*.}"
        basename="${2%.*}"
        if [[ "$basename" == "$extension" ]]; then
            new_file="${basename}_${current_date}"
        else
            new_file="${basename}_${current_date}.${extension}"
        fi
        mv "$2" "$new_file"
        echo "Renamed file to: $new_file"
        ;;
    *)
        usage
        ;;
esac

