import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as all from "@fortawesome/free-solid-svg-icons";
export default function Navigations() {
  return (
    <div className="bg-zinc-700	 col-span-1 row-span-1 rounded-xl flex items-center flex-wrap	content-evenly p-3">
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
