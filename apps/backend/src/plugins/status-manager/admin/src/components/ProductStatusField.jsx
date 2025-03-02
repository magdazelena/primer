import React, { useEffect, useState } from 'react';
import { SingleSelect,SingleSelectOption, Box, Typography } from '@strapi/design-system';
import axios from '../utils/axiosInstance';

const ProductStatusField = ({  
    document, 
}) => {
const productId = document.documentId;
  const [statuses, setStatuses] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('')

  useEffect(() => {
    async function fetchCurrentStatus(){
        try {
            const {data} = await axios.get(`/products/${productId}?populate=status`)
            setCurrentStatus(data.data.status.name)
        }catch (error) {
            console.error("Error fetching product status:", error);
          }
    }
    fetchCurrentStatus()
  }, [productId]);
  
  useEffect(() => {
    async function fetchStatuses() {
      try {
        const { data } = await axios.get('/status-manager/statuses');
        setStatuses(data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    }
    fetchStatuses();
    
  }, []);

  const handleStatusChange = async (newStatus) => {
    const newStatusName = statuses.find(s => s.documentId === newStatus).name
    try {
      await axios.put(`/products/${productId}?populate=status`, { data: {
        status: {
            set: [{ documentId: newStatus }]
        }
      } });
      setCurrentStatus(newStatusName);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return {
    title: "Status",
    content: (
        <Box padding={2}>
          <SingleSelect
            placeholder={currentStatus}
            onChange={handleStatusChange}
          >
            {statuses.map((status) => (
              <SingleSelectOption key={status.documentId} value={status.documentId}>
                {status.name}
              </SingleSelectOption>
            ))}
          </SingleSelect>
        </Box>
      )
  } 
};

export default ProductStatusField;
