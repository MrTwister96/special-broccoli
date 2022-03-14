import React from "react";
import { TextField } from "@mui/material";

const FileDisplay = ({ defaultValue, onClick }) => {
    return (
        <div className="flex items-center">
            <TextField
                disabled
                label="Audio File"
                defaultValue={defaultValue}
                className="w-full"
            />
            <p
                onClick={onClick}
                className="inline-flex justify-center p-2 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-0 ml-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </p>
        </div>
    );
};

export default FileDisplay;
