import React, { useState, useEffect } from 'react';
import { TextInput, Button, Flex, Typography, Box, Badge, Dialog, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Trash, Drag } from '@strapi/icons';
import axios from '../utils/axiosInstance';

const StatusManager = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [statusToDelete, setStatusToDelete] = useState(null);
  const [replacementStatus, setReplacementStatus] = useState('');

  // Fetch statuses
  useEffect(() => {
    axios.get('/statuses').then(({ data }) => setStatuses(data));
  }, []);

  // Validate input (Latin characters only)
  const validateInput = (value) => /^[a-zA-Z\s]+$/.test(value);

  // Add new status
  const addStatus = async () => {
    if (!newStatus || !validateInput(newStatus)) return alert("Only Latin characters allowed!");
    const { data } = await axios.post('/statuses', { name: newStatus, published: false });
    setStatuses([...statuses, data]);
    setNewStatus('');
  };

  // Open delete dialog
  const confirmDelete = (status) => {
    setStatusToDelete(status);
    setDeleteDialog(true);
  };

  // Delete status and replace with selected one
  const deleteStatus = async () => {
    if (!replacementStatus) return alert("Select a replacement status!");
    await axios.delete(`/statuses/${statusToDelete.id}`, { data: { replaceWith: replacementStatus } });
    setStatuses(statuses.filter(s => s.id !== statusToDelete.id));
    setDeleteDialog(false);
  };

  // Toggle publish status
  const togglePublish = async (id, published) => {
    await axios.put(`/statuses/${id}`, { published: !published });
    setStatuses(statuses.map(s => s.id === id ? { ...s, published: !published } : s));
  };

  // Handle reordering
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...statuses];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setStatuses(reordered);
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
        <Button onClick={addStatus} startIcon={<Plus />}>Add Status</Button>
      </Flex>

      {/* Status List */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="statuses">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps} marginTop={4}>
              {statuses.map((status, index) => (
                <Draggable key={status.id} draggableId={status.id.toString()} index={index}>
                  {(provided) => (
                    <Flex ref={provided.innerRef} {...provided.draggableProps} alignItems="center" gap={2} marginBottom={2}>
                      <Box {...provided.dragHandleProps}>
                        <Drag />
                      </Box>
                      <Typography>{status.name}</Typography>
                      <Badge 
                        variant={status.published ? "success" : "secondary"} 
                        onClick={() => togglePublish(status.id, status.published)}
                      >
                        {status.published ? "Published" : "Unpublished"}
                      </Badge>
                      <Button variant="tertiary" onClick={() => confirmDelete(status)} startIcon={<Trash />}>Delete</Button>
                    </Flex>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* Delete Confirmation Dialog */}
      {deleteDialog && (
        <Dialog onClose={() => setDeleteDialog(false)} title="Delete Status">
          <Typography>Choose a replacement status before deleting:</Typography>
          <SingleSelect onChange={setReplacementStatus} placeholder="Select replacement">
            {statuses.filter(s => s.id !== statusToDelete.id).map(s => (
              <SingleSelectOption key={s.id} value={s.id}>{s.name}</SingleSelectOption>
            ))}
          </SingleSelect>
          <Flex justifyContent="flex-end" marginTop={4}>
            <Button variant="secondary" onClick={() => setDeleteDialog(false)}>Cancel</Button>
            <Button variant="danger-light" onClick={deleteStatus}>Delete</Button>
          </Flex>
        </Dialog>
      )}
    </Box>
  );
};

export default StatusManager;
