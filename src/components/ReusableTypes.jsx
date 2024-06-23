/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import styles from "./componentsModules/ReusableTypes.module.css";
import { useMainContext } from "../contexts/MainContext";

function ReusableTypes({
  iterator = [],
  selectedOption = "",
  dispatchType,
  outContainerStyleClass,
  headingTile = "",
  headingStyleClass = "",
  innerContainerStyleClass = "",
  boxStyleClass = "",
  iteratorTarget = "",
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState("");
  const [startScrollLeft, setStartScrollLeft] = useState("");
  const wrapper = useRef();

  // Main Context
  const { dispatch, channelTypes } = useMainContext();

  // Handle Choosing Language
  function handleChoosingLanguage(e) {
    if (iterator == channelTypes) {
      dispatch({
        type: "setSelectedChannelVoice",
        payload: "",
      });
      dispatch({
        type: "setSelectedChannelVoiceValues",
        payload: "",
      });
      dispatch({ type: dispatchType, payload: String(e.target.value) });
    }
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
    <>
      {iterator.length > 0 && (
        <>
          {iterator.length > 0 && headingTile && (
            <h2 className={`${headingStyleClass} mt-10`}>{headingTile}</h2>
          )}
          <div
            className={outContainerStyleClass}
            onMouseMove={(e) => handleDragging(e)}
            onMouseDown={(e) => handleStartDragging(e)}
            ref={wrapper}
          >
            <div className={`${innerContainerStyleClass} w-full`}>
              {iterator.map((value, i) => (
                <Button cla key={i}>
                  <button
                    className={`${
                      styles.btn
                    } text-white border-2 border-white border-solid p-2 font-bold md:min-w-[150px]select-none mr-5 ${
                      iteratorTarget
                        ? selectedOption === value[iteratorTarget]
                          ? styles.selected
                          : ""
                        : selectedOption === value
                        ? styles.selected
                        : ""
                    } ${boxStyleClass}`}
                    onClick={(e) => handleChoosingLanguage(e)}
                    value={iteratorTarget ? value[iteratorTarget] : value}
                  >
                    {iteratorTarget ? value[iteratorTarget] : value}
                  </button>
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Button({ children }) {
  return <>{children}</>;
}
export default ReusableTypes;
