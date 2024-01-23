import { SlClose } from "react-icons/sl";
import { IoPlay } from "react-icons/io5";
import { IoPlayBack } from "react-icons/io5";
import { IoPlayForward, IoPause } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { GrPowerCycle } from "react-icons/gr";
import { useState } from "react";
import { IoVolumeHigh } from "react-icons/io5";
// import "./Playing.scss";

const Playing = () => {
  const [start, setStart] = useState(false);

  const playOrPause = (condition) => {
    setStart(condition);
  };
  return (
    <>
      <div className="bg-playingBg min-h-screen  fixed bottom-0 w-full rounded-t-[40px]">
        <SlClose className="w-7 h-7 cursor-pointer relative top-5 left-5" />
        <div className="w-[450px] m-auto mt-20">
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
            <LiaRandomSolid className="w-5 h-5  mx-4 cursor-pointer" />
            <div className="flex justify-center ">
              <IoPlayBack className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer" />
              {!start ? (
                <IoPlay
                  className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer"
                  onClick={() => playOrPause(true)}
                />
              ) : (
                <IoPause
                  className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer"
                  onClick={() => playOrPause(false)}
                />
              )}

              <IoPlayForward className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer" />
            </div>
            <GrPowerCycle className="w-5 h-5 mx-4 cursor-pointer" />
          </div>
          <div className="w-[300px] m-auto relative">
            <p className="h-[1px] bg-white "></p>
            <p className="h-1 w-[100px] bg-white mb-14"></p>
            {/* <input type="range" /> */}
            <IoVolumeHigh className="-top-16 right-6 relative" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Playing;
