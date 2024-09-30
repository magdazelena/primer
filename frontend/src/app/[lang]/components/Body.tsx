"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";

const Body = ({ children }: { children?: React.ReactNode }) => {
  const scrollDir = useScrollDirection();
  return (
    <body className={`${scrollDir === "up" ? "nav-open" : "nav-closed"}`}>
      {children}
    </body>
  );
};
export default Body;
