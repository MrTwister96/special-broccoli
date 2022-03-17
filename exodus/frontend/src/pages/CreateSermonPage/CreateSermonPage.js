// Functionality
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import NavigationContext from "../../context/NavigationContext";
import StoreContext from "../../context/StoreContext";

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

const bibleBooks = [
    {
        label: "Genesis",
    },
    {
        label: "Exodus",
    },
    {
        label: "Levitikus",
    },
    {
        label: "Numeri",
    },
    {
        label: "Deuteronomium",
    },
    {
        label: "Josua",
    },
    {
        label: "Rigters",
    },
    {
        label: "Rut",
    },
    {
        label: "1 Samuel",
    },
    {
        label: "2 Samuel",
    },
    {
        label: "1 Konings",
    },
    {
        label: "2 Konings",
    },
    {
        label: "1 Kronieke",
    },
    {
        label: "2 Kronieke",
    },
    {
        label: "Esra",
    },
    {
        label: "Nehemia",
    },
    {
        label: "Ester",
    },
    {
        label: "Job",
    },
    {
        label: "Psalms",
    },
    {
        label: "Spreuke",
    },
    {
        label: "Prediker",
    },
    {
        label: "Hooglied",
    },
    {
        label: "Jesaja",
    },
    {
        label: "Jeremia",
    },
    {
        label: "Klaagliedere",
    },
    {
        label: "Esegiel",
    },
    {
        label: "Daniel",
    },
    {
        label: "Hosea",
    },
    {
        label: "Joel",
    },
    {
        label: "Amos",
    },
    {
        label: "Obadja",
    },
    {
        label: "Jona",
    },
    {
        label: "Miga",
    },
    {
        label: "Nahum",
    },
    {
        label: "Habakuk",
    },
    {
        label: "Sefanja",
    },
    {
        label: "Haggai",
    },
    {
        label: "Sagaria",
    },
    {
        label: "Maleagi",
    },
    {
        label: "Mattheus",
    },
    {
        label: "Markus",
    },
    {
        label: "Lukas",
    },
    {
        label: "Johannes",
    },
    {
        label: "Handelinge",
    },
    {
        label: "Romeine",
    },
    {
        label: "1 Korinthiers",
    },
    {
        label: "2 Korinthiers",
    },
    {
        label: "Galasiers",
    },
    {
        label: "Efesiers",
    },
    {
        label: "Filippense",
    },
    {
        label: "Kolossense",
    },
    {
        label: "1 Thessalonicense",
    },
    {
        label: "2 Thessalonicense",
    },
    {
        label: "1 Timotheus",
    },
    {
        label: "2 Timotheus",
    },
    {
        label: "Titus",
    },
    {
        label: "Filemon",
    },
    {
        label: "Hebreers",
    },
    {
        label: "Jakobus",
    },
    {
        label: "1 Petrus",
    },
    {
        label: "2 Petrus",
    },
    {
        label: "1 Johannes",
    },
    {
        label: "2 Johannes",
    },
    {
        label: "3 Johannes",
    },
    {
        label: "Judas",
    },
    {
        label: "Openbaring",
    },
];

