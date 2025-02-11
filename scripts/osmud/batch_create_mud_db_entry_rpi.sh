#!/bin/bash

# Check if the user provided the number of iterations as an argument
if [ -z "$1" ]; then
    echo "Usage: $0 <number_of_iterations>"
    exit 1
fi

# Number of times to run the command
NUM_ITERATIONS=$1

# Base command components
SCRIPT="./create_mud_db_entry.sh"
DB_PATH="/var/lib/osmud/store.db"
DEVICE_NAME_BASE="test_device"
IP_ADDRESS="192.168.1.255"
MAC_BASE="AB:CD:EF:12:34:"

# Convert the last two digits of the MAC address base to a starting number (e.g., "00" -> 0)
MAC_LAST_OCTET=0

# Loop to execute the command NUM_ITERATIONS times
for i in $(seq 1 $NUM_ITERATIONS)
do
    # Calculate the current MAC address by adding MAC_LAST_OCTET to the base
    CURRENT_MAC="${MAC_BASE}$(printf "%02X" $MAC_LAST_OCTET)"
    
    # Increment the MAC address octet for the next iteration
    MAC_LAST_OCTET=$((MAC_LAST_OCTET + 1))
    
    # Create the device name by appending the iteration number to the base name
    CURRENT_DEVICE_NAME="${DEVICE_NAME_BASE}_${i}"
    
    # Run the command with the current values
    $SCRIPT -d $DB_PATH -f "../tmp/lib/osmud/mud_file.json" -c $CURRENT_DEVICE_NAME -i $IP_ADDRESS -m $CURRENT_MAC
    
done

