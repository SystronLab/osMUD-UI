"use client";

import MudInfo from "@/components/MudInfo";
import Navbar from "@/components/Navbar/Navbar";
import PolicyList from "@/components/PolicyList";
import ScreenLoading from "@/components/ScreenLoading";
import { MudContext } from "@/contexts/MudContext";
import MudParser from "@/services/MudParser";
import MudStore from "@/services/MudStore";
import { MudFile, DefaultMudInfo } from "@/types/Mud";
import React, { useState } from "react";

export default function Home() {
  const [mud, setMud] = useState<MudFile>({ ...DefaultMudInfo });
  const [blockedPolicies, setBlockedPolicies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshMud = () => {
    setLoading(true);
    let loadedMud = MudStore.LoadJson();
    if (loadedMud == null) {
      setLoading(false);
      setMud({ ...DefaultMudInfo });
      return null;
    }

    let newMud = MudParser.parse(loadedMud);
    setMud(newMud);
    setBlockedPolicies([]);
    setLoading(false);
  };

  const removeBlockedPolicy = (policy: string) => {
    setBlockedPolicies(blockedPolicies.filter((v) => v != policy));
  };

  const addBlockedPolicy = (policy: string) => {
    let newPolicies = [...blockedPolicies, policy];
    setBlockedPolicies(newPolicies);
  };

  React.useEffect(function initMudLoad() {
    setTimeout(() => {
      refreshMud();
    }, 500);
  }, []);

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
        refresh: refreshMud,
      }}
    >
      <div className="flex flex-col gap-y-4">
        <Navbar />
        <section className="px-6 flex flex-col gap-y-8">
          <MudInfo />
          <PolicyList />

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
    </MudContext.Provider>
  );
}