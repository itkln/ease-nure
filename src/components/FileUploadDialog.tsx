import React, {FormEvent, useState} from 'react';
import {CloseRounded} from "@mui/icons-material";
import {useQueryClient} from "@tanstack/react-query";
import useFileAdd from "@/app/api/v1/receipts/hooks/useFileAdd";
import useFileUpload from "@/app/api/v1/receipts/hooks/useFileUpload";
import TableBuilder from "@/components/table/TableBuilder";
import useDragAndDrop from "@/app/api/v1/receipts/hooks/useDragAndDrop";

interface FileUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FileUploadDialog = ({isOpen, onClose}: FileUploadModalProps) => {
    const {receipts, setReceipts, handleAdd, handleRemove} = useFileAdd()
    const {mutate, isError, error} = useFileUpload({handleAdd})
    const {
        dragActive,
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    } = useDragAndDrop({onFilesDropped: uploadFiles});

    async function uploadFiles(files: File[]) {
        for (const file of files) {
            const formData = new FormData();
            formData.append("filedata", file);
            formData.append("filename", file.name);
            formData.append("filetype", file.type);
            mutate(formData)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files) as File[];
            uploadFiles(newFiles).then(() => console.log("Upload complete or with errors."))
        } else {
            // Handle the case where no files are selected
            console.log("No files selected");
        }
    };

    const handleCloseModal = () => {
        setReceipts([])
        onClose()
    };

    if (!isOpen) return null;

    return (
        <div className="fixed px-5 inset-0 backdrop-blur-sm h-full w-full z-50 transition-all duration-300 ease-in-out">
            <div className="relative bg-background top-20 mx-auto p-5 border max-w-[630px] shadow-lg rounded-md">
                <div className="upload-header flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Upload files</h1>
                    <CloseRounded
                        className="cursor-pointer hover:bg-muted transition duration-200 px-[3px] border-2 border-solid rounded-md"
                        fontSize="medium" onClick={handleCloseModal}/>
                </div>
                <form
                    className={`${
                        dragActive ? "bg-gray-200 transition duration-200" : "bg-none"
                    }  p-4 rounded-lg my-5  min-h-[10rem] border-2 border-dashed text-center flex items-center justify-center`}
                    onDragEnter={handleDragEnter}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                >
                    <input
                        placeholder="fileInput"
                        className="hidden"
                        type="file"
                        multiple={true}
                        onChange={handleInputChange}
                        accept="image/*,.pdf"
                    />
                    <p>
                        Drag or drop files here or{" "}
                        <span
                            className="font-bold text-blue-600 cursor-pointer"
                            onClick={() => {
                                const inputEl = document.querySelector('input[type="file"]') as HTMLInputElement;
                                inputEl?.click();
                            }}
                        >
                          <u>choose file</u>
                        </span>
                    </p>
                </form>

                <span className="font-bold text-sm">UPLOADED FILES ({receipts.length})</span>

                <div className="flex flex-col items-center py-5">
                    <TableBuilder columns={["FILE NAME", "FORMAT", "STATUS"]} rows={receipts}
                                  actions={{handleRemove}}/>
                </div>
            </div>
        </div>
    );
};

export default FileUploadDialog;