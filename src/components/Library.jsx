import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as all from "@fortawesome/free-solid-svg-icons";

export default function Library() {
  return (
    <div className="bg-zinc-700	 col-span-1  row-span-6 rounded-xl px-3 py-5 ">
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
      <div className="bg-zinc-600		 w-full mt-10 p-4 rounded">
        <h3 className="text-white">Create your first playlist</h3>
        <p className="text-neutral-400	text-xs	mt-3 mb-7">
          It&apos;s easy we will help you
        </p>
        <button className="mt-4 bg-white p-2 rounded-full	text-sm	">
          Create Playlist
        </button>
      </div>
      {/* Adding PlayList */}
      <div className="bg-zinc-600	w-full mt-10 p-4 rounded">
        <h3 className="text-white">Let&apos;s find some podcasts to follow</h3>
        <p className="text-neutral-400	text-xs	mt-3 mb-7">
          We&apos;ll keep you updated on new episodes
        </p>
        <button className="mt-4 bg-white p-2 rounded-full	text-sm	">
          Browse Podcasts
        </button>
      </div>
    </div>
  );
}
