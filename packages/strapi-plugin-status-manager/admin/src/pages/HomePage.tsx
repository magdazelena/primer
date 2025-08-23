import { Flex, Typography, Box } from "@strapi/design-system";
import { Layouts, Page } from "@strapi/strapi/admin";

import { defaultLogger } from "../../../server/src/utils/debug";
import { StatusManager } from "../components/StatusManager";

const HomePage = () => {
  defaultLogger.log("HomePage");
  return (
    <Layouts.Root>
      <Page.Title>Status Manager</Page.Title>
      <Page.Main>
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
      </Page.Main>
    </Layouts.Root>
  );
};

export { HomePage };
