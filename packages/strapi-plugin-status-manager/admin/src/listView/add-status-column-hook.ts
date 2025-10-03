import { StatusCell } from "./status-cell";
import { ListFieldLayout, ListLayout } from "@strapi/content-manager/strapi-admin";
import { Handler } from "@strapi/utils/dist/hooks";
import React from "react";

interface AddColumnToTableHookArgs {
  layout: ListLayout;
  displayedHeaders: ListFieldLayout[];
}
export const addStatusColumnHook = ({ displayedHeaders, layout }: AddColumnToTableHookArgs) => {

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

  return {
    displayedHeaders: [
      ...displayedHeaders,
      statusHeader,
    ],
    layout,
  };
};

