import React, {FormEvent, useState} from 'react';
import {CloseRounded, MoreHorizRounded} from "@mui/icons-material";
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import ReceiptService from "@/app/api/v1/receipts/services/receipt.service";

interface FileUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Receipt = {
    fileId: string
    status: string
    filename: string
    filetype: string
}

const FileUploadModal = ({isOpen, onClose}: FileUploadModalProps) => {
    const queryClient = useQueryClient();
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const {mutate, isError, error} = useMutation({
        mutationFn: (formData: FormData) => ReceiptService.upload(formData),
        onSuccess: (response) => {
            console.log("File successfully added: " + response.data.timestamp)
            const receipt: Receipt = {
                fileId: response.data.fileId, // Adjust according to your actual data structure
                status: response.data.current_status, // Adjust according to your actual data structure
                filename: response.data.filename,
                filetype: response.data.filetype
            };

            // Update state with the new Receipt
            setReceipts(prevReceipts => [...prevReceipts, receipt]);
            queryClient.invalidateQueries({queryKey: ['receipts']})
        }
    })

    const uploadFiles = async (files: File[]) => {
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

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        if (event.dataTransfer.files) {
            const newFiles = Array.from(event.dataTransfer.files) as File[];
            uploadFiles(newFiles).then(() => console.log("Upload complete or with errors."))
        }
    };

    const handleDragLeave = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true);
    };

    const handleDragEnter = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true);
    };

    const handleRemoveFile = (index: number) => {
        const newReceipts = [...receipts];
        newReceipts.splice(index, 1);
        setReceipts(newReceipts);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Implement the file upload logic here with 'files' state
        onClose(); // Close the modal after submitting
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border max-w-[630px] shadow-lg rounded-md bg-white">
                <div className="upload-header flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Upload files</h1>
                    <div
                        className="upload-close cursor-pointer py-[1px] hover:bg-gray-200 transition duration-200 px-[3px] border-2 border-solid rounded-md">
                        <CloseRounded fontSize="small" onClick={onClose}/>
                    </div>
                </div>
                <form
                    className={`${
                        dragActive ? "bg-gray-200 transition duration-200" : "bg-none"
                    }  p-4 rounded-lg my-5  min-h-[10rem] border-2 border-dashed text-center flex items-center justify-center`}
                    onDragEnter={handleDragEnter}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onSubmit={handleSubmit}
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
                                const inputEl = document.querySelector('input[type="file"]') as HTMLInputElement; // Cast to HTMLInputElement
                                if (inputEl) {
                                    inputEl.value = "";
                                    inputEl.click();
                                } else {
                                    console.error("File input element not found!");
                                }
                            }}
                        >
                          <u>choose file</u>
                        </span>
                    </p>
                </form>

                <span className="font-bold text-sm">UPLOADED FILES ({receipts.length})</span>
                <div className="flex flex-col items-center py-5">
                    <Table removeWrapper radius="none" fullWidth shadow="none"
                           aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn align="center">FILE NAME</TableColumn>
                            <TableColumn align="center">FORMAT</TableColumn>
                            <TableColumn align="center">STATUS</TableColumn>
                            <TableColumn align="center">CONTROL</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {receipts.map((receipt: Receipt, idx: number) => (
                                <TableRow key={idx}>
                                    <TableCell>{receipt.filename}</TableCell>
                                    <TableCell>{receipt.filetype}</TableCell>
                                    <TableCell><Chip>{receipt.status}</Chip></TableCell>
                                    <TableCell width={100}>
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button isIconOnly
                                                        disableAnimation
                                                        disableRipple
                                                        variant="bordered"
                                                >
                                                    <MoreHorizRounded/>
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Static Actions">
                                                <DropdownItem key="new">Analyze receipt</DropdownItem>
                                                <DropdownItem onClick={() => handleRemoveFile(idx)} key="delete"
                                                              className="text-danger" color="danger">
                                                    Delete
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default FileUploadModal;