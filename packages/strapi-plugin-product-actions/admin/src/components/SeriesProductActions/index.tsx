import React, { useState } from "react";

import {
  Box,
  Button,
  Typography,
  Dialog,
  NumberInput,
  Flex,
  MultiSelect,
  MultiSelectOption,
} from "@strapi/design-system";
import {
  useFetchClient,
  unstable_useContentManagerContext as useContentManagerContext,
} from "@strapi/strapi/admin";

import { en } from "../../translations";

const formatMessage = (arg: { id: string }): string => {
  return en[arg.id];
};

const valuesToUpdate = [
  "description",
  "shortDescription",
  "media",
  "coverImage",
  "seo",
  "totalCost",
  "wholesalePrice",
  "retailPrice",
  "category",
  "creator",
];

interface Document {
  documentId?: string;
}

const SeriesProductActions = ({ document }: { document: Document }) => {
  const { model } = useContentManagerContext();
  const documentId = document?.documentId;
  const [productCount, setProductCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldsToUpdate, setFieldsToUpdate] = useState<string[]>([]);
  const { post, put } = useFetchClient();

  if (model !== "api::product-series.product-series") return null;

  const handleCreateProducts = async () => {
    try {
      setIsLoading(true);
      const response = await post(`primer-product-actions/create-products`, {
        count: productCount,
        id: documentId,
      });

      if (!response.data) {
        throw new Error("Failed to create products");
      }

      setProductCount(1);
    } catch (error) {
      console.error("Error creating products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProducts = async () => {
    try {
      setIsLoading(true);
      const response = await put(
        `/product-actions/product-series/${documentId}/update-products`,
        {
          fieldsToUpdate,
        },
      );

      if (!response.data) {
        throw new Error("Failed to update products");
      }
    } catch (error) {
      console.error("Error updating products:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    title: "Series Product Actions",
    content: (
      <Box>
        <Box>
          <Typography variant="delta" fontWeight="bold">
            {formatMessage({ id: "product-series.actions.label" })}
          </Typography>
          <Flex wrap={"wrap"}>
            {!documentId && (
              <Typography
                display={"block"}
                marginTop={2}
                marginBottom={2}
                width="100%"
                color="red"
              >
                {formatMessage({ id: "product-series.actions.noDocumentId" })}
              </Typography>
            )}

            <Dialog.Root>
              <Dialog.Trigger>
                <Button variant="secondary" disabled={isLoading || !documentId}>
                  {formatMessage({
                    id: "product-series.actions.createProducts",
                  })}
                </Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Body>
                  <Box>
                    <Typography>
                      {formatMessage({
                        id: "product-series.actions.createDialogTitle",
                      })}
                    </Typography>
                    <NumberInput
                      value={productCount}
                      onValueChange={(value) => setProductCount(value || 1)}
                      min={1}
                      max={100}
                    ></NumberInput>
                  </Box>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Cancel>
                    <Button fullWidth variant="tertiary">
                      Cancel
                    </Button>
                  </Dialog.Cancel>
                  <Dialog.Action>
                    <Button
                      onClick={handleCreateProducts}
                      variant="default"
                      loading={isLoading}
                    >
                      {formatMessage({ id: "product-series.actions.create" })}
                    </Button>
                  </Dialog.Action>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>

            {/* Update Products Dialog */}
            <Dialog.Root>
              <Dialog.Trigger>
                <Button
                  marginLeft={2}
                  variant="secondary"
                  disabled={isLoading || !documentId}
                >
                  {formatMessage({
                    id: "product-series.actions.updateProducts",
                  })}
                </Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Body
                  display={"flex"}
                  direction={"column"}
                  gap={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Typography variant="delta" fontWeight="bold">
                    {formatMessage({
                      id: "product-series.actions.updateDialogTitle",
                    })}
                  </Typography>
                  <Typography>
                    {formatMessage({
                      id: "product-series.actions.updateDialogDescription",
                    })}
                  </Typography>
                  <MultiSelect
                    withTags={true}
                    value={fieldsToUpdate}
                    onClear={() => setFieldsToUpdate([])}
                    onChange={(value: string[]) => setFieldsToUpdate(value)}
                    required={true}
                    placeholder={formatMessage({
                      id: "product-series.actions.selectFields",
                    })}
                  >
                    {valuesToUpdate.map((field) => (
                      <MultiSelectOption key={field} value={field}>
                        {field}
                      </MultiSelectOption>
                    ))}
                  </MultiSelect>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Cancel>
                    <Button fullWidth variant="tertiary">
                      Cancel
                    </Button>
                  </Dialog.Cancel>
                  <Dialog.Action>
                    <Button
                      onClick={handleUpdateProducts}
                      variant="default"
                      loading={isLoading}
                    >
                      {formatMessage({ id: "product-series.actions.update" })}
                    </Button>
                  </Dialog.Action>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
        </Box>
      </Box>
    ),
  };
};

export { SeriesProductActions };
