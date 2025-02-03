import json
import datetime

def generate_mud_file(n, output_filename="mud_file.json"):
    mud = {
        "ietf-mud:mud": {
            "mud-version": 1,
            "mud-url": "https://example.com/mud/device-mud.json",
            "last-update": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            "cache-validity": 48,
            "is-supported": True,
            "systeminfo": "Example IoT Device",
            "mfg-name": "Example Manufacturer",
            "model-name": "Example Device Model 1",
            "documentation": "https://example.com/docs/device-doc.html",
            "ietf-mud:to-device-policy": {
                "access-lists": {
                    "access-list": []
                }
            },
            "ietf-mud:from-device-policy": {
                "access-lists": {
                    "access-list": []
                }
            }
        }
    }

    # Create n rules for to-device-policy
    to_device_acl = {
        "name": "to-device-policy-1",
        "type": "ipv4-acl-type",
        "aces": {
            "ace": []
        }
    }
    
    for i in range(n):
        rule = {
            "name": f"to-device-rule-{i+1}",
            "matches": {
                "ipv4": {
                    "protocol": 6  # TCP protocol
                },
                "tcp": {
                    "destination-port": {
                        "port": 80  # Allow HTTP traffic
                    }
                }
            },
            "actions": {
                "forwarding": "accept"
            }
        }
        to_device_acl["aces"]["ace"].append(rule)
    
    # Create n rules for from-device-policy
    from_device_acl = {
        "name": "from-device-policy-1",
        "type": "ipv4-acl-type",
        "aces": {
            "ace": []
        }
    }
    
    for i in range(n):
        rule = {
            "name": f"from-device-rule-{i+1}",
            "matches": {
                "ipv4": {
                    "protocol": 17  # UDP protocol
                },
                "udp": {
                    "destination-port": {
                        "port": 53  # Allow DNS queries
                    }
                }
            },
            "actions": {
                "forwarding": "accept"
            }
        }
        from_device_acl["aces"]["ace"].append(rule)

    # Append ACLs to the MUD file
    mud["ietf-mud:mud"]["ietf-mud:to-device-policy"]["access-lists"]["access-list"].append(to_device_acl)
    mud["ietf-mud:mud"]["ietf-mud:from-device-policy"]["access-lists"]["access-list"].append(from_device_acl)

    # Write the MUD file to a JSON file
    with open(output_filename, 'w') as f:
        json.dump(mud, f, indent=4)

    print(f"MUD file with {n} rules has been generated and saved to {output_filename}")

generate_mud_file(40)
