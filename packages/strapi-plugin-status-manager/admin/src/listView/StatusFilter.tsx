import { useEffect, useState } from "react";

import {
  SingleSelect,
  SingleSelectOption,
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

const StatusFilter = () => {
  const { contentType, id } = useContentManagerContext();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const { get, put } = useFetchClient();

  const handleStatusChange = () => {
    // TODO: handle filtering list by status
  }

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

  return (
    <Flex
      direction="column"
      justifyContent="center"
    >
      <SingleSelect size="S" placeholder={`${contentType?.info.displayName} status`} onChange={handleStatusChange}>
        {statuses.map((status) => (
          <SingleSelectOption key={status.documentId} value={status.name}>
            {status.name}
          </SingleSelectOption>
        ))}
      </SingleSelect>
    </Flex>
  );
};

export { StatusFilter };
