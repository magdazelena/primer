import { useState, useEffect } from "react";


type Status = {
  id: number;
  name: string;
  published: boolean;
  order: number;
}


export const StatusCell = ({ row }: { row: any;}) => {
 const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    setStatus(row.statusField);
  }, [row]);

  if (!status) return null;
  return (
    <span style={{
      padding: "2px 6px",
      borderRadius: 4,
      background: status.published ? "#eafbe7" : "#f0f0ff",
      color: status.published ? "#2f6846" : "#271fe0",
      fontSize: 12,
    }}>
      {status.name}
    </span>
  );
};


