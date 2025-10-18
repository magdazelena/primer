import React from "react";
import { useFetchClient } from "@strapi/strapi/admin";

const cache = new Map<string, string>();


export const StatusCell = ({ row, uid }: { row: any; uid: string }) => {
  const documentId = row?.document_id || row?.documentId || row?.documentId?.toString?.();
  const [label, setLabel] = React.useState<string | null>(cache.get(documentId) ?? null);
  const { post } = useFetchClient();

  React.useEffect(() => {
    let cancelled = false;
    if (label !== null) return;


    return () => {
      cancelled = true;
    };
  }, [uid, documentId, label]);

  if (!label) return null;
  return (
    <span style={{
      padding: "2px 6px",
      borderRadius: 4,
      background: "#eef2ff",
      color: "#3730a3",
      fontSize: 12,
    }}>
      {label}
    </span>
  );
};


