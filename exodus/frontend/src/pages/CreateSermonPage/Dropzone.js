import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = (data) => {
    const { onUpload } = data;
    const dropArea = useRef(null);
    const [error, setError] = useState(null);

    // eslint-disable-next-line
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            dropArea.current.classList.add("scale-100");
            dropArea.current.classList.remove("scale-105");
            dropArea.current.classList.remove("bg-blue-50");

            if (file.name.endsWith(".mp3") && file.type === "audio/mpeg") {
                if (file.size / 1000 / 1000 < 60) {
                    onUpload(file);
                } else {
                    dropArea.current.classList.remove("border-gray-300");
                    dropArea.current.classList.add("border-red-500");
                    dropArea.current.classList.add("bg-red-100");
                    setError(
                        `File is to large (${(file.size / 1000 / 1000).toFixed(
                            2
                        )} MB) !!!`
                    );
                }
            } else {
                dropArea.current.classList.remove("border-gray-300");
                dropArea.current.classList.add("border-red-500");
                dropArea.current.classList.add("bg-red-100");
                setError("File is not MP3 !!!");
            }
        });
    });

    // eslint-disable-next-line
    const onDragEnter = useCallback(() => {
        dropArea.current.classList.add("bg-blue-50");
        dropArea.current.classList.add("scale-105");
        dropArea.current.classList.remove("scale-100");
    });
    
    // eslint-disable-next-line
    const onDragLeave = useCallback(() => {
        dropArea.current.classList.remove("bg-blue-50");
        dropArea.current.classList.add("scale-100");
        dropArea.current.classList.remove("scale-105");
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDragEnter,
        onDragLeave,
    });

    return (
        <div {...getRootProps()}>
            <label className="block text-sm font-medium text-gray-700">
                Audio File
            </label>
            <div
                ref={dropArea}
                className="transition-all mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            >
                <div className="space-y-1 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div
                        className="flex text-sm text-gray-600"
                        {...getRootProps()}
                    >
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                            <span>Upload a file</span>
                            <input
                                {...getInputProps()}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="audio/mpeg"
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">MP3 up to 60MB</p>
                    {error && <p className="text-lg text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Dropzone;
