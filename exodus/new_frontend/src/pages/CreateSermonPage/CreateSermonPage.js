// Functionality
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

// UI
import {
    CssBaseline,
    TextField,
    Autocomplete,
    CircularProgress,
} from "@mui/material";
import { LoadingButton, MobileDateTimePicker } from "@mui/lab";
import swal from "sweetalert";

// Custom Componenets
import NavBar from "../../components/NavBar";
import { baseURL } from "../../hooks/useAxios";

// Partials
import FileDisplay from "./FileDisplay";
import Dropzone from "./Dropzone";

const CreateSermonPage = () => {
    const navigate = useNavigate();
    const api = useAxios();

    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form Fields
    const [date, setDate] = useState(null);
    const [theme, setTheme] = useState("");
    const [scripture, setScripture] = useState("");
    const [congregation, setCongregation] = useState(null);
    const [preacher, setPreacher] = useState(null);
    const [audio_file, setAudioFile] = useState(null);
    const [serie, setSerie] = useState(null);

    // Form Field Validation
    useEffect(() => {
        if (
            date == null ||
            theme == "" ||
            scripture == "" ||
            preacher == null ||
            audio_file == null
        ) {
            setSubmitDisabled(true);
        } else {
            setSubmitDisabled(false);
        }
    }, [date, theme, scripture, preacher, audio_file]);

    // Server Side Info
    const [congregations, setCongregations] = useState(null);
    const [series, setSeries] = useState(null);
    const [preachers, setPreachers] = useState(null);

    // Initial Loading
    useEffect(() => {
        const getCongregations = async () => {
            let response = await axios.get(`${baseURL}/api/congregations`);

            if (response.status === 200) {
                setCongregations(response.data);
            }
        };

        const getPreachers = async () => {
            let response = await axios.get(`${baseURL}/api/preachers`);

            if (response.status === 200) {
                setPreachers(response.data);
            }
        };

        const initializePage = async () => {
            await getCongregations();
            await getPreachers();

            let response = await axios.get(`${baseURL}/api/series`);
            let items = [];

            if (response.status === 200) {
                response.data.forEach((item) => {
                    if (item.congregation === null) {
                        items = [...items, item];
                    }
                });

                if (items.length !== 0) {
                    setSeries(items);
                }
            }
            setLoading(false);
        };

        initializePage();
    }, []);

    const createSermon = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        let form_data = new FormData();
        form_data.append("date", date.toISOString());
        form_data.append("theme", theme);
        form_data.append("scripture", scripture);
        form_data.append("preacher", preacher.id);
        if (congregation !== null) {
            form_data.append("congregation", congregation.id);
        }
        if (serie !== null) {
            form_data.append("series", serie.id);
        }
        form_data.append("audio_file", audio_file, audio_file.name);

        let response = await api.post("/api/sermons/", form_data, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        if (response.status == 201) {
            let notify = await swal({
                title: "Preek Geskep!",
                text: `Tema: ${response.data.theme}`,
                icon: "success",
            });

            if (notify == true) {
                navigate("/");
            }
        }
    };

    const handleCongregationSelect = async (event, newValue) => {
        setCongregation(newValue);

        if (newValue !== null) {
            let response = await axios.get(
                `${baseURL}/api/series/?congregation=${newValue.id}`
            );

            if (response.status === 200) {
                if (response.data.length !== 0) {
                    setSerie(null);
                    setSeries(response.data);
                } else {
                    setSerie(null);
                    setSeries(null);
                }
            }
        }
    };

    return (
        <>
            <NavBar />
            <CssBaseline />
            <div className="min-h-full">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Skep Preek
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 justify-center flex">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Preek Informasie
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Hierdie informasie sal gebruik word om
                                        'n nuwe preek te skep.
                                    </p>
                                </div>
                            </div>
                            {loading ? (
                                <div className="mt-5 md:mt-0 md:col-span-2 justify-center items-center flex h-40 bg-gray-100 rounded-xl">
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <form
                                        onSubmit={createSermon}
                                        encType="multipart/form-data"
                                    >
                                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                                            {/* Form Fields */}
                                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                                {/* Date Field */}
                                                <MobileDateTimePicker
                                                    inputFormat="ddd, DD MMM YYYY HH:mm A"
                                                    label="Datum & Tyd"
                                                    value={date}
                                                    onChange={(newValue) => {
                                                        setDate(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            className="w-full"
                                                        />
                                                    )}
                                                />

                                                {/* Theme Field */}
                                                <TextField
                                                    label="Tema"
                                                    className="w-full"
                                                    value={theme}
                                                    onChange={(event) => {
                                                        setTheme(
                                                            event.target.value
                                                        );
                                                    }}
                                                />

                                                {/* Scripture Field */}
                                                <TextField
                                                    label="Skriflesing"
                                                    className="w-full"
                                                    value={scripture}
                                                    onChange={(event) => {
                                                        setScripture(
                                                            event.target.value
                                                        );
                                                    }}
                                                />

                                                {/* Congregation Field */}
                                                {congregations && (
                                                    <Autocomplete
                                                        disablePortal
                                                        options={congregations}
                                                        onChange={
                                                            handleCongregationSelect
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                label="Gemeente"
                                                                className="w-full"
                                                            />
                                                        )}
                                                    />
                                                )}

                                                {/* Series Field */}
                                                {series && (
                                                    <Autocomplete
                                                        disablePortal
                                                        options={series}
                                                        onChange={(
                                                            event,
                                                            newValue
                                                        ) => {
                                                            setSerie(newValue);
                                                        }}
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                label="Reeks"
                                                                className="w-full"
                                                            />
                                                        )}
                                                    />
                                                )}

                                                {/* Preacher Field */}
                                                {preachers && (
                                                    <Autocomplete
                                                        disablePortal
                                                        options={preachers}
                                                        onChange={(
                                                            event,
                                                            newValue
                                                        ) => {
                                                            setPreacher(
                                                                newValue
                                                            );
                                                        }}
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                label="Prediker"
                                                                className="w-full"
                                                            />
                                                        )}
                                                    />
                                                )}

                                                {/* Audio File Field */}
                                                {audio_file ? (
                                                    <FileDisplay
                                                        defaultValue={
                                                            audio_file.name
                                                        }
                                                        onClick={() =>
                                                            setAudioFile(null)
                                                        }
                                                    />
                                                ) : (
                                                    <Dropzone
                                                        onUpload={(newFile) => {
                                                            setAudioFile(
                                                                newFile
                                                            );
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            {/* Form Actions */}
                                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                <LoadingButton
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    disabled={submitDisabled}
                                                    loading={submitting}
                                                >
                                                    Indien
                                                </LoadingButton>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default CreateSermonPage;
