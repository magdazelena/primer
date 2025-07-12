//@ts-nocheck
import React, { useState, useEffect, useCallback, useRef } from "react";

import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import {
  TextInput,
  Button,
  Flex,
  Typography,
  Box,
  Dialog,
  SingleSelect,
  SingleSelectOption,
} from "@strapi/design-system";
import { Plus, Trash, Drag } from "@strapi/icons";
//@ts-ignore
import { useFetchClient } from "@strapi/strapi/admin";

const StatusManager = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [statusToDelete, setStatusToDelete] = useState(null);
  const [replacementStatus, setReplacementStatus] = useState("");
  const { get, post, put, del } = useFetchClient();
  const [instanceId] = useState(() => Symbol("instance-id"));

  // Fetch statuses
  useEffect(() => {
    const loadStatuses = async () => {
      const { data } = await get("primer-status-manager/statuses");
      setStatuses(data);
    };
    loadStatuses();
  }, [get]);

  // Validate input (Latin characters only)
  const validateInput = (value) => /^[a-zA-Z\s]+$/.test(value);

  // Add new status
  const addStatus = async () => {
    if (!newStatus || !validateInput(newStatus))
      return alert("Only Latin characters allowed!");
    try {
      const { data } = await post("primer-status-manager/status", {
        name: newStatus,
        published: false,
      });
      setStatuses([...statuses, data]);
      setNewStatus("");
    } catch (error) {
      console.error("Error creating status:", error);
    }
  };

  const reorderItem = async ({
    startIndex,
    indexOfTarget,
    closestEdgeOfTarget,
  }) => {
    // Calculate the final index based on the target position and edge
    let finishIndex = indexOfTarget;
    if (closestEdgeOfTarget === "bottom") {
      finishIndex = indexOfTarget + 1;
    }

    // If moving an item down, we need to adjust for the removed item
    if (startIndex < finishIndex) {
      finishIndex--;
    }

    if (finishIndex === startIndex) {
      return;
    }

    const reordered = reorder({
      list: statuses,
      startIndex,
      finishIndex,
    });
    // Send new order to API
    const orderedIds = reordered.map((status, index) => ({
      documentId: status.documentId,
      order: index,
    }));

    await put("/primer-status-manager/statuses/reorder", {
      statuses: orderedIds,
    });
    setStatuses(reordered);
  };
  // Setup drag and drop
  useEffect(() => {
    const statusElements = document.querySelectorAll("[data-status-id]");
    const cleanupFunctions = [];

    statusElements.forEach((element) => {
      const statusId = element.getAttribute("data-status-id");
      const index = statuses.findIndex((s) => s.documentId == statusId);
      const dragHandle = element.querySelector("[data-drag-handle]");

      if (!dragHandle) return;

      // Setup draggable
      const draggableCleanup = draggable({
        element: dragHandle as HTMLElement,
        getInitialData: () => ({
          statusId,
          index,
          instanceId,
        }),
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: "16px",
              y: "8px",
            }),
            render({ container }) {
              const preview = document.createElement("div");
              preview.style.padding = "8px 16px";
              preview.style.backgroundColor = "#fff";
              preview.style.border = "1px solid #ccc";
              preview.style.borderRadius = "4px";
              preview.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              preview.textContent =
                element.querySelector("[data-status-name]").textContent;
              container.appendChild(preview);
              return () => container.removeChild(preview);
            },
          });
        },
      });

      // Setup drop target
      const dropTargetCleanup = dropTargetForElements({
        element: element as HTMLElement,
        canDrop: ({ source }) => source.data.instanceId === instanceId,
        getData({ input }) {
          return attachClosestEdge(
            { statusId, index, instanceId },
            {
              element,
              input,
              allowedEdges: ["top", "bottom"],
            },
          );
        },
        onDrag({ source, self }) {
          const isSource = source.element === dragHandle;
          if (isSource) return;

          const closestEdge = extractClosestEdge(self.data);
          const sourceIndex = Number(source.data.index);

          const isItemBeforeSource = index === sourceIndex - 1;
          const isItemAfterSource = index === sourceIndex + 1;

          const isDropIndicatorHidden =
            (isItemBeforeSource && closestEdge === "bottom") ||
            (isItemAfterSource && closestEdge === "top");

          if (isDropIndicatorHidden) return;

          // Add visual feedback for drop target
          (element as HTMLElement).style.background =
            `linear-gradient(${closestEdge === "top" ? 180 : 0}deg, rgba(136,131,214,0.4) 0%, rgba(255,255,255,0) 50%)`;
        },
        onDragLeave() {
          (element as HTMLElement).style.background = "";
        },
        onDrop({ source, self }) {
          (element as HTMLElement).style.background = "";

          const sourceData = source.data;
          const targetData = self.data;
          const indexOfTarget = statuses.findIndex(
            (s) => s.documentId == targetData.statusId,
          );
          if (indexOfTarget < 0) return;

          const closestEdgeOfTarget = extractClosestEdge(targetData);

          reorderItem({
            startIndex: sourceData.index,
            indexOfTarget,
            closestEdgeOfTarget,
          });
        },
      });

      // Combine cleanup functions
      const combinedCleanup = combine(draggableCleanup, dropTargetCleanup);
      cleanupFunctions.push(combinedCleanup);
    });

    // Monitor for drops
    const monitorCleanup = monitorForElements({
      canMonitor: ({ source }) => source.data.instanceId === instanceId,
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceData = source.data;
        const targetData = target.data;

        const indexOfTarget = statuses.findIndex(
          (s) => s.documentId == targetData.statusId,
        );
        if (indexOfTarget < 0) return;

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        reorderItem({
          startIndex: sourceData.index,
          indexOfTarget,
          closestEdgeOfTarget,
        });
      },
    });

    // Cleanup function
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
      monitorCleanup();
    };
  }, [statuses, reorderItem, instanceId]);

  // Open delete dialog
  const confirmDelete = (status) => {
    setStatusToDelete(status);
  };

  // Delete status and replace with selected one
  const deleteStatus = async () => {
    if (!replacementStatus) return alert("Select a replacement status!");

    const replacementStatusObj = statuses.find(
      (s) => s.name === replacementStatus,
    );
    if (!replacementStatusObj) return alert("Replacement status not found!");

    try {
      await put("/primer-status-manager/statuses/delete", {
        statusId: statusToDelete.documentId,
        replacementId: replacementStatusObj.documentId,
      });

      // Remove the deleted status from the list
      setStatuses(
        statuses.filter((s) => s.documentId !== statusToDelete.documentId),
      );
      setStatusToDelete(null);
      setReplacementStatus("");
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  // Toggle publish status
  const togglePublish = async (id, published) => {
    try {
      await put(`/primer-status-manager/statuses/${id}`, {
        published: !published,
      });
      setStatuses(
        statuses.map((s) =>
          s.documentId === id ? { ...s, published: !published } : s,
        ),
      );
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  return (
    <Box padding={4}>
      <Typography variant="beta">Status Manager</Typography>

      {/* Input Field */}
      <Flex marginTop={4} gap={2}>
        <TextInput
          placeholder="Enter a status..."
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        />
        <Button onClick={addStatus} startIcon={<Plus />}>
          Add Status
        </Button>
      </Flex>

      {/* Status List */}
      <Box key={statuses.length} marginTop={4}>
        {statuses.map((status) => (
          <Flex
            key={`status-${status.documentId}`}
            data-status-id={status.documentId}
            alignItems="center"
            gap={2}
            marginBottom={2}
            paddingBottom={2}
            style={{
              borderBottom: `1px solid gray`,
              minWidth: 300,
              userSelect: "none",
              touchAction: "none",
            }}
          >
            <Box
              key={`dragHandle-${status.documentId}`}
              data-drag-handle
              style={{
                cursor: "grab",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Drag />
            </Box>
            <Typography
              variant="sigma"
              style={{ display: "inline-block", marginRight: "auto" }}
              data-status-name
            >
              {status.name}
            </Typography>
            <Button
              variant={status.published ? "success-light" : "secondary"}
              onClick={() => togglePublish(status.documentId, status.published)}
            >
              {status.published ? "Published" : "Unpublished"}
            </Button>
            <Dialog.Root onOpenChange={() => confirmDelete(status)}>
              <Dialog.Trigger>
                <Button variant="tertiary" startIcon={<Trash />}>
                  Delete
                </Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>Delete status</Dialog.Header>
                {statuses.length > 1 && statusToDelete && (
                  <Dialog.Body>
                    <Typography>
                      Choose a replacement status before deleting:
                    </Typography>
                    <SingleSelect
                      onChange={(value) =>
                        setReplacementStatus(value as string)
                      }
                      placeholder="Select replacement"
                    >
                      {statuses
                        .filter(
                          (s) => s.documentId !== statusToDelete.documentId,
                        )
                        .map((s) => (
                          <SingleSelectOption
                            key={`statusChoice-${s.documentId}`}
                            value={s.name}
                          >
                            {s.name}
                          </SingleSelectOption>
                        ))}
                    </SingleSelect>
                    {replacementStatus && (
                      <Typography>
                        Replacing {statusToDelete.name} with {replacementStatus}
                      </Typography>
                    )}
                  </Dialog.Body>
                )}
                <Dialog.Footer>
                  <Dialog.Cancel>
                    <Button fullWidth variant="tertiary">
                      Cancel
                    </Button>
                  </Dialog.Cancel>
                  <Dialog.Action>
                    <Button
                      fullWidth
                      variant="danger-light"
                      onClick={deleteStatus}
                    >
                      Yes, delete
                    </Button>
                  </Dialog.Action>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default StatusManager;
