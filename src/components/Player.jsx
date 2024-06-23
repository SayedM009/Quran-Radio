import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as all from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useMainContext } from "../contexts/MainContext";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(true);
  const { selectedChannelVoiceValues } = useMainContext();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(selectedChannelVoiceValues);
  }, [selectedChannelVoiceValues]);

  const audioRef = useRef(null);

  // const togglePlayPause = () => {
  //   if (isPlaying) {
  //     audioRef.current.pause();
  //   } else {
  //     audioRef.current.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  // Handle Playing
  function handlePlaying() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }
  return (
    <div className="bg-black col-span-4  row-span-6 rounded-xl md:grid grid-cols-3	 items-center ">
      {/* Music Summary */}
      <div className="col-span-1 flex items-center hidden md:block">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
          alt="user-icon"
          className="w-[40px] rounded-full mr-5"
        ></img>
        <div className="info">
          <h4 className="text-white font-bold">test</h4>
          <p className="text-white text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </div>
      </div>
      {/* Player Settings */}
      <div className="col-span-1">
        <div className="flex justify-between w-[20%] m-auto gap-2 mt-5 md:mt-auto">
          <FontAwesomeIcon
            icon={all.faShuffle}
            className="text-white cursor-pointer"
            title="Random"
          />
          <FontAwesomeIcon
            icon={all.faBackwardStep}
            className="text-white cursor-pointer"
            title="Previous"
          />
          {isPlaying ? (
            <FontAwesomeIcon
              icon={all.faPause}
              className="text-white cursor-pointer"
              title="Pause"
              onClick={handlePlaying}
            />
          ) : (
            <FontAwesomeIcon
              icon={all.faPlay}
              className="text-white cursor-pointer"
              title="Play"
              onClick={handlePlaying}
            />
          )}
          {/*  */}

          <FontAwesomeIcon
            icon={all.faForwardStep}
            className="text-white cursor-pointer"
            title="Next"
          />
          <FontAwesomeIcon
            icon={all.faRepeat}
            className="text-white cursor-pointer"
            title="Repeat"
          />
        </div>
        <div className="bg-white h-[2px] mt-4 w-[70%] mx-auto">
          <div className="w-[20px] bg-red-700 h-[2px]"></div>
          <div>
            <audio ref={audioRef} src={`${value}`} autoPlay={isPlaying} />
          </div>
        </div>
      </div>
      {/* Volum & Screen */}
      <div className="col-span-1 text-white text-right hidden md:block">
        <FontAwesomeIcon
          icon={all.faVolumeHigh}
          className="mr-5 cursor-pointer"
          title="Volum"
        />
        <FontAwesomeIcon
          icon={all.faUpRightAndDownLeftFromCenter}
          className="text-white cursor-pointer	"
          title="Full-Screen"
        />
      </div>
    </div>
  );
}
