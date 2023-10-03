#!/bin/bash

# Make multiple calls to a certain url via curl
# Usage: ./kitty-caller-bash.sh <url> <number of calls>

url=$1
max_calls=$2
calls_made=0
log_file_path="../kitty-logger.txt"

echo "Making $max_calls calls to $url"

# Function to log a message with a timestamp    
log_message(){
    local message="$1"
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    echo "$timestamp - $message" >> "$log_file_path"
}

# Loop until we've made the desired number of calls
while [ $calls_made -lt $max_calls ]; do
    # Make the call. Log the response code in the header and the call number in a log file with a timestamep e.g. 2019-01-01 12:00:00 - Call number 1 http_response_code: 200
    response_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    log_message "bashWcurl - Call number $((calls_made+1)) $url - http_response_code: $response_code"    

    # Increment the number of calls made, and log the call number to the console
    calls_made=$((calls_made+1))
    echo " Call number $calls_made - http_response_code: $response_code"

    # Sleep for 2 seconds
    sleep 2
done

# exit with a success code
exit 0



    
    

