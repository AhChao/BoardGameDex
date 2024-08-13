#!/bin/bash

# Define the directory containing the markdown files
DIRECTORY="./data/markdownFiles/"

# Check if the directory exists
if [ ! -d "$DIRECTORY" ]; then
    echo "Directory $DIRECTORY does not exist."
    exit 1
fi

# Create an array to store game names
declare -a GAME_NAMES

# Loop through files in the directory, sort them, and extract game names
for FILE in $(ls "$DIRECTORY"*.md | sort -V); do
    # Extract the base name of the file (without path and extension)
    BASE_NAME=$(basename "$FILE" .md)
    
    # Check if the filename starts with a number followed by an underscore
    if [[ $BASE_NAME =~ ^[0-9]+_ ]]; then
        # Remove the leading number and underscore to get the game name
        GAME_NAME=${BASE_NAME#*_}
        # Escape double quotes for the JS output
        GAME_NAME=$(echo "$GAME_NAME" | sed 's/"/\\"/g')
        # Preserve spaces and special characters in game names
        GAME_NAMES+=("\"$GAME_NAME\"")
    fi
done

# Join game names into a single string for JavaScript array
JS_ARRAY=$(printf "    %s,\n" "${GAME_NAMES[@]}" | sed '$s/,$//')

# Generate the JavaScript export statement
JS_EXPORT=$(cat <<EOF
export var games = [
$JS_ARRAY
];
EOF
)

# Write the result to a JavaScript file
echo "$JS_EXPORT" > "./games.js"

echo "JavaScript file generated: ./games.js"