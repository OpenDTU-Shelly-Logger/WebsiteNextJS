"use client";

import { loadAllData, loadData } from "@/services/dataParser";
import { loadPowerData } from "@/services/powerDataParser";
import { PowerData } from "@/types/Emeter";
import { SolarData } from "@/types/OpenDTUData";
import { DailySolarData } from "@/types/SolarHistory";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io } from "socket.io-client";
interface SolarContextType {
  historyData: DailySolarData[];
  liveSolarData: SolarData | null;
  livePowerData: PowerData | null;
}

const SolarContext = createContext<SolarContextType | undefined>(undefined);

export function SolarProvider({ children }: { children: ReactNode }) {
  const [historyData, setHistoryData] = useState<DailySolarData[]>([]);
  const [liveSolarData, setLiveData] = useState<SolarData | null>(null);
  const [livePowerData, setPowerData] = useState<PowerData | null>(null);

  const fetchData = async () => {
    await loadAllData().then((data) => {
      setHistoryData(data.items);
    });

    await loadData().then((data) => {
      setLiveData(data);
    });

    await loadPowerData().then((data) => setPowerData(data));
  };

  useEffect(() => {
    // 1. Trigger the API route to ensure the server starts
    fetch("/api/socket");

    // 2. Connect to the same host/port Next.js is running on
    const socket = io({
      path: "/api/socket",
    });

    socket.on("liveSolar", (data) => setLiveData(data));

    socket.on("historyData", (data) => {
      const items =
        typeof data === "string" ? JSON.parse(data).items : data.items;
      if (items) setHistoryData(items);
    });

    socket.on("livePower", (data) => {
      setPowerData(typeof data === "string" ? JSON.parse(data) : data);
    });

    fetchData();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SolarContext.Provider
      value={{
        historyData,
        liveSolarData: liveSolarData,
        livePowerData: livePowerData,
      }}
    >
      {children}
    </SolarContext.Provider>
  );
}

export const useSolar = () => {
  const context = useContext(SolarContext);
  if (!context) throw new Error("useSolar must be used within SolarProvider");
  return context;
};
