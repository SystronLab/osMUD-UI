#!/bin/bash

chmod +x ./scripts/db/reset_db.sh 
./scripts/db/reset_db.sh 
if [ $? -ne 0 ]; then
    echo -e "ERROR: Unable to reset mud database - are you using sudo?"
    exit 1
fi


$1 ./osmud/src/osmud -l /tmp/osmud/osmud.log -b /tmp/osmud/muds -e /var/log/osmud-dhcp-events.log -d -i
if [ $? -ne 0 ]; then
    echo -e "ERROR: Ensure osmud is in PATH var - are you using sudo?"
    exit 1
fi
