import { IoPlay, IoPause, IoPlayForward, IoPlayBack } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { GrPowerCycle } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { togglePlayPause } from "../../store/musicSlice";

const Footer = () => {
  const isPlaying = useSelector((state) => state.music.isPlaying);
  const dispatch = useDispatch();

  return (
    <>
      <div className="fixed bottom-0 flex bg-white h-[80px] justify-between items-center w-full z-80 p-4 border-t-[1px] border-lightGray">
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
              {!isPlaying ? (
                <IoPlay
                  className="w-8 h-8  mx-2 drop-shadow-lg cursor-pointer"
                  onClick={() => dispatch(togglePlayPause())}
                />
              ) : (
                <IoPause
                  className="w-8 h-8  mx-2 drop-shadow-lg cursor-pointer"
                  onClick={() => dispatch(togglePlayPause())}
                />
              )}
              <IoPlayForward className="w-8 h-8  mx-2" />
            </div>
            <GrPowerCycle className="w-5 h-5  mx-4" />
          </div>
          <div className="flex items-center text-xs mt-2">
            <span>01:00</span>
            <p className="w-full h-[2px] bg-grayBg mx-3"> </p>
            <span>03:00</span>
          </div>
        </div>
        <div className="w-[170px]"></div>
      </div>
    </>
  );
};
export default Footer;
