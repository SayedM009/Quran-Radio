/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useReducer, useEffect, useContext } from "react";

const MainContext = createContext();

const initialValue = {
  languages: [],
  selectedLanguage: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
  fullFetchedObjs: [],
  fullFetchedObj: {},
  channelTypes: [],
  selectedChannelType: "",
  test: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "setLangs":
      return { ...state, languages: action.payload };
    case "setLang":
      return { ...state, selectedLanguage: action.payload };
    case "setSpinnerStatus":
      return { ...state, isLoading: action.payload };
    case "setErrorMsg":
      return { ...state, isError: true, errorMessage: action.payload };
    case "disableErrorMessage":
      return { ...state, isError: false, errorMessage: "" };
    case "setFullFechedObjs":
      return { ...state, fullFetchedObjs: action.payload };
    case "setFullFechedObj":
      return { ...state, fullFetchedObj: action.payload };
    case "setChannelsType":
      return { ...state, channelTypes: action.payload };
    case "setSelectedChannelType":
      return { ...state, selectedChannelType: action.payload };
  }
}

function MainProvider({ children }) {
  const [
    {
      languages,
      selectedLanguage,
      isLoading,
      isError,
      errorMessage,
      fullFetchedObjs,
      fullFetchedObj,
      channelTypes,
      selectedChannelType,
    },
    dispatch,
  ] = useReducer(reducer, initialValue);

  //   Get Languages
  useEffect(() => {
    // Enable Loading Spinner
    dispatch({ type: "setSpinnerStatus", payload: true });
    const Quran = async function () {
      try {
        const res = await fetch("https://mp3quran.net/api/v3/languages");
        if (!res.ok) throw new Error("Something Went Wrong");
        const data = await res.json();
        const { language } = data;
        // Set All Fetched Objects
        dispatch({ type: "setFullFechedObjs", payload: language });
        const all_languages = language.map((l) => l.native);
        // Set Languages to initialValue
        dispatch({ type: "setLangs", payload: all_languages });
      } catch (error) {
        let errorMessage = "";
        // Enable Error Popup
        dispatch({ type: "setErrorMsg", payload: error.message });
      } finally {
        // Disable Loading Spinner
        dispatch({ type: "setSpinnerStatus", payload: false });
      }
    };
    Quran();
  }, []);

  // Get Different Channels
  useEffect(() => {
    if (!selectedLanguage) return;

    // Filtering object by selected language
    const channels = fullFetchedObjs.filter(
      (lang) => lang.native === selectedLanguage
    );

    // Set Full Fetched Object
    dispatch({ type: "setFullFechedObj", payload: channels });
    const [OBJ_KEYS] = channels;

    // Set Channels Type
    dispatch({
      type: "setChannelsType",
      payload: Object.keys(OBJ_KEYS).slice(4),
    });
  }, [selectedLanguage, fullFetchedObjs]);

  // Get Seleted Channel Link
  useEffect(() => {
    if (!selectedChannelType) return;

    const [obj] = fullFetchedObj;
    const test = async function () {
      try {
        const res = await fetch(`${obj[selectedChannelType]}`);
        const data = await res.json();
        console.log(data);
      } catch {
        console.error("error");
      }
    };
    test();
  }, [selectedChannelType, fullFetchedObj]);
  return (
    <MainContext.Provider
      value={{
        languages,
        selectedLanguage,
        isLoading,
        isError,
        errorMessage,
        fullFetchedObjs,
        fullFetchedObj,
        channelTypes,
        selectedChannelType,
        dispatch,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

function useMainContext() {
  const context = useContext(MainContext);
  if (context === "undefind")
    throw new Error("Wrong Place To Call Context API");
  return context;
}

export { MainProvider, useMainContext };
