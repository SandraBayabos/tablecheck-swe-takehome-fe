"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useParty } from "@/hooks/useParty";

type PartyContextType = {
  name: string;
  setName: (name: string) => void;
};

const PartyContext = createContext<PartyContextType | undefined>(undefined);

export const PartyProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("");
  const { party, isFetching, error } = useParty();

  useEffect(() => {
    if (party?.name) {
      setName(party.name);
    }
  }, [party]);

  return (
    <PartyContext.Provider value={{ name, setName }}>
      {children}
    </PartyContext.Provider>
  );
};

export const usePartyContext = () => {
  const context = useContext(PartyContext);
  if (!context) {
    throw new Error("usePartyContext must be used within a PartyProvider");
  }
  return context;
};
