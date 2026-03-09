import { PowerData } from "@/types/Emeter";
import { SolarData } from "@/types/OpenDTUData";
import { useEffect, useState } from "react";

type Props = {
  solarData: SolarData | null;
  powerData: PowerData | null;
};

export default function PowerFlowGraph({ solarData, powerData }: Props) {
  const useSolarPower = (solarData?.total.Power.v ?? 0) > 0;
  const useGridPower = (powerData?.total_power ?? 0) > 0;

  const [screenWidth, setScreenWidth] = useState(window?.innerWidth ?? 0);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const svgProps =
    screenWidth < 500
      ? { width: 600, height: screenWidth - 80, viewBox: "70 50 450 450" }
      : screenWidth >= 500 && screenWidth < 700
        ? { width: 700, height: 400, viewBox: "75 40 450 450" }
        : { width: 800, height: 450, viewBox: "150 20 300 350" };

  return (
    <svg {...svgProps}>
      <rect
        rx={15}
        x="50"
        y="50"
        width="150"
        height="90"
        fill="#ffd70000"
        stroke="#ffffff"
      />
      <rect
        rx={15}
        x="400"
        y="50"
        width="150"
        height="90"
        fill="#87ceeb00"
        stroke="#ffffff"
      />
      <rect
        rx={15}
        x="225"
        y="265"
        width="150"
        height="90"
        fill="#90ee9000"
        stroke="#ffffff"
      />

      <g transform="translate(100, 55) scale(0.35)">
        <path
          fill="#fcc11a"
          d="M37.41 41.95c-9.71 12.48-9.54 34.65 2.87 45.64c14.09 12.47 33.92 12.34 46.39.87c14.95-13.76 14.09-36.66.87-49.63c-13.29-13.04-37.04-13.72-50.13 3.12"
        ></path>
        <path
          fill="#fee269"
          d="M53 37.67c-3.84-1.7-8.04 2.93-9.87 6.09c-1.83 3.17-3.53 9.38.37 10.97c3.9 1.58 6.7-1.1 9.51-5.73c2.79-4.63 4.38-9.38-.01-11.33"
        ></path>
        <path
          fill="#ffa722"
          d="M63 20.27c-.93 1.74-.62 3.08 1.23 3.52s13.36 2.31 14.33 2.37c1.41.09 1.93-.97 1.76-2.2c-.18-1.23-2.99-18.46-3.25-20.04S75.14.76 73.55 2.87S63.7 18.96 63 20.27m29.8 11.96c-1.81.56-1.76 1.67-.79 3.08s7.65 11.6 8.26 12.31c.62.7 1.67.88 2.55-.18c.88-1.05 11.86-16.45 12.66-17.41c1.32-1.58.53-3.25-1.49-2.73c-1.54.41-20.05 4.58-21.19 4.93m13.8 29.63c-1.3-.74-2.99-.53-3.43 1.14s-2.37 13.8-2.55 14.86s.62 2.11 1.93 1.85s19.45-2.95 20.66-3.25c2.11-.53 2.81-2.64.62-4.22c-1.42-1.03-16-9.68-17.23-10.38M92.09 90.6c1.4-.75 2.64-.18 2.99 1.41c.35 1.58 4.22 17.76 4.84 20.75c.31 1.5-1.41 2.73-2.81 1.85c-1.41-.88-16.69-11.53-17.67-12.4c-1.41-1.23-.43-2.51.26-3.16c1.4-1.33 11.07-7.74 12.39-8.45m-42.55 8.88c-1.77-.17-2.29 1.41-2.02 2.81c.26 1.41 2.9 19.24 3.08 20.57c.26 1.93 2.29 2.73 3.6.79s10.35-16.4 11.08-17.76c1.32-2.46.35-2.99-.97-3.6c-1.31-.61-12.92-2.63-14.77-2.81M24.23 79c1.23-2.02 2.81-1.49 3.96.44c.78 1.32 7.38 10.2 8 11.16c.62.97.88 2.81-1.05 3.25c-1.95.45-17.68 4.58-20.14 5.02s-3.87-1.49-2.29-3.6c.92-1.24 10.82-15.12 11.52-16.27m-3.34-15.3c2.25 1 3.31.64 3.78-.97c.62-2.11 2.46-11.78 2.55-13.98c.06-1.43-.53-2.81-2.73-2.46S6.47 48.85 4.45 49.55c-2.35.82-2.18 3.4-.62 4.22c1.85.97 15.47 9.23 17.06 9.93m27.34-36.92c1.27-1.01.88-2.46-.26-3.25s-15.26-11-17.05-12.4c-1.58-1.23-3.52-.79-2.99 2.02c.38 2.02 4.88 19.7 5.19 20.92c.35 1.41 1.41 2.11 2.64 1.23c1.21-.87 11.15-7.46 12.47-8.52"
        ></path>
      </g>
      <g transform="translate(457.5, 55) scale(2)">
        <path
          fill="#999999"
          d="m5.18 5.45l-1.78-.9L4.66 2h8.47l1.27 2.55l-1.78.89L11.9 4h-6zM15.5 8H11l-.8-3H7.6l-.79 3H2.28L1 10.55l1.79.89L3.5 10h10.78l.72 1.45l1.79-.89zm-.83 14H12.6l-.24-.9l-3.46-5.2l-3.47 5.2l-.23.9H3.13L6 11h2.09l-.36 1.35L8.9 14.1l1.16-1.75L9.71 11h2.07zM8.3 15l-.9-1.35l-1.18 4.48zm3.28 3.12l-1.18-4.48L9.5 15zM23 16l-4-4v3h-4v2h4v3z"
        ></path>
      </g>

      <g fill="none" transform="translate(277, 270) scale(1.4)">
        <path fill="url(#fluentColorHome320)" d="M11 17h10v12H11z"></path>
        <path
          fill="url(#fluentColorHome321)"
          d="M13.895 4.277a3.25 3.25 0 0 1 4.21 0l9.75 8.287A3.25 3.25 0 0 1 29 15.04V26.5a2.5 2.5 0 0 1-2.5 2.5H20v-9a2 2 0 0 0-1.991-2H13.99A2 2 0 0 0 12 20v9H5.5A2.5 2.5 0 0 1 3 26.5V15.04a3.25 3.25 0 0 1 1.145-2.476z"
        ></path>
        <path
          fill="url(#fluentColorHome322)"
          fillRule="evenodd"
          d="M15.958 5.313L3.448 15.506a1.5 1.5 0 1 1-1.896-2.325L14.722 2.45a2 2 0 0 1 2.593.055l13.182 11.096a1.5 1.5 0 1 1-1.994 2.242z"
          clipRule="evenodd"
        ></path>
        <defs>
          <linearGradient
            id="fluentColorHome320"
            x1={16}
            x2={8.476}
            y1={17}
            y2={30.938}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#944600"></stop>
            <stop offset={1} stopColor="#cd8e02"></stop>
          </linearGradient>
          <linearGradient
            id="fluentColorHome321"
            x1={5.482}
            x2={30.596}
            y1={2.256}
            y2={23.072}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffd394"></stop>
            <stop offset={1} stopColor="#ffb357"></stop>
          </linearGradient>
          <linearGradient
            id="fluentColorHome322"
            x1={11.152}
            x2={17.15}
            y1={-1.378}
            y2={15.727}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff921f"></stop>
            <stop offset={1} stopColor="#eb4824"></stop>
          </linearGradient>
        </defs>
      </g>

      <text
        x="125"
        y="125"
        textAnchor="middle"
        fontSize="26"
        fill="white"
        fontWeight={"500"}
      >
        {(solarData?.total.Power.v.toFixed(2) ?? "") + solarData?.total.Power.u}
      </text>
      <text
        x="475"
        y="125"
        textAnchor="middle"
        fill="white"
        fontWeight="500"
        fontSize="26"
      >
        {((powerData?.total_power ?? 0) <= 0
          ? 0
          : powerData?.total_power.toFixed(2)) + "W"}
      </text>
      <text x="245" y="340" fontSize="26" fill="white" fontWeight="500">
        {(
          (powerData?.total_power ?? 0) + (solarData?.total.Power.v ?? 0)
        ).toFixed(2) + "W"}
      </text>

      {!useGridPower && (
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="10"
            refY="5"
            orient="auto"
          >
            <polygon points="0,0 10,5 0,10" fill="white" />
          </marker>
        </defs>
      )}
      {!useGridPower && (
        <line
          x1="200"
          y1="90"
          x2="400"
          y2="90"
          stroke="white"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
      )}

      {!useGridPower && (
        <text x="300" y="80" fontSize="24" textAnchor="middle" fill="white">
          {((powerData?.total_power ?? 0 < 0)
            ? -1 * (powerData?.total_power ?? 0)
            : "0") + "W"}
        </text>
      )}
      <path
        stroke={useSolarPower ? "white" : "gray"}
        strokeDasharray={useSolarPower ? "" : "5,5"}
        d="M125,140 L125,260 Q125,290 155,290 L225,290"
        strokeWidth="2"
        fill="none"
      />
      <path
        stroke={useGridPower ? "white" : "gray"}
        strokeDasharray={useGridPower ? "" : "5,5"}
        d="M475,140 L475,260 Q475,290 445,290 L375,290"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
