import { Flex, Typography, Box } from "@strapi/design-system";
import { Layouts, Page } from "@strapi/strapi/admin";

import { StatusManager } from "../components/StatusManager";
import pluginPermissions from "../permissions";

const HomePage = () => {
  return (
    <Layouts.Root>
      <Page.Title>Status Manager</Page.Title>
      <Page.Main>
        <Page.Protect permissions={pluginPermissions.accessStatusManager}>
        <Layouts.Content>
          <Box>
            <Flex
              padding={10}
              gap={{
                initial: 1,
                medium: 4,
                large: 8,
              }}
              direction={{
                initial: "column",
                medium: "row",
              }}
              alignItems={{
                initial: "center",
                medium: "flex-start",
              }}
            >
              <Box padding={1}>
                <Typography variant="alpha">Status manager</Typography>
                <StatusManager />
              </Box>
            </Flex>
          </Box>
        </Layouts.Content>
        </Page.Protect>
      </Page.Main>
    </Layouts.Root>
  );
};

export { HomePage };
