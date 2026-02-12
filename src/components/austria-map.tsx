"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { isLoggedIn } from "@/lib/user-store";
import { Button } from "@/components/ui/button";

/* ─── Province data — SVG paths derived from official GeoJSON ─── */
interface Province {
    id: string;
    name: string;
    nameEn: string;
    players: number;
    clubs: number;
    d: string;
    labelX: number;
    labelY: number;
}

const PROVINCES: Province[] = [
    {
        id: "vorarlberg",
        name: "Vorarlberg",
        nameEn: "Vorarlberg",
        players: 120,
        clubs: 8,
        d: "M55.9,187.4 L57.8,191.3 L56,193.8 L54.1,197.8 L56.4,200.6 L53.8,203.6 L50,200.6 L44.9,198 L40.5,196.9 L37.3,193.7 L38.1,189.9 L36,187.9 L33.4,188.3 L27.8,186.8 L24.9,185.4 L20.3,184.8 L17.6,184.7 L19.6,181.3 L18.6,176.9 L15.1,174.9 L14.8,171.1 L14.1,168.5 L13.2,165.9 L16.8,161 L20.7,158.4 L22.4,156.4 L20.4,152.3 L17.6,149.6 L14.3,147.4 L18.3,145.9 L26.7,144.2 L28.5,140.2 L33.1,139.6 L33.8,143.3 L37.4,143 L41.9,143.8 L44.8,146.2 L48.9,148 L53.1,152.3 L51.5,154.4 L53.3,159.1 L56.2,158.4 L60.3,156.6 L63.4,157.9 L61.9,163.3 L58.7,166 L62.3,168.2 L61.6,172.4 L61.5,175.3 L60.9,177.7 L56.7,181.6 L57.1,184.6 L55.9,187.4 Z",
        labelX: 39,
        labelY: 170,
    },
    {
        id: "tirol",
        name: "Tirol",
        nameEn: "Tyrol",
        players: 310,
        clubs: 22,
        d: "M243.4,212.6 L242,215.5 L241.8,219.3 L238.3,219.8 L235.5,219.4 L233,219.8 L229.2,217.5 L226.2,216.9 L222.7,215.7 L219.1,213.7 L214.1,208.4 L212,208 L212.2,205.8 L212.7,202.2 L211.6,200.8 L208.8,199.5 L205.9,199.1 L203.2,197.7 L203.9,195.2 L201.7,193.7 L200.4,189.4 L203.6,188.3 L206.5,187.6 L207.4,184.9 L210.6,183.7 L214.1,182 L216.7,180.6 L218,177.8 L221.6,177.6 L224.4,177.6 L226.8,176.4 L230,178.1 L232.8,178.3 L234.7,179.2 L238.1,180.9 L242.6,183.9 L245.1,186.4 L246.5,187.8 L244.4,190.6 L245.5,192.6 L246.9,193.7 L248.8,195.1 L250.4,196.6 L252.5,197.4 L252.7,199.1 L252.8,201.9 L256.7,204.9 L257.6,205.1 L261.7,207.2 L261,208.6 L259.4,210.2 L257,209.1 L253.9,210.5 L250.5,210.8 L246,211.6 L244.3,211.9 L243.4,212.6 Z M91.6,201.6 L80,199.9 L73.2,190.7 L63.7,195.8 L54.7,199.8 L57.4,189.5 L59.7,178.9 L61.6,170.7 L66.6,165.3 L77.9,157.3 L78.2,148.2 L84.3,144.1 L96.7,143.2 L110.9,143.9 L117.7,153.1 L130.4,153.8 L142,152.9 L151,145.5 L164.2,139.9 L181.1,138.3 L200,137.5 L204.8,132.6 L210.3,131.7 L225.4,134.2 L239.1,139.5 L240,150.1 L231.3,155.8 L225.8,162.2 L210.8,164 L198.5,165.5 L199.7,178.1 L194.5,184.8 L180.4,189.8 L167.2,190.6 L151.9,190.5 L140.8,191.4 L129,196.2 L122.5,206.3 L109.3,210 L100.4,206.7 L91.6,201.6 Z M79.2,142.3 L78.5,141.3 L77.7,141.1 L77.8,139.9 L79.3,140 L80.3,139.6 L80.6,141 L79.2,142.3 Z",
        labelX: 161,
        labelY: 175,
    },
    {
        id: "salzburg",
        name: "Salzburg",
        nameEn: "Salzburg",
        players: 280,
        clubs: 18,
        d: "M322.6,194.1 L314.3,186.5 L296.3,183.3 L282.5,182.4 L269.7,188.8 L258.5,182.9 L246.6,181.6 L234.7,179.2 L223.2,177 L210.6,183.7 L199.7,178.1 L198.5,165.5 L210.8,164 L225.8,162.2 L231.3,155.8 L240,150.1 L239.1,139.5 L240.1,131.6 L251.6,137.5 L255.6,145.2 L267.8,147.8 L271.5,135.6 L258,128.5 L264.4,116.7 L255,107.1 L261.5,101.4 L270.2,104 L282,104.9 L290.8,109 L284.8,112.4 L289.9,120.5 L302.8,121.6 L303.5,130.1 L302.4,136.9 L301.9,147.4 L306.7,158.3 L314.9,167.2 L324.2,167.1 L333.6,175.9 L329,182.7 L323.5,194.1 L322.6,194.1 Z",
        labelX: 269,
        labelY: 151,
    },
    {
        id: "oberoesterreich",
        name: "Oberösterreich",
        nameEn: "Upper Austria",
        players: 480,
        clubs: 36,
        d: "M314.9,140.3 L316.9,150.3 L300,145.9 L300,135.9 L296.8,123.8 L297.1,121 L285.7,115.9 L289,109 L283,105 L270.2,104 L259.9,101.1 L247.6,98.6 L253.3,89.8 L277.4,79 L296.1,67.7 L297.1,55.9 L307.4,55.4 L318.8,58.6 L324.2,49.1 L325.2,38.8 L339.6,46.2 L344,53.5 L359.5,55.8 L369.3,52.4 L382,50.9 L393.4,56.6 L401.8,62.5 L406.6,70.7 L407.6,83.2 L399.4,86.1 L386,90.4 L372,86.9 L370.2,100.5 L382.9,109.1 L392.5,115.2 L389.3,123.4 L377.1,128.3 L366,134 L354,134.2 L341.1,132.7 L326.2,128.7 L314.8,136.5 L314.9,140.3 Z",
        labelX: 335,
        labelY: 94,
    },
    {
        id: "niederoesterreich",
        name: "Niederösterreich",
        nameEn: "Lower Austria",
        players: 560,
        clubs: 42,
        d: "M500.9,151.5 L488.9,146.5 L475.6,142 L466.6,134.9 L456,128.6 L439.1,121.3 L425.6,121.7 L412.3,125.4 L392.9,127.7 L388.7,117 L385.8,109.8 L370.9,100.9 L372,86.9 L387.1,90.7 L401.5,84.3 L408.7,78.6 L404.6,67.9 L400.7,59 L388,54.3 L395.8,41.3 L407.2,38.8 L408.3,24.7 L417.5,18.8 L429.4,22.1 L446.6,25.3 L470,29.6 L482.1,37.4 L504.7,40.9 L515.2,35.7 L531.6,38.1 L542.7,43.3 L550.5,52.6 L546.6,63.3 L546,75.3 L555.2,90.6 L553.1,95.6 L548.3,98.1 L533.4,107.1 L521.9,111.1 L510.4,114.8 L504.9,122.2 L503.7,127.5 L507.6,138.3 L502.2,150.8 L500.9,151.5 Z M497.7,81.6 L496.8,82.8 L496,85.1 L496.8,85.1 L497.6,86.9 L497.1,88.3 L495.8,89.6 L496.6,90 L496.9,91 L498.8,91.1 L497.8,91.6 L498.7,92.6 L498.4,93.2 L498.9,93.5 L499.2,93.3 L502,92.8 L504.2,93.1 L504.2,93.5 L505.2,94 L506.1,92.4 L509.1,93.2 L509.1,93.2 L510.8,93.5 L512.5,94.1 L513.3,93.7 L514.3,93.9 L514.3,92.4 L515.5,92.3 L517.3,90.8 L519.9,90.6 L522,92 L524.4,92.6 L524.5,91.8 L523.8,90.2 L522.7,90.3 L521.5,89 L521.9,87.8 L521.5,87 L522.2,85.7 L522.7,83.7 L521.8,83.4 L522.3,81.7 L520.4,81.5 L519.4,80.8 L520,79.8 L519,79.3 L517.5,79.1 L517.7,80.2 L517,80.6 L514.6,79.2 L514.4,77.1 L513.7,76.8 L511.3,76.6 L510.3,77 L510.4,77.9 L508.9,80 L508.4,79.9 L507.6,79.8 L505.4,80.7 L503.5,81 L503.3,82.1 L502.3,82.3 L501.2,83.7 L500.1,83.8 L499.5,82.8 L497.7,81.6 Z",
        labelX: 456,
        labelY: 78,
    },
    {
        id: "wien",
        name: "Wien",
        nameEn: "Vienna",
        players: 890,
        clubs: 65,
        d: "M509.1,93.2 L506.1,92.4 L505.2,94 L504.2,93.5 L504.2,93.1 L502,92.8 L499.2,93.3 L498.9,93.5 L498.4,93.2 L498.7,92.6 L497.8,91.6 L498.8,91.1 L496.9,91 L496.6,90 L495.8,89.6 L497.1,88.3 L497.6,86.9 L496.8,85.1 L496,85.1 L496.8,82.8 L497.7,81.6 L499.5,82.8 L500.1,83.8 L501.2,83.7 L502.3,82.3 L503.3,82.1 L503.5,81 L505.4,80.7 L507.6,79.8 L508.4,79.9 L508.9,80 L510.4,77.9 L510.3,77 L511.3,76.6 L513.7,76.8 L514.4,77.1 L514.6,79.2 L517,80.6 L517.7,80.2 L517.5,79.1 L519,79.3 L520,79.8 L519.4,80.8 L520.4,81.5 L522.3,81.7 L521.8,83.4 L522.7,83.7 L522.2,85.7 L521.5,87 L521.9,87.8 L521.5,89 L522.7,90.3 L523.8,90.2 L524.5,91.8 L524.4,92.6 L522,92 L519.9,90.6 L517.3,90.8 L515.5,92.3 L514.3,92.4 L514.3,93.9 L513.3,93.7 L512.5,94.1 L510.8,93.5 L509.1,93.2 Z",
        labelX: 510,
        labelY: 87,
    },
    {
        id: "kaernten",
        name: "Kärnten",
        nameEn: "Carinthia",
        players: 195,
        clubs: 14,
        d: "M368.7,237.7 L357.7,237.6 L348.3,238.3 L340.8,233.4 L330.7,231 L318,231.3 L305.3,228.4 L294.1,226.7 L282.7,227.6 L270.7,224.1 L259.5,223.4 L248,220.2 L242,215.5 L250.5,210.8 L260.4,209.6 L256.7,204.9 L251.4,197.1 L245.5,192.6 L243.3,185.8 L245.3,181.3 L254.1,183 L261.8,186.6 L273.6,187.6 L282.5,182.4 L293.9,184 L307.6,185.1 L315.9,190.3 L326,197.7 L333.8,193.7 L342.3,188.9 L349.7,184.6 L356.1,187.6 L367.7,190.5 L375.4,189.2 L389.9,188.1 L398.7,187.1 L411,196.6 L409.5,204.7 L412.5,214.8 L409.5,222.3 L404.2,223.9 L396.9,229.8 L390.1,233.5 L385,237.6 L378.2,243.5 L369.6,239.5 L368.7,237.7 Z",
        labelX: 324,
        labelY: 208,
    },
    {
        id: "burgenland",
        name: "Burgenland",
        nameEn: "Burgenland",
        players: 105,
        clubs: 7,
        d: "M487.3,202.8 L484.2,199.5 L491.4,190.7 L488.9,183.7 L490,174.2 L486.8,163.4 L486.9,157 L494.5,153.9 L505.9,147.6 L507.6,138.3 L505,131 L504.6,122.7 L506.6,121.3 L508.3,115.7 L515.4,109.9 L524.7,113.8 L533.5,106.5 L546.1,98 L553,102 L555.8,96.4 L560.4,99.3 L562.1,106.7 L558.8,115.2 L559.9,123.3 L545.9,130.8 L535,126.9 L522.4,125.5 L517.2,130.7 L517.4,134.2 L530.5,138 L530,147.1 L522.3,155.2 L515.8,156.9 L517.3,167.4 L515.5,173.8 L518.9,179.4 L517.7,185.8 L515.3,189.6 L507.5,190 L500.5,194.3 L489.2,201.5 L487.3,202.8 Z",
        labelX: 519,
        labelY: 145,
    },
    {
        id: "steiermark",
        name: "Steiermark",
        nameEn: "Styria",
        players: 420,
        clubs: 32,
        d: "M414.5,219.8 L408.5,206.6 L407.4,191.5 L393.4,186.6 L372.9,187.8 L363.5,187.8 L349.7,184.6 L338.1,189.8 L327.4,196.8 L327.2,188.3 L336.2,179 L327.5,169.2 L314.9,167.6 L306.7,158.3 L309.9,149.9 L319.3,142.6 L317.7,131.3 L331.2,129.5 L343.8,136.8 L357.6,137.3 L372.6,131.5 L384.1,127.8 L400.8,127.7 L419.4,125.8 L428.2,122 L439.8,122.7 L456,128.6 L464.3,135.8 L473.4,140.8 L485.9,147.8 L493,152.4 L486.9,157 L488.1,166.7 L489.9,180.3 L493.8,190.7 L484.2,199.5 L481.4,211.2 L473.6,214 L456.1,216.5 L447,222.8 L431.1,219.8 L415.8,220.4 L414.5,219.8 Z",
        labelX: 403,
        labelY: 168,
    },
];

