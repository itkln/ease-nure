import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReceiptService from '@/app/api/v1/receipts/service/receipt.service';

const QUERY_KEY = 'receipts';

const useGetAllReceipts = () => {
  // Keep the shouldRefetch state for controlling the refetch interval.
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const getReceipts = async () => {
    const response = await ReceiptService.getAll();
    // Immediately process the response to determine if we need to refetch.
    const receipts = response.data?.receipt || [];
    const hasUploadedReceipt = receipts.some(receipt => receipt.status === 'Uploaded' || receipt.status === 'Approving');
    setShouldRefetch(hasUploadedReceipt); // Adjust refetching based on the current data.
    return receipts;
  };

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getReceipts,
    // Continue using a function to dynamically determine refetchInterval.
    refetchInterval: shouldRefetch ? 1000 : false,
  });

  // Remove useEffect if it's not needed for other logic.

  return { data, isSuccess, isLoading, isError, error };
};

export default useGetAllReceipts;
