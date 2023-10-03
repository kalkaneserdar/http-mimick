#!/bin/bash

# Make multiple calls to a certain url via curl
# Usage: ./kitty-caller-bash.sh <url> <number of calls>

url=$1
max_calls=$2
calls_made=0
log_file_path="../kitty-logger.txt"

echo "Making $max_calls calls to $url"

# Function to log a message with a timestamp to a local file
log_message(){
    local message="$1"
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    echo "$timestamp - $message" >> "$log_file_path"
}

while [ $calls_made -lt $max_calls ]; do
    response_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    log_message "bashWcurl - Call number $((calls_made+1)) $url - http_response_code: $response_code"    

    calls_made=$((calls_made+1))
    echo " Call number $calls_made - http_response_code: $response_code"

    # Sleep for 2 seconds
    sleep 2
done

exit 0