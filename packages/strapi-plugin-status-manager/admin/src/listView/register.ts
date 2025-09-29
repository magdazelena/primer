import type { StrapiApp } from "@strapi/admin/strapi-admin";
import React from "react";
import { StatusCell } from "./status-cell";

const INJECT_COLUMN_IN_TABLE = "Admin/CM/pages/ListView/inject-column-in-table";

export function registerListViewExtension(app: StrapiApp) {
  app.registerHook(INJECT_COLUMN_IN_TABLE, (data: any) => {
    if (!data || typeof data !== "object") return data;
    const { displayedHeaders } = data;
    if (!Array.isArray(displayedHeaders)) return data;

    const statusHeader = {
      attribute: { type: "custom" },
      name: "statusLabel",
      label: { id: "primer-status-manager.status", defaultMessage: "Status" },
      searchable: true,
      sortable: true,
      cellFormatter: (row: any, header: any, { model }: { model: string }) => {
        return React.createElement(StatusCell, { row, uid: model });
      },
    };

    // Avoid duplicate insertion if hook runs multiple times
    const alreadyPresent = displayedHeaders.some((h: any) => h?.name === statusHeader.name);
    if (alreadyPresent) return data;

    return { ...data, displayedHeaders: [...displayedHeaders, statusHeader] };
  });
}


