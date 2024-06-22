/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import styles from "./componentsModules/ReusableTypes.module.css";
import { useMainContext } from "../contexts/MainContext";

function ReusableTypes({ iterator = [], selectedOption = "", dispatchType }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState("");
  const [startScrollLeft, setStartScrollLeft] = useState("");
  const wrapper = useRef();
  // Main Context
  const { dispatch } = useMainContext();

  // Handle Choosing Language
  function handleChoosingLanguage(e) {
    dispatch({ type: dispatchType, payload: String(e.target.value) });
  }
  // HandlDraging
  function handleDragging(e) {
    if (!isDragging) return;
    wrapper.current.scrollLeft = startScrollLeft - (e.pageX - startX);
  }

  // HandlStartDraging
  function handleStartDragging(e) {
    setIsDragging(true);
    setStartX(e.pageX);
    setStartScrollLeft(wrapper.current.scrollLeft);
  }

  // Handle Stop Grapping
  function handlStopping() {
    setIsDragging(false);
  }
  useEffect(() => {
    document.addEventListener("mouseup", handlStopping);
  }, []);

  return (
    <div
      className="lg:w-[50%]  p-2 gap-2 flex overflow-x-hidden whitespace-nowrap md:w-[30%]"
      onMouseMove={(e) => handleDragging(e)}
      onMouseDown={(e) => handleStartDragging(e)}
      ref={wrapper}
    >
      {iterator.map((value, i) => (
        <Button cla key={i}>
          <button
            className={`${
              styles.btn
            } text-white border-2 border-white border-solid p-2 font-bold w-[150px] select-none ${
              selectedOption === value ? styles.selected : ""
            }`}
            onClick={(e) => handleChoosingLanguage(e)}
            value={value}
          >
            {value}
          </button>
        </Button>
      ))}
    </div>
  );
}

function Button({ children }) {
  return <>{children}</>;
}
export default ReusableTypes;
