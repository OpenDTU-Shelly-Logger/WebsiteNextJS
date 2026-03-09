"use client";

import { getAllSolarItems, loadAllData, loadData } from "@/services/dataParser";
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
    const socket = io("http://localhost:3005", {
      path: "/dataSocket",
      transports: ["websocket"],
    });

    // 1. Listen for Live OpenDTU data
    socket.on("liveSolar", (data) => setLiveData(data));

    // 2. Listen for History updates
    socket.on("historyData", (data) => {
      let items: DailySolarData[];
      if (typeof data === "string" && data.includes("|")) {
        items = getAllSolarItems(data).items;
      } else {
        items = typeof data === "string" ? JSON.parse(data).items : data.items;
      }

      if (items !== undefined) setHistoryData(items);
    });

    // 3. Listen for Shelly/Power data
    socket.on("livePower", (data) => {
      setPowerData(typeof data === "string" ? JSON.parse(data) : data);
    });

    fetchData();

    return () => {
      socket.off("liveSolar");
      socket.off("historyData");
      socket.off("livePower");
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