const CreateSermonPage = () => {
    const { raiseError } = useContext(StoreContext);
    const { setAllLinksInactive } = useContext(NavigationContext);
    const navigate = useNavigate();
    const api = useAxios();

    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form Fields
    const [date, setDate] = useState(null);
    const [theme, setTheme] = useState("");
    const [book, setBook] = useState(null);
    const [scripture, setScripture] = useState("");
    const [category, setCategory] = useState(null);
    const [congregation, setCongregation] = useState(null);
    const [preacher, setPreacher] = useState(null);
    const [audio_file, setAudioFile] = useState(null);
    const [serie, setSerie] = useState(null);

    // Form Controls
    const [themeError, setThemeError] = useState(false);
    const [themeErrorMessage, setThemeErrorMessage] = useState("");
    const [scriptureError, setScriptureError] = useState(false);
    const [scriptureErrorMessage, setScriptureErrorMessage] = useState("");

    // Form Field Validation
    useEffect(() => {
        if (
            date === null ||
            theme === "" ||
            book === null ||
            scripture === "" ||
            preacher === null ||
            audio_file === null
        ) {
            setSubmitDisabled(true);
        } else if (themeError === true) {
            setSubmitDisabled(true);
        } else if (scriptureError === true) {
            setSubmitDisabled(true);
        } else {
            setSubmitDisabled(false);
        }
    }, [
        date,
        theme,
        book,
        scripture,
        preacher,
        audio_file,
        themeError,
        scriptureError,
    ]);

    // Server Side Info
    const [congregations, setCongregations] = useState(null);
    const [series, setSeries] = useState(null);
    const [preachers, setPreachers] = useState(null);
    const [categories, setCategories] = useState(null);

    // Initial Loading
    useEffect(() => {
        setAllLinksInactive();
        const getCongregations = async () => {
            try {
                let response = await axios.get(`${baseURL}/api/congregations`);

                if (response.status === 200) {
                    setCongregations(response.data);
                }
            } catch (error) {
                raiseError(
                    "Daar was n vout. Probeer weer of raporteer die vout"
                );
                navigate("/");
            }
        };

        const getPreachers = async () => {
            try {
                let response = await axios.get(`${baseURL}/api/preachers`);

                if (response.status === 200) {
                    setPreachers(response.data);
                }
            } catch (error) {
                raiseError(
                    "Daar was n vout. Probeer weer of raporteer die vout"
                );
                navigate("/");
            }
        };

        const getCategories = async () => {
            try {
                let response = await axios.get(`${baseURL}/api/categories`);

                if (response.status === 200) {
                    setCategories(response.data);
                }
            } catch (error) {
                raiseError(
                    "Daar was n vout. Probeer weer of raporteer die vout"
                );
                navigate("/");
            }
        };

        const initializePage = async () => {
            await getCongregations();
            await getPreachers();
            await getCategories();

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

        try {
            initializePage();
        } catch (error) {
            raiseError("Daar was n vout. Probeer weer of raporteer die vout");
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createSermon = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        let form_data = new FormData();
        form_data.append("date", date.toISOString());
        form_data.append("theme", theme);
        form_data.append("scripture", `${book} ${scripture}`);
        form_data.append("preacher", preacher.id);
        if (category !== null) {
            form_data.append("category", category.id);
        }

        if (congregation !== null) {
            form_data.append("congregation", congregation.id);
        }
        if (serie !== null) {
            form_data.append("series", serie.id);
        }
        form_data.append("audio_file", audio_file, audio_file.name);

        try {
            let response = await api.post("/api/sermons/", form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                let notify = await swal({
                    title: "Preek Geskep!",
                    text: `Tema: ${response.data.theme}`,
                    icon: "success",
                });

                if (notify === true) {
                    navigate("/");
                }
            }
        } catch (error) {
            raiseError(
                "Kon nie die boodskap skep nie. Probeer weer of raporteer die probleem"
            );
            navigate("/");
        }
    };

    const handleCongregationSelect = async (event, newValue) => {
        setCongregation(newValue);

        if (newValue !== null) {
            try {
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
            } catch (error) {
                raiseError(
                    "Daar was n vout. Probeer weer of raporteer die vout"
                );
                navigate("/");
            }
        }
    };

    const handleBibleBookSelect = (event, newValue) => {
        if (newValue === null) {
            setBook(null);
        } else {
            setBook(newValue.label);
        }
    };

    const handleThemeChange = (event) => {
        let value = event.target.value;
        setTheme(value);

        if (/^([a-zA-Z0-9\s_-]+)$/.test(value)) {
            setThemeError(false);
            setThemeErrorMessage("");
        } else {
            setThemeError(true);
            setThemeErrorMessage("Toegelate karakters: A-Z, a-z, 0-9, -, _");
        }
    };

    const handleScriptureChange = (event) => {
        let value = event.target.value;
        setScripture(value);

        if (/^([0-9\s,&:-]+)$/.test(value)) {
            setScriptureError(false);
            setScriptureErrorMessage("");
        } else {
            setScriptureError(true);
            setScriptureErrorMessage("Toegelate karakters: 0-9, :, -, &, ','");
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
                                                    error={themeError}
                                                    helperText={
                                                        themeErrorMessage
                                                    }
                                                    value={theme}
                                                    onChange={handleThemeChange}
                                                />

                                                {/* Book Field */}
                                                <Autocomplete
                                                    disablePortal
                                                    options={bibleBooks}
                                                    onChange={
                                                        handleBibleBookSelect
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Boek"
                                                            className="w-full"
                                                        />
                                                    )}
                                                />

                                                {/* Scripture Field */}
                                                {book && (
                                                    <TextField
                                                        label="Hoofstuk & Verse"
                                                        className="w-full"
                                                        error={scriptureError}
                                                        helperText={
                                                            scriptureErrorMessage
                                                        }
                                                        value={scripture}
                                                        onChange={
                                                            handleScriptureChange
                                                        }
                                                    />
                                                )}

                                                {/* Category Field */}
                                                {categories && (
                                                    <Autocomplete
                                                        disablePortal
                                                        options={categories}
                                                        onChange={(
                                                            event,
                                                            newValue
                                                        ) => {
                                                            setCategory(
                                                                newValue
                                                            );
                                                        }}
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                label="Preek Kategorie"
                                                                className="w-full"
                                                            />
                                                        )}
                                                    />
                                                )}

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
