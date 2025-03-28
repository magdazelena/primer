import React, { useEffect, useState } from 'react';
import { SingleSelect, SingleSelectOption, Box, Typography } from '@strapi/design-system';
import { useFetchClient, unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';

const ProductStatusField = ({  
    document, 
}) => {
  const productId = document?.documentId;
  const [statuses, setStatuses] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('')
  const [message, setMessage] = useState('')
  const { get, put } = useFetchClient();
  const {
    model,
  } = useContentManagerContext();
  useEffect(() => {
    async function fetchCurrentStatus(){
        try {
            const { data: productData } = await get(`/content-manager/collection-types/api::product.product/${productId}?populate[statusName][populate]=*`);
            const status = productData.data.statusName;
            if (status && status.name) return setCurrentStatus(status.name)
            if (statuses.length) return handleStatusChange(statuses[0].documentId)
        }catch (error) {
            console.error("Error fetching product status:", error);
        }
    }
    if (productId) fetchCurrentStatus();
    if (!productId && statuses.length) setCurrentStatus(statuses[0].name)
  }, [productId, statuses, get]);
  
  useEffect(() => {
    async function fetchStatuses() {
      try {
        const { data } = await get('/status-manager/statuses');
        setStatuses(data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    }
    fetchStatuses();
  }, [get]);

  const handleStatusChange = async (newStatus) => {
    if (!productId) setMessage("Save the product first and then change the status")
    const newStatusName = statuses.find(s => s.documentId === newStatus).name
    try {
      await put(`/content-manager/collection-types/api::product.product/${productId}`, {
          statusName: {
            set: [{ documentId: newStatus }]
          }
        
      });
      setMessage(`Status updated from ${currentStatus} to ${newStatusName}`);
      setCurrentStatus(newStatusName);
      
    } catch (error) {
      setMessage("Error updating status");
      console.error("Error updating status:", error);
    }
  };
  if (model !== 'api::product.product') return null;
  return {
    title: "Status",
    content: (
        <Box>
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
          <Box padding={2}><Typography variant="sigma" >{message}</Typography></Box>
        </Box>
      )
  } 
};

export default ProductStatusField;
