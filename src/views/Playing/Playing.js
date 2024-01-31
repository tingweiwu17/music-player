import { SlClose } from "react-icons/sl";
import {
  IoPlay,
  IoPlayBack,
  IoVolumeHigh,
  IoPlayForward,
  IoPause,
} from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { GrPowerCycle } from "react-icons/gr";
import { useState } from "react";
import { IoMdVolumeOff } from "react-icons/io";
import Headerbar from "../../components/Object/Headerbar";
import "./Playing.scss";

const Playing = () => {
  const [volumeOn, setVolumeOn] = useState(true);

  const volumeOnOrOff = (condition) => {
    setVolumeOn(condition);
  };
  return (
    <>
      <Headerbar />
      <div className="bg-playingBg min-h-playing fixed bottom-0 w-full rounded-t-[40px]">
        <SlClose className="w-7 h-7 cursor-pointer drop-shadow-xl relative top-5 left-5" />
        <div className="w-[450px] m-auto mt-20 ">
          <div className="rounded-xl h-[400px] border-2 my-10"></div>
          <p className="text-center font-bold">Song in the playlist</p>
          <p className="text-center border-b pb-8 border-white">
            - Singer of the song -
          </p>
          <p></p>
          <div className="flex justify-between mt-2 text-xs">
            <span>01:00</span>
            <span>03:00</span>
          </div>
          <div className="flex justify-center items-center mt-2 mb-6">
            <LiaRandomSolid className="w-5 h-5  mx-4 cursor-pointer active:drop-shadow-none" />
            <div className="flex justify-center ">
              <IoPlayBack className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer" />
              <IoPlay className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer active:drop-shadow-none" />
              <IoPause className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer active:drop-shadow-none" />

              <IoPlayForward className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer active:drop-shadow-none" />
            </div>
            <GrPowerCycle className="w-5 h-5 mx-4 cursor-pointer" />
          </div>
          <div className="w-[300px] m-auto relative">
            <input type="range" />
            {volumeOn ? (
              <IoVolumeHigh
                className="-top-[18px] right-6 relative"
                onClick={() => volumeOnOrOff(false)}
              />
            ) : (
              <IoMdVolumeOff
                className="-top-[18px] right-6 relative"
                onClick={() => volumeOnOrOff(true)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Playing;
