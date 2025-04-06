import DeviceService, { OsMudEntry } from "@/services/api/DeviceService";
import { ApiError } from "@/services/api/NetworkService";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ApiErrorAlert from "./ApiErrorAlert";

export default function DeviceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, error, data } = useQuery<OsMudEntry[], ApiError>(
    "deviceList",
    DeviceService.GetAllDevices
  );

  const filteredData = data?.filter((device) =>
    [device.macAddress, device.hostname, device.ip]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by MAC, Hostname or IP"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <ApiErrorAlert error={error} />}

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                MAC Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                Hostname
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                Assigned IP
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredData?.map((d) => (
              <tr key={d.hostname} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{d.macAddress}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{d.hostname}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{d.ip}</td>
                <td className="px-6 py-4">
                  <a
                    href={`/editor?mac=${encodeURIComponent(d.macAddress)}`}
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}

            {isLoading && (
              <tr>
                {[...Array(4)].map((_, i) => (
                  <td key={i} className="px-6 py-4">
                    <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                  </td>
                ))}
              </tr>
            )}

            {!isLoading && filteredData?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center px-6 py-6 text-gray-500 text-sm">
                  No devices match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
