import React, { useState, useCallback } from 'react';

type UseDragAndDropArgs = {
    onFilesDropped: (files: File[]) => Promise<void>;
};

function useDragAndDrop({ onFilesDropped }: UseDragAndDropArgs) {
    const [dragActive, setDragActive] = useState(false);

    const handleDragEnter = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true);
    }, []);

    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true); // It might seem redundant, but it ensures the drag state remains active throughout the drag-over event.
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);

        if (event.dataTransfer.files) {
            const newFiles = Array.from(event.dataTransfer.files);
            onFilesDropped(newFiles).then(() => console.log("Upload complete or with errors."))
        }
    }, [onFilesDropped]);

    // Return the state and handlers to be used by the component
    return {
        dragActive,
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    };
}

export default useDragAndDrop;