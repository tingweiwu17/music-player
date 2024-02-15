import {
  IoPlay,
  IoPause,
  IoPlayForward,
  IoPlayBack,
  IoVolumeHigh,
} from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { GrPowerCycle } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { togglePlayPause } from "../../store/musicSlice";
import { IoMdVolumeOff } from "react-icons/io";
import PlayingModal from "../../Modal/PlayingModal/PlayingModal";
import { useState } from "react";

const Footer = () => {
  const isPlaying = useSelector((state) => state.music.isPlaying);
  const currentSong = useSelector((state) => state.music.currentSong);
  const dispatch = useDispatch();
  const [openPlayModal, setOpenPlayModal] = useState(false);

  const [volumeOn, setVolumeOn] = useState(true);

  const volumeOnOrOff = (condition) => {
    setVolumeOn(condition);
  };

  const toPlaying = (condition) => {
    setOpenPlayModal(condition);
  };

  return (
    <>
      <PlayingModal isOpen={openPlayModal} close={() => toPlaying(false)} />
      <div
        className="fixed bottom-0 flex bg-white h-[80px] cursor-pointer justify-between items-center w-full z-20 p-4 border-t-[1px] border-lightGray"
        onClick={() => toPlaying(true)}
      >
        <div className="flex items-center">
          <div className="bg-black rounded-md w-[60px] h-[60px] flex items-center">
            <img alt="thumnail of video" src={currentSong.imgUrl} />
          </div>
          <div className="flex flex-col text-sm ml-3 font-bold">
            <span>{currentSong.title}</span>
            <span>{currentSong.channel}</span>
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
            <span>{currentSong.duration}</span>
          </div>
        </div>
        <div className="w-[170px] relative">
          <input type="range" className="relative text-grayBg" />
          {volumeOn ? (
            <IoVolumeHigh
              className=" right-6 relative"
              onClick={() => volumeOnOrOff(false)}
            />
          ) : (
            <IoMdVolumeOff
              className=" right-6 relative"
              onClick={() => volumeOnOrOff(true)}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Footer;
