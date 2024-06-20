/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useReducer, useEffect, useContext } from "react";

const MainContext = createContext();

const initialValue = {
  languages: [],
  language: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setLangs":
      return { ...state, languages: action.payload };
    case "setLang":
      return { ...state, language: action.payload };
  }
}

function MainProvider({ children }) {
  const [{ languages, language }, dispatch] = useReducer(reducer, initialValue);
  //   Get Languages
  useEffect(() => {
    const Quran = async function () {
      const res = await fetch("https://mp3quran.net/api/v3/languages");
      const data = await res.json();
      const { language } = data;
      dispatch({ type: "setLangs", payload: language });
    };
    Quran();
  }, []);
  return (
    <MainContext.Provider value={(languages, language)}>
      {children}
    </MainContext.Provider>
  );
}

console.log(MainContext);
function useMainContext() {
  const context = useContext(MainContext);
  if (context === "undefind")
    throw new Error("Wrong Place To Call Context API");
  return context;
}

export { MainProvider, useMainContext };
