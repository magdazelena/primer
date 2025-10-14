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
  const [selected, setSelected] = useState<string | undefined>("all");
  const { get } = useFetchClient();
  const [{ query }, setQuery] = useQueryParams();


  const handleStatusChange = useCallback(
    (name: string, replace = false) => {
      setQuery(
        {
          page: 1,
          plugins: { ...query.plugins, "primer-status-manager": { status: name } },
        },
        'push',
        replace
      );
    },
    [query.plugins, setQuery]
  );

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

//   useEffect(() => {
//     if (!Array.isArray(statuses)) {
//       return;
//     }
//     /**
//      * Handle the case where the current locale query param doesn't exist
//      * in the list of available locales, so we redirect to the default locale.
//      */
//     const currentDesiredLocale = query.plugins?.['status-manager']?.status;
//     const doesLocaleExist = statuses.find((loc) => loc.name === currentDesiredLocale);
//     if (!doesLocaleExist) {
//       handleStatusChange('all', true);
//     }
//   }, [handleStatusChange, statuses, query.plugins?.['status-manager']?.status]);

  return (
    <Flex
      direction="column"
      justifyContent="center"
    >
      <SingleSelect size="S" placeholder={`${contentType?.info.displayName} status`} value={selected} onChange={handleStatusChange}>
        <SingleSelectOption key="__all__" value={"all"}>
          All statuses
        </SingleSelectOption>
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
