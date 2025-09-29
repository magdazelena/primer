import React from "react";
import { useFetchClient } from "@strapi/strapi/admin";

const cache = new Map<string, string>();
let inflight: Promise<void> | null = null;

async function fetchStatuses(client: any, uid: string, ids: string[]) {
  const missing = ids.filter((id) => !cache.has(id));
  if (missing.length === 0) return;
  const res = await client.post(`/primer-status-manager/list/${encodeURIComponent(uid)}/status-by-ids`, {
    ids: missing,
  });
  const rows = res.data?.results ?? [];
  for (const row of rows) {
    if (row.documentId) cache.set(row.documentId, row.statusLabel ?? "");
  }
}

export const StatusCell = ({ row, uid }: { row: any; uid: string }) => {
  const documentId = row?.document_id || row?.documentId || row?.documentId?.toString?.();
  const [label, setLabel] = React.useState<string | null>(cache.get(documentId) ?? null);
  const { post } = useFetchClient();

  React.useEffect(() => {
    let cancelled = false;
    if (label !== null) return;

    fetchStatuses({ post }, uid, [documentId]).then(() => {
      if (cancelled) return;
      setLabel(cache.get(documentId) ?? "");
    });

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


