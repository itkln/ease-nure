import React from "react";
import {Tooltip} from "@mui/material";
import {Input} from "@nextui-org/react";

interface EditableCellProps {
    value: string;
    isEditable: boolean;
    width: number;
    type: "text" | "number"
}


export const EditableCell: React.FC<EditableCellProps> = ({value, isEditable, width, type}) => {
    if (isEditable) {
        return (
            <Tooltip title={value}>
                <Input size={"sm"} type={type} className={`w-[${width}px]`} value={value} aria-label="Line of item"/>
            </Tooltip>
        );
    } else {
        return value;
    }
};