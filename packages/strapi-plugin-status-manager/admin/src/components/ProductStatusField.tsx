import React, { useEffect, useState, useCallback } from "react";

import {
  SingleSelect,
  SingleSelectOption,
  Box,
  Typography,
  Flex,
} from "@strapi/design-system";
import {
  useFetchClient,
  unstable_useContentManagerContext as useContentManagerContext,
} from "@strapi/strapi/admin";

interface Status {
  documentId: string;
  name: string;
}

const ProductStatusField = () => {
  const { contentType, id } = useContentManagerContext();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [message, setMessage] = useState("");
  const { get, put } = useFetchClient();

  const handleStatusChange = useCallback(
    async (newStatus: string) => {
      if (!id) {
        setMessage("Save the product first and then change the status");
        return;
      }
      try {
        await put(`primershop-status-manager/content-status`, {
          contentTypeUid: "api::product.product",
          contentDocumentId: id,
          statusId: statuses.find((status) => status.name === newStatus)
            ?.documentId,
        });
        setMessage(
          `Status updated ${currentStatus ? `from ${currentStatus}` : ""} to ${newStatus}`
        );
        setCurrentStatus(newStatus || "");
      } catch (error) {
        setMessage("Error updating status");
        console.error("Error updating status:", error);
      }
    },
    [id, statuses, currentStatus, put]
  );

  useEffect(() => {
    async function fetchCurrentStatus() {
      try {
        const { data: productData } = await get(
          `primershop-status-manager/content-status?contentDocumentId=${id}&contentTypeUid=api::product.product`
        );
        const status = productData?.status;
        if (status && status.name) return setCurrentStatus(status.name);
        if (statuses.length) return handleStatusChange(statuses[0].name);
      } catch (error) {
        console.error("Error fetching product status:", error);
      }
    }
    if (id && !currentStatus.length) fetchCurrentStatus();
    if (!id && statuses.length) setCurrentStatus(statuses[0].name);
  }, [id, statuses, get]);

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const { data } = await get("primershop-status-manager/statuses");
        setStatuses(data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    }
    fetchStatuses();
  }, [get]);

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      width="100%"
    >
      <Box padding={2}>
        <Typography variant="sigma">
          {contentType?.info.displayName} status
        </Typography>
      </Box>
      <SingleSelect placeholder={currentStatus} onChange={handleStatusChange}>
        {statuses.map((status) => (
          <SingleSelectOption key={status.documentId} value={status.name}>
            {status.name}
          </SingleSelectOption>
        ))}
      </SingleSelect>
      <Box padding={2}>
        <Typography variant="sigma">{message}</Typography>
      </Box>
    </Flex>
  );
};

export { ProductStatusField };
