import { useMainContext } from "../contexts/MainContext";
import ReusableTypes from "./ReusableTypes";
import ErrorPopup from "./ErrorPopup";
import SubNavigation from "./SubNavigation";

export default function Channels() {
  const { channelTypes, selectedChannelType } = useMainContext();
  return (
    <div className="bg-zinc-700	 col-start-2	col-end-5	row-span-8 rounded-xl">
      <SubNavigation />
      <ReusableTypes
        iterator={channelTypes}
        selectedOption={selectedChannelType}
        dispatchType="setSelectedChannelType"
      />
      <ErrorPopup />
    </div>
  );
}
