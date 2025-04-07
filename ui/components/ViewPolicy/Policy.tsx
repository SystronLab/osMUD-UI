import { ACE_DIRECTION, ACL } from "@/types/Acl";
import React from "react";
import KvItem from "@/components/KvItem";
import Ace from "./Ace";

interface PolicyProps {
  acl?: ACL;
  direction: ACE_DIRECTION;
}

export default function Policy(props: PolicyProps) {
  if (!props.acl) return null;

  const acl: ACL = props.acl;

  return (
    <div className="text-sm text-base-content">
      {/* Header */}
      <h4 className="font-semibold text-lg mb-2">{acl.name}</h4>

      {/* Type Info */}
      <KvItem
        title="Type"
        value={
          acl.type === "ipv4-acl-type"
            ? "IPv4"
            : acl.type === "ipv6-acl-type"
            ? "IPv6"
            : "Ethernet"
        }
      />

      {/* ACE Table */}
      <div className="overflow-x-auto mt-4">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>{props.direction === "from-device" ? "Destination" : "Source"}</th>
              <th>Src Port</th>
              <th>Dst Port</th>
              <th>Forwarding</th>
            </tr>
          </thead>
          <tbody>
            {acl.aces.ace.map((ace) => (
              <Ace
                ace={ace}
                type={acl.type}
                direction={props.direction}
                key={ace.name}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
