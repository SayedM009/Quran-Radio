import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as all from "@fortawesome/free-solid-svg-icons";
import styles from "./componentsModules/SubNavigation.module.css";
function SubNavigation() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState("");
  const [startScrollLeft, setStartScrollLeft] = useState("");
  const wrapper = useRef();

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

  // HandlStoping
  function handlStopping() {
    setIsDragging(false);
  }
  useEffect(() => {
    document.addEventListener("mouseup", handlStopping);
  }, []);

  return (
    <>
      <div className=" mx-5 mt-5 flex items-center justify-between">
        {/* Back & Forward */}
        <div className="flex gap-2">
          <span
            className={`${styles.arrowHover} bg-zinc-600 w-[50px] h-[50px] inline-block rounded-full flex justify-center items-center cursor-pointer`}
          >
            <FontAwesomeIcon icon={all.faChevronLeft} className="text-white" />
          </span>
          <span
            className={`${styles.arrowHover} bg-zinc-600 w-[50px] h-[50px] inline-block rounded-full flex justify-center items-center cursor-pointer`}
          >
            <FontAwesomeIcon
              icon={all.faChevronRight}
              className="text-white  p-4 rounded-full"
            />
          </span>
        </div>
        {/* Select Language */}
        <div
          className="lg:w-[50%]  p-2 gap-2 flex overflow-x-hidden whitespace-nowrap md:w-[30%]"
          onMouseMove={(e) => handleDragging(e)}
          onMouseDown={(e) => handleStartDragging(e)}
          ref={wrapper}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Button key={i} />
          ))}
        </div>
        {/* Perimum & App Installation & User Profile */}
        <div className=" flex gap-3 items-center">
          <div className="bg-white p-2 rounded-3xl font-bold cursor-pointer">
            Explore Premium
          </div>
          <div className="bg-black text-white p-2 rounded-3xl cursor-pointer">
            Install App
          </div>
          <div className="bg-violet-700 p-2 rounded-full w-[40px] h-[40px] text-center font-bold text-xl cursor-pointer">
            S
          </div>
        </div>
      </div>
    </>
  );
}

function Button() {
  return (
    <button
      className={` text-white border-2 border-white border-solid p-2 font-bold w-[150px] select-none`}
    >
      العربية
    </button>
  );
}
export default SubNavigation;
