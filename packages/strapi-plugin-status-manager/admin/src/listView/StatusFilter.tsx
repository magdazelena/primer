import { useCallback, useEffect, useState } from "react";

import {
  SingleSelect,
  SingleSelectOption,
  Flex,
} from "@strapi/design-system";
import {
  useFetchClient,
  unstable_useContentManagerContext as useContentManagerContext,
  useQueryParams,
} from "@strapi/strapi/admin";
interface Status {
  documentId: string;
  name: string;
}

const StatusFilter = () => {
  const { contentType } = useContentManagerContext();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [selected, setSelected] = useState<string | undefined>("");
  const { get } = useFetchClient();
  const [{ query }, setQuery] = useQueryParams<{page: number, plugins: { 'primer-status-manager': { statusName: string } } }>();


  const handleStatusChange = useCallback(
    (name: string) => {
      setQuery(
        {
          page: 1,
          plugins: { ...query.plugins, "primer-status-manager": { statusName: name.toLowerCase() } },

        },
        'push',
        true
      );
    },

    [query.plugins, setQuery]
  );

  useEffect(() => {
    const selectedStatusName = query.plugins?.['primer-status-manager']?.statusName; 
    if(!selectedStatusName) return;
    const status = statuses.find((status) => status.name.toLowerCase() === selectedStatusName);
    if (status) {
      setSelected(status.name);
    }
  }, [query, statuses]);

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const { data } = await get("primer-status-manager/statuses");
        const allStatusesObject = {
          documentId: "all",
          name: "All",
        }
        setStatuses([allStatusesObject, ...data]);
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
      <SingleSelect size="S" placeholder={`${contentType?.info.displayName} status`} value={selected} onChange={handleStatusChange}>
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
