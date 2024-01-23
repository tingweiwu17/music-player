import { IoPlay } from "react-icons/io5";
import { IoPlayBack } from "react-icons/io5";
import { IoPlayForward } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { GrPowerCycle } from "react-icons/gr";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";

const Song = () => {
  return (
    <>
      <IoSettings></IoSettings>
      {/* <div className="bg-white w-full h-[50px]"></div> */}
      <div className="w-[300px] z-20 border-r-2 h-screen p-10  border-white">
        <div className="flex mb-10 justify-center items-baseline">
          <BsFillMusicPlayerFill className="text-white w-10 h-10" />
          <div className="border-b-4 border-white w-14 mx-1"></div>
          <BsFillMusicPlayerFill className="text-white w-10 h-10" />
        </div>
        <input className="w-full px-3 py-1 rounded" placeholder="Search..." />
        播放清單(新增清單icon)
      </div>
      <div>歌曲/縮圖/歌名/</div>
      <div className="fixed bottom-0 flex bg-white h-[80px] justify-between items-center w-full z-80 p-2.5">
        <div className="flex items-center">
          <div className="bg-themeBlue rounded-md w-[60px] h-[60px]"></div>
          <div className="flex flex-col text-sm ml-3 font-bold">
            <span>Name of song</span>
            <span>Singer of song</span>
          </div>
        </div>

        <div>
          <div className="flex justify-center w-[600px] items-center">
            <LiaRandomSolid className="w-5 h-5  mx-4" />
            <div className="flex justify-center ">
              <IoPlayBack className="w-8 h-8  mx-2" />
              <IoPlay className="w-8 h-8  mx-2 drop-shadow-lg" />
              <IoPlayForward className="w-8 h-8  mx-2" />
            </div>
            <GrPowerCycle className="w-5 h-5  mx-4" />
          </div>
          <div className="flex items-center text-xs mt-2">
            <span>01:00</span>
            <p className="w-full h-[2px] bg-black mx-3"> </p>
            <span>03:00</span>
          </div>
        </div>
        <div className="w-[170px]"></div>
      </div>
    </>
  );
};

export default Song;
