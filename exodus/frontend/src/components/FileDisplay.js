const FileDisplay = ({ Label, text, onDelete }) => {
    return (
        <div>
            <label
                htmlFor="input"
                className="block text-sm font-medium text-gray-700"
            >
                {Label ? Label : "Default Label"}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    readOnly
                    type="text"
                    name="input"
                    id="input"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder={text}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <p
                        onClick={onDelete}
                        className="inline-flex justify-center h-full px-3 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-0"
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
            </div>
        </div>
    );
};

export default FileDisplay;
