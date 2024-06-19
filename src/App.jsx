/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as all from "@fortawesome/free-solid-svg-icons";
import "@fontsource/open-sauce-sans/300.css";
import "@fontsource/open-sauce-sans/400.css";
import "@fontsource/open-sauce-sans/500.css";
import "@fontsource/open-sauce-sans/600.css";
import "@fontsource/open-sauce-sans/700.css";
import "@fontsource/open-sauce-sans/800.css";
import "@fontsource/open-sauce-sans/900.css";

function App() {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");

  //   Get Languages
  useEffect(() => {
    const Quran = async function () {
      const res = await fetch("https://mp3quran.net/api/v3/languages");
      const data = await res.json();
      const { language } = data;
      //   const langs = language.map((l) => l.native);
      setLanguages(language);
    };
    Quran();
  }, []);

  useEffect(() => {
    if (!language) return;
    const [link] = languages.filter((l) =>
      l.native === language ? l.radios : ""
    );
    const Quran = async function () {
      const res = await fetch(`${link.radios}`);
      const data = await res.json();
      console.log(data);
    };
    Quran();
  }, [language]);

  if (!languages) return;
  return (
    <div className="h-[97vh] bg-black m-2 rounded-xl grid grid-cols-4	grid-rows-8 p-2 gap-2">
      {/* {languages.map((language, i) => (
        <Language lang={language.native} selectLang={setLanguage} key={i} />
      ))} */}
      <Nav />
      <Main />
      <Library />
      <Player />
    </div>
  );
}

// function Language({ lang, selectLang }) {
//   function handleClicking() {
//     selectLang(lang);
//   }
//   return (
//     <button
//       onClick={handleClicking}
//       className="w-40	 h-auto bg-slate-800	text-zinc-300	mr-6 rounded-none p-3 mb-4 mt-4"
//     >
//       {lang}
//     </button>
//   );
// }

function Nav() {
  return (
    <div className="bg-[#121212] col-span-1 row-span-2 rounded-xl flex items-center flex-wrap	content-evenly p-3">
      <div className="flex items-center	w-full  cursor-pointer	">
        <FontAwesomeIcon icon={all.faHouse} size="lg" className="text-white" />
        <h2 className="text-white ml-3 text-base	">Home</h2>
      </div>
      <div className="flex items-center	 cursor-pointer	">
        <FontAwesomeIcon
          icon={all.faMagnifyingGlass}
          size="lg"
          className="text-white"
        />
        <h2 className="text-white ml-3 text-base	">Search</h2>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#121212] col-start-2	col-end-5	row-span-8	 rounded-xl"></div>
  );
}

function Library() {
  return (
    <div className="bg-[#121212] col-span-1  row-span-6 rounded-xl px-3 py-5 ">
      <div className="flex justify-between w-full">
        <div className="flex align-center">
          <FontAwesomeIcon
            icon={all.faBookmark}
            size="lg"
            className="text-white"
          />
          <h2 className="text-white ml-3 text-base	">Your Library</h2>
        </div>
        <div>
          <FontAwesomeIcon
            icon={all.faArrowRight}
            size="lg"
            className="text-white cursor-pointer"
          />
          <FontAwesomeIcon
            icon={all.faPlus}
            size="lg"
            className="text-white ml-2 cursor-pointer"
          />
        </div>
      </div>
      {/* Adding PlayList */}
      <div className="bg-neutral-700	 w-full mt-10 p-4 rounded">
        <h3 className="text-white">Create your first playlist</h3>
        <p className="text-neutral-400	text-xs	">
          It&apos;s easy we will help you
        </p>
        <button className="mt-4 bg-white p-2 rounded-full	text-sm	">
          Create Playlist
        </button>
      </div>
      {/* Adding PlayList */}
      <div className="bg-neutral-700	 w-full mt-10 p-4 rounded">
        <h3 className="text-white">Let&apos;s find some podcasts to follow</h3>
        <p className="text-neutral-400	text-xs	">
          We&apos;ll keep you updated on new episodes
        </p>
        <button className="mt-4 bg-white p-2 rounded-full	text-sm	">
          Browse Podcasts
        </button>
      </div>
    </div>
  );
}

function Player() {
  return <div className="bg-black col-span-4  row-span-6 rounded-xl"></div>;
}
export default App;
