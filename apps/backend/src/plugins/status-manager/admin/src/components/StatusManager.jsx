import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Flex,
  Typography,
  Box,
  Badge,
  Dialog,
  SingleSelect,
  SingleSelectOption,
} from "@strapi/design-system";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, Trash, Drag } from "@strapi/icons";
import axios from "../utils/axiosInstance";

const StatusManager = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [statusToDelete, setStatusToDelete] = useState(null);
  const [replacementStatus, setReplacementStatus] = useState("");

  // Fetch statuses
  useEffect(() => {
    axios.get("/statuses").then(({ data }) => setStatuses(data));
  }, []);

  // Validate input (Latin characters only)
  const validateInput = (value) => /^[a-zA-Z\s]+$/.test(value);

  // Add new status
  const addStatus = async () => {
    if (!newStatus || !validateInput(newStatus))
      return alert("Only Latin characters allowed!");
    const { data } = await axios.post("/statuses", {
      name: newStatus,
      published: false,
    });
    setStatuses([...statuses, data]);
    setNewStatus("");
  };
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = [...statuses];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setStatuses(reordered);

    // Send new order to API
    const orderedIds = reordered.map((status, index) => ({
      id: status.id,
      order: index,
    }));
    try {
      await axios.put("/statuses/reorder", { statuses: orderedIds });
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Open delete dialog
  const confirmDelete = (status) => {
    setStatusToDelete(status);
  };

  // Delete status and replace with selected one
  const deleteStatus = async () => {
    if (!replacementStatus) return alert("Select a replacement status!");
    const statusId = statuses.find(s => s.name = replacementStatus).id
    await axios.patch(`/statuses`, {
      statusId: statusToDelete.id, replacementId: statusId 
    });
    setStatuses(statuses.filter((s) => s.id !== statusToDelete.id));
  };

  // Toggle publish status
  const togglePublish = async (id, published) => {
    await axios.put(`/statuses/${id}`, { published: !published });
    setStatuses(
      statuses.map((s) => (s.id === id ? { ...s, published: !published } : s)),
    );
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="statuses">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              marginTop={4}
            >
              {statuses.map((status, index) => (
                <Draggable
                  key={status.id}
                  draggableId={status.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Flex
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      alignItems="center"
                      gap={2}
                      marginBottom={2}
                    >
                      <Box {...provided.dragHandleProps}>
                        <Drag />
                      </Box>
                      <Typography>{status.name}</Typography>
                      <Badge
                        variant={status.published ? "success" : "secondary"}
                        onClick={() =>
                          togglePublish(status.id, status.published)
                        }
                      >
                        {status.published ? "Published" : "Unpublished"}
                      </Badge>
                      <Dialog.Root onOpenChange={() => confirmDelete(status)}>
                        <Dialog.Trigger>
                          <Button
                            variant="tertiary"
                            
                            startIcon={<Trash />}
                          >
                            Delete
                          </Button>
                        </Dialog.Trigger>
                        <Dialog.Content>
                          <Dialog.Header>Delete status</Dialog.Header>
                         { (statuses.length > 1 && statusToDelete) && ( <Dialog.Body>
                            <Typography>
                              Choose a replacement status before deleting:
                            </Typography>
                            <SingleSelect
                              onChange={setReplacementStatus}
                              placeholder="Select replacement"
                            >
                              {statuses
                                .filter((s) => s.id !== statusToDelete.id)
                                .map((s) => (
                                  <SingleSelectOption key={s.id} value={s.name}>
                                    {s.name}
                                  </SingleSelectOption>
                                ))}
                            </SingleSelect>
                            {replacementStatus && (<Typography>
                              Replacing {statusToDelete.name} with {replacementStatus}
                            </Typography>)}
                          </Dialog.Body>)}
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default StatusManager;
