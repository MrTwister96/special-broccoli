import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useContext } from "react";
import Dropzone from "../components/Dropzone";
import MenuSelect from "../components/MenuSelect";
import useAxios from "../utils/useAxios";
import FileDisplay from "../components/FileDisplay";
import swal from "sweetalert";
import LoadingButton from "@mui/lab/LoadingButton";
import { useHistory } from "react-router-dom";
import NavigationContext from "../context/NavigationContext";
import StoreContext from "../context/StoreContext";
import TextInput from "../components/TextInput";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const CreateSermonPage = () => {
    // Context
    const { setAllLinksInactive } = useContext(NavigationContext);
    const { congregations, preachers, addSermon } = useContext(StoreContext);
    // Form Control
    const [saveDisabled, setSaveDisabled] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    // FORM FIELDS
    const [date, setDate] = useState(null);
    const [file, setFile] = useState();
    const [theme, setTheme] = useState("");
    const [scripture, setScripture] = useState("");
    const [congregation, setCongregation] = useState(congregations[0]);
    const [preacher, setPreacher] = useState(preachers[0]);

    const api = useAxios();
    const history = useHistory();

    useEffect(() => {
        setAllLinksInactive();
    }, []);

    // Validate Form Fields
    useEffect(() => {
        if (
            date == null ||
            theme == "" ||
            scripture == "" ||
            preacher.id == 0 ||
            file == null
        ) {
            setSaveDisabled(true);
        } else {
            setSaveDisabled(false);
        }
    }, [date, file, theme, scripture, congregation, preacher]);

    const createSermon = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        let form_data = new FormData();
        form_data.append("date", date.toISOString());
        form_data.append("theme", theme);
        form_data.append("scripture", scripture);
        form_data.append("preacher", preacher.id);
        if (congregation.id != 0) {
            form_data.append("congregation", congregation.id);
        }
        form_data.append("audio_file", file, file.name);

        let response = await api.post("/api/sermons/", form_data, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        if (response.status == 201) {
            addSermon(response.data);
            let notify = await swal({
                title: "Sermon Created!",
                text: `Theme: ${response.data.theme}`,
                icon: "success",
            });

            if (notify == true) {
                history.push("/");
            }
        }

        // {
        //     "date": null,
        //     "theme": "",
        //     "scripture": "",
        //     "download_count": null,
        //     "series_index": null,
        //     "audio_file": null,
        //     "congregation": null,
        //     "preacher": null,
        //     "series": null
        // }
    };

    const deleteFile = () => {
        setFile(null);
    };

    return (
        <>
            <div className="min-h-full">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            New Sermon
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 justify-center flex">
                        <div>
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            Sermon Information
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            This information will be used to
                                            create and upload a new sermon.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <form
                                        onSubmit={createSermon}
                                        encType="multipart/form-data"
                                    >
                                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                                {/* Date */}
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <MobileDateTimePicker
                                                            inputFormat="ddd, DD MMM YYYY HH:mm A"
                                                            label="Date & Time"
                                                            value={date}
                                                            onChange={(
                                                                newValue
                                                            ) => {
                                                                setDate(
                                                                    newValue
                                                                );
                                                            }}
                                                            renderInput={(
                                                                params
                                                            ) => (
                                                                <TextField
                                                                    className="w-full"
                                                                    {...params}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Theme */}
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <TextInput
                                                            label={"Theme"}
                                                            placeholder={
                                                                "Theme of the sermon"
                                                            }
                                                            value={theme}
                                                            onChange={
                                                                setTheme
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* Scripture */}
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <TextInput
                                                            label={"Scripture"}
                                                            placeholder={
                                                                "Scripture of the sermon"
                                                            }
                                                            value={scripture}
                                                            onChange={
                                                                setScripture
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* Congregations */}
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <MenuSelect
                                                            Label={
                                                                "Congregation"
                                                            }
                                                            items={
                                                                congregations
                                                            }
                                                            selected={
                                                                congregation
                                                            }
                                                            setSelected={
                                                                setCongregation
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* Preachers */}
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <MenuSelect
                                                            Label={"Preacher"}
                                                            items={preachers}
                                                            selected={preacher}
                                                            setSelected={
                                                                setPreacher
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* Audio File */}
                                                {file ? (
                                                    <div className="grid grid-cols-3 gap-6">
                                                        <div className="col-span-3 sm:col-span-2">
                                                            <FileDisplay
                                                                Label={
                                                                    "Audio File"
                                                                }
                                                                text={file.name}
                                                                onDelete={
                                                                    deleteFile
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Dropzone
                                                        onUpload={(newFile) => {
                                                            setFile(newFile);
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                <LoadingButton
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    disabled={saveDisabled}
                                                    loading={submitting}
                                                    // className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Save
                                                </LoadingButton>
                                                {/* <button
                                                    type="submit"
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Save
                                                </button> */}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default CreateSermonPage;
