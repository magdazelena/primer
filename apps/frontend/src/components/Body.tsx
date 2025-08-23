"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";

export const Body = ({ children }: { children: React.ReactNode }) => {
  const scrollDir = useScrollDirection();
  return (
    <body
      className={`${scrollDir === "up" ? "nav-open" : "nav-closed"} bg-light`}
    >
      {children}
    </body>
  );
};

export default Body;