// Provinces accessible without login (preview)
const FREE_PROVINCE_IDS = ["wien", "salzburg"];

/* ─── Component ─── */
export function AustriaMap() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [hovered, setHovered] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        province: Province;
    } | null>(null);

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);

    const isAccessible = (id: string) =>
        loggedIn || FREE_PROVINCE_IDS.includes(id);

    function handleClick(province: Province) {
        if (!isAccessible(province.id)) return;
        setSelected((prev) =>
            prev.includes(province.id)
                ? prev.filter((p) => p !== province.id)
                : [...prev, province.id]
        );
    }

    function handlePointerMove(
        e: React.PointerEvent<SVGPathElement>,
        province: Province
    ) {
        const svg = e.currentTarget.closest("svg");
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        setTooltip({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top - 12,
            province,
        });
    }

    const selectedProvinces = PROVINCES.filter((p) => selected.includes(p.id));

    return (
        <div className="relative">
            {/* Map container */}
            <div className="relative glass-card !rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10">
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(245,166,35,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.3) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full bg-[var(--gold)]/[0.04] blur-[80px] pointer-events-none" />

                <div className="relative">
                    {/* SVG Map */}
                    <svg
                        viewBox="0 5 580 260"
                        className="w-full h-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            filter: "drop-shadow(0 0 20px rgba(245, 166, 35, 0.04))",
                        }}
                    >
                        <defs>
                            {/* Gold selected glow */}
                            <filter
                                id="gold-glow"
                                x="-30%"
                                y="-30%"
                                width="160%"
                                height="160%"
                            >
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feFlood
                                    floodColor="#f5a623"
                                    floodOpacity="0.45"
                                    result="color"
                                />
                                <feComposite
                                    in="color"
                                    in2="blur"
                                    operator="in"
                                    result="glow"
                                />
                                <feMerge>
                                    <feMergeNode in="glow" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Hover glow */}
                            <filter
                                id="hover-glow"
                                x="-15%"
                                y="-15%"
                                width="130%"
                                height="130%"
                            >
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feFlood
                                    floodColor="#f5a623"
                                    floodOpacity="0.3"
                                    result="color"
                                />
                                <feComposite
                                    in="color"
                                    in2="blur"
                                    operator="in"
                                    result="glow"
                                />
                                <feMerge>
                                    <feMergeNode in="glow" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Gold fill gradient */}
                            <linearGradient
                                id="gold-fill"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor="#f5a623" />
                                <stop offset="50%" stopColor="#ffd740" />
                                <stop offset="100%" stopColor="#f5a623" />
                            </linearGradient>

                            {/* Default fill */}
                            <linearGradient
                                id="default-fill"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor="rgba(245,166,35,0.08)" />
                                <stop offset="100%" stopColor="rgba(245,166,35,0.03)" />
                            </linearGradient>
                        </defs>

                        {/* Province paths */}
                        {PROVINCES.map((province) => {
                            const isSelected = selected.includes(province.id);
                            const isHovered = hovered === province.id;
                            const accessible = isAccessible(province.id);

                            return (
                                <g key={province.id}>
                                    <path
                                        d={province.d}
                                        className={`transition-all duration-300 ${accessible ? "cursor-pointer" : "cursor-not-allowed"
                                            }`}
                                        fill={
                                            isSelected
                                                ? "url(#gold-fill)"
                                                : isHovered && accessible
                                                    ? "rgba(245, 166, 35, 0.2)"
                                                    : accessible
                                                        ? "url(#default-fill)"
                                                        : "rgba(120, 120, 140, 0.05)"
                                        }
                                        stroke={
                                            isSelected
                                                ? "#ffd740"
                                                : isHovered && accessible
                                                    ? "rgba(245, 166, 35, 0.6)"
                                                    : accessible
                                                        ? "rgba(245, 166, 35, 0.25)"
                                                        : "rgba(120, 120, 140, 0.15)"
                                        }
                                        strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0.7}
                                        strokeLinejoin="round"
                                        fillRule="evenodd"
                                        filter={
                                            isSelected
                                                ? "url(#gold-glow)"
                                                : isHovered && accessible
                                                    ? "url(#hover-glow)"
                                                    : undefined
                                        }
                                        opacity={accessible ? 1 : 0.4}
                                        onClick={() => handleClick(province)}
                                        onPointerEnter={() => setHovered(province.id)}
                                        onPointerLeave={() => {
                                            setHovered(null);
                                            setTooltip(null);
                                        }}
                                        onPointerMove={(e) => handlePointerMove(e, province)}
                                    />

                                    {/* Province label */}
                                    <text
                                        x={province.labelX}
                                        y={province.labelY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="pointer-events-none select-none"
                                        fill={
                                            isSelected
                                                ? "#0a0e17"
                                                : accessible
                                                    ? "var(--foreground-muted)"
                                                    : "rgba(120, 120, 140, 0.3)"
                                        }
                                        fontSize={province.id === "wien" ? 6 : province.id === "vorarlberg" ? 7 : 9}
                                        fontWeight={isSelected ? 700 : 500}
                                        fontFamily="system-ui, -apple-system, sans-serif"
                                        letterSpacing="0.5"
                                    >
                                        {province.id === "wien"
                                            ? "W"
                                            : province.id === "vorarlberg"
                                                ? "V"
                                                : province.name.substring(0, 2).toUpperCase()}
                                    </text>

                                    {/* Lock icon for inaccessible */}
                                    {!loggedIn && !FREE_PROVINCE_IDS.includes(province.id) && (
                                        <text
                                            x={province.labelX}
                                            y={province.labelY + (province.id === "wien" ? 8 : 12)}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="pointer-events-none select-none"
                                            fill="rgba(120,120,140,0.35)"
                                            fontSize={7}
                                        >
                                            🔒
                                        </text>
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    {/* Tooltip */}
                    <AnimatePresence>
                        {tooltip && (
                            <motion.div
                                className="absolute pointer-events-none z-20"
                                style={{ left: tooltip.x, top: tooltip.y }}
                                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                transition={{ duration: 0.12 }}
                            >
                                <div className="relative -translate-x-1/2 -translate-y-full mb-3">
                                    <div className="glass !rounded-xl px-3.5 py-2.5 border border-[var(--gold)]/20 shadow-lg shadow-black/10 min-w-[140px]">
                                        <div className="text-sm font-semibold text-[var(--foreground)]">
                                            {tooltip.province.name}
                                        </div>
                                        <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--foreground-muted)]">
                                            <span className="flex items-center gap-1">
                                                <Users className="h-3 w-3 text-[var(--gold)]" />
                                                {tooltip.province.players}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3 text-[var(--gold)]" />
                                                {tooltip.province.clubs} clubs
                                            </span>
                                        </div>
                                        {!isAccessible(tooltip.province.id) && (
                                            <div className="flex items-center gap-1 mt-1.5 text-[10px] text-[var(--gold)] font-medium">
                                                <Lock className="h-2.5 w-2.5" />
                                                Sign up to unlock
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 bg-[var(--surface)] border-r border-b border-[var(--gold)]/20" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Auth gate overlay */}
                {!loggedIn && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 z-10"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <div className="bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent pt-20 pb-6 px-6">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                                    <Lock className="h-4 w-4 text-[var(--gold)]" />
                                    <span>Sign up to explore all 9 provinces</span>
                                </div>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="rounded-full px-6"
                                    asChild
                                >
                                    <Link href="/register">
                                        Get started <ArrowRight className="h-3.5 w-3.5 ml-1" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Selected provinces summary bar */}
            <AnimatePresence>
                {selectedProvinces.length > 0 && (
                    <motion.div
                        className="mt-4 glass-card !rounded-xl p-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1] as const,
                        }}
                    >
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
                                <MapPin className="h-4 w-4 text-[var(--gold)] shrink-0" />
                                <span className="text-sm font-medium text-[var(--foreground)]">
                                    Filtering:
                                </span>
                                {selectedProvinces.map((p) => (
                                    <span
                                        key={p.id}
                                        className="inline-flex items-center gap-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-2.5 py-0.5 text-xs font-medium text-[var(--gold)]"
                                    >
                                        {p.name}
                                        <button
                                            onClick={() => handleClick(p)}
                                            className="ml-0.5 hover:text-[var(--foreground)] transition-colors text-[var(--gold)]/60"
                                            aria-label={`Remove ${p.name}`}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-[var(--foreground-muted)]">
                                <span>
                                    <strong className="text-[var(--gold)]">
                                        {selectedProvinces
                                            .reduce((a, p) => a + p.players, 0)
                                            .toLocaleString()}
                                    </strong>{" "}
                                    players
                                </span>
                                <span>
                                    <strong className="text-[var(--gold)]">
                                        {selectedProvinces.reduce((a, p) => a + p.clubs, 0)}
                                    </strong>{" "}
                                    clubs
                                </span>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="rounded-full text-xs px-4"
                                    asChild
                                >
                                    <Link href="/discover">
                                        Browse <ArrowRight className="h-3 w-3 ml-1" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
