"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faNetworkWired, faCode, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function About() {
  return (
    <div className="max-w-4xl m-6 mx-auto px-6 py-12 space-y-8 bg-base-100 rounded-lg shadow-md">
      <section>
        <h2 className="text-2xl font-bold text-base-content">About MUDGuard </h2>
        <hr></hr>
      </section>
      <section>
        <p className="text-base text-base-content leading-relaxed">
          <strong>MUDGuard</strong> is a web-based interface designed to simplify working with
          <span className="font-medium text-teal-600"> Manufacturer Usage Description (MUD)</span> files —
          a key component in securing IoT networks.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faCode} className="text-teal-600" />

          What is a MUD File?
        </h2>
        <p className="text-base-content text-sm leading-relaxed">
          A MUD file (Manufacturer Usage Description) is a JSON file provided by device manufacturers that defines how the device is expected to behave on a network. It helps network administrators automatically apply firewall rules, restrict unnecessary communication, and reduce attack surfaces.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faNetworkWired} className="text-teal-600" />
          What Does MUDGuard Do?
        </h2>
        <ul className="list-disc pl-6 text-sm text-base-content space-y-1">
          <li>Upload and parse MUD files for IoT devices</li>
          <li>View and edit access control policies interactively</li>
          <li>Block or allow specific ACEs with one click</li>
          <li>Apply updated MUD configurations back to the network</li>
          <li>Visualize the MUD metadata, ACLs, and forwarding rules clearly</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faShieldAlt} className="text-teal-600" />
          Who is it For?
        </h2>
        <p className="text-sm text-base-content">
          MUDGuard is built for researchers, developers, and network administrators who want to easily interpret and modify MUD files.
        </p>
      </section>
    </div>
  );
}
