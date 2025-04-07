"use client";

import MudInfo from "@/components/MudInfo";
import PolicyList from "@/components/PolicyList";
import ScreenLoading from "@/components/ScreenLoading";
import { MudContext } from "@/contexts/MudContext";
import MudParser from "@/services/MudParser";
import MudStore from "@/services/MudStore";
import DeviceService from "@/services/api/DeviceService";
import { ApiError } from "@/services/api/NetworkService";
import { MudFile, DefaultMudInfo } from "@/types/Mud";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import SaveMud from "@/components/Navbar/SaveMud";
import { Transition } from "@headlessui/react";

export default function page() {
  const [mudUploaded, setMudUploaded] = useState(false);
  const searchParams = useSearchParams();
  const { refetch } = useQuery<any, ApiError>(
    "getDevice",
    () => {
      const urlMacAddress = searchParams.get("mac");
      if (urlMacAddress != null)
        return DeviceService.GetDeviceMudFile(urlMacAddress);
      else
        throw {
          status: 404,
          message: "no mac provided",
        } as ApiError;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      onSettled: (data, error) => {
        if (error == null) {
          setMud(MudParser.parse(data));
          setRawMud(data);
        }
        setLoading(false);
        setRefreshing(false);
      },
    }
  );
  const [mud, setMud] = useState<MudFile>({ ...DefaultMudInfo });
  const [rawMud, setRawMud] = useState<any>({});
  const [blockedPolicies, setBlockedPolicies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const refreshMud = () => {
    setRefreshing(true);
    setBlockedPolicies([]);
    setMud({ ...DefaultMudInfo });
    setRawMud({});
    setTimeout(() => {
      refetch();
    }, 10000); // TODO: Create an endpoint to check if its updated instead of just waiting 10 seconds
  };

  const loadMud = () => {
    setLoading(true);
    let loadedMud = MudStore.LoadJson();
    if (loadedMud == null) {
      setLoading(false);
      setMud({ ...DefaultMudInfo });
      return;
    }

    let newMud = MudParser.parse(loadedMud);
    setMud(newMud);
    setRawMud(loadedMud);
    setBlockedPolicies([]);
    setMudUploaded(true);
    setLoading(false);
  };

  const removeBlockedPolicy = (policy: string) => {
    setBlockedPolicies(blockedPolicies.filter((v) => v != policy));
  };

  const addBlockedPolicy = (policy: string) => {
    let newPolicies = [...blockedPolicies, policy];
    setBlockedPolicies(newPolicies);
  };

  if (loading) {
    return <ScreenLoading />;
  }

  let showMud = false;

  return (
    <MudContext.Provider
      value={{
        blockedPolicies,
        addBlockedPolicy,
        removeBlockedPolicy,
        mud,
        rawMud,
        refresh: refreshMud,
        refreshing,
        load: loadMud,
      }}
    >
      <div className="flex flex-col gap-y-4">
        {refreshing ? (
          <div className="my-14 flex flex-col place-items-center justify-center text-primary-content">
            <span className="loading loading-ring loading-lg"></span>
            <p className="font-semibold mt-6">Applying MUD Policy...</p>
          </div>
        ) : (
          <div className="w-full mt-8 mb-10 mx-auto bg-base-100 shadow-md rounded-xl px-6 py-8">
            <section className="flex flex-col gap-y-8">
              <MudInfo />
              <Transition
                show={mudUploaded}
                enter="transition-all duration-1000 ease-in-out"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-[1000px]"
                leave="transition-all duration-500 ease-in-out"
                leaveFrom="opacity-100 max-h-[1000px]"
                leaveTo="opacity-0 max-h-0"
              >
                <div >
                  <PolicyList />
                  <div className="flex justify-center mt-7">
                    <SaveMud buttonClassName="w-96" />
                  </div>
                </div>
              </Transition>

              {showMud && (
                <>
                  <div className="border-b border-black mt-8" />
                  <pre>{JSON.stringify(mud, undefined, 2)}</pre>
                  <div className="border-b border-black" />
                  <pre>{JSON.stringify(MudStore.LoadJson(), undefined, 2)}</pre>
                </>
              )}
            </section>
          </div>
        )}
      </div>
    </MudContext.Provider>
  );
}
