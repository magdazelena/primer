import { StatusCell } from "./status-cell";
import { ListFieldLayout, ListLayout } from "@strapi/content-manager/strapi-admin";
import React from "react";
import { AnyDocument } from "@strapi/types/dist/modules/documents";

interface AddColumnToTableHookArgs {
  layout: ListLayout;
  displayedHeaders: ListFieldLayout[];
}
export const addStatusColumnHook = ({ displayedHeaders, layout }: AddColumnToTableHookArgs) => {

  const statusHeader = {
    attribute: { type: "custom" },
    name: "statusLabel",
    label: { id: "primer-status-manager.status", defaultMessage: "Status" },
    searchable: false,
    sortable: false,
    cellFormatter: (row: AnyDocument) => {
      return React.createElement(StatusCell, { row });
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

