import React, { useEffect, useState, useCallback } from "react";

import {
  SingleSelect,
  SingleSelectOption,
  Box,
  Typography,
} from "@strapi/design-system";
// @ts-expect-error - Strapi admin types not available
import {
  useFetchClient,
  unstable_useContentManagerContext as useContentManagerContext,
} from "@strapi/strapi/admin";

interface Document {
  documentId?: string;
}

interface Status {
  documentId: string;
  name: string;
}

const ProductStatusField = ({ document }: { document: Document }) => {
  const { model } = useContentManagerContext();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [message, setMessage] = useState("");
  const { get, put } = useFetchClient();

  const productId = document?.documentId;

  const handleStatusChange = useCallback(
    async (newStatus: string) => {
      if (!productId) {
        setMessage("Save the product first and then change the status");
        return;
      }
      const newStatusName = statuses.find(
        (s) => s.documentId === newStatus,
      )?.name;
      try {
        await put(`primer-status-manager/update-content`, {
          contentTypeId: "api::product.product",
          contentItemId: productId,
          statusId: newStatus,
        });
        setMessage(`Status updated from ${currentStatus} to ${newStatusName}`);
        setCurrentStatus(newStatusName || "");
      } catch (error) {
        setMessage("Error updating status");
        console.error("Error updating status:", error);
      }
    },
    [productId, statuses, currentStatus, put],
  );

  useEffect(() => {
    async function fetchCurrentStatus() {
      try {
        const { data: productData } = await get(
          `primer-status-manager/get-content-status?contentItemId=${productId}&contentTypeId=api::product.product`,
        );
        const status = productData.data.statusName;
        if (status && status.name) return setCurrentStatus(status.name);
        if (statuses.length) return handleStatusChange(statuses[0].documentId);
      } catch (error) {
        console.error("Error fetching product status:", error);
      }
    }
    if (productId) fetchCurrentStatus();
    if (!productId && statuses.length) setCurrentStatus(statuses[0].name);
  }, [productId, statuses, get]);

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const { data } = await get("primer-status-manager/statuses");
        setStatuses(data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    }
    fetchStatuses();
  }, [get]);

  if (model !== "api::product.product") return null;

  return {
    title: "Status",
    content: (
      <Box>
        <SingleSelect placeholder={currentStatus} onChange={handleStatusChange}>
          {statuses.map((status) => (
            <SingleSelectOption
              key={status.documentId}
              value={status.documentId}
            >
              {status.name}
            </SingleSelectOption>
          ))}
        </SingleSelect>
        <Box padding={2}>
          <Typography variant="sigma">{message}</Typography>
        </Box>
      </Box>
    ),
  };
};

export { ProductStatusField };
