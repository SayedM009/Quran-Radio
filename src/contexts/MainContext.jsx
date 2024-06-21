/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useReducer, useEffect, useContext } from "react";

const MainContext = createContext();

const initialValue = {
  languages: [],
  language: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setLangs":
      return { ...state, languages: action.payload };
    case "setLang":
      return { ...state, language: action.payload };
    case "setSpinnerStatus":
      return { ...state, isLoading: action.payload };
    case "setErrorMsg":
      return { ...state, isError: true, errorMessage: action.payload };
    case "disableErrorMessage":
      return { ...state, isError: false, errorMessage: "" };
  }
}

function MainProvider({ children }) {
  const [{ languages, language, isLoading, isError, errorMessage }, dispatch] =
    useReducer(reducer, initialValue);
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
        dispatch({ type: "setLangs", payload: language });
      } catch (error) {
        // Enable Error Popup
        dispatch({ type: "setErrorMsg", payload: error });
      } finally {
        // Disable Loading Spinner
        dispatch({ type: "setSpinnerStatus", payload: false });
        // Disable Error Popup
        dispatch({ type: "disableErrorMessage" });
      }
    };
    Quran();
  }, []);
  return (
    <MainContext.Provider
      value={{
        languages,
        language,
        isLoading,
        isError,
        errorMessage,
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
