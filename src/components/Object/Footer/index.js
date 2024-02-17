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
import he from "he";

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
        className="fixed bottom-0 flex bg-white h-[70px] cursor-pointer justify-between items-center w-full z-20 p-4 border-t-[1px] border-lightGray"
        onClick={() => toPlaying(true)}
      >
        <div className="flex items-center w-[30%]">
          <div className="bg-black rounded-md min-w-[50px] w-[50px] h-[50px] flex items-center">
            <img alt="thumnail of video" src={currentSong.imgUrl} />
          </div>
          <div className="flex flex-col text-xs ml-3 font-bold truncate">
            <span>{currentSong ? he.decode(currentSong.title) : ""}</span>
            <span>- {currentSong.channel} -</span>
          </div>
        </div>

        <div>
          <div className="flex justify-center w-[500px] items-center">
            <LiaRandomSolid className="w-4 h-4 mx-4 hover:text-themeBlue" />
            <div className="flex justify-center items-center">
              <IoPlayBack className="w-6 h-6 mx-2 hover:text-themeBlue" />
              {!isPlaying ? (
                <IoPlay
                  className="w-7 h-7 mx-2 drop-shadow-lg cursor-pointer hover:text-themeBlue"
                  onClick={() => dispatch(togglePlayPause())}
                />
              ) : (
                <IoPause
                  className="w-7 h-7 mx-2 drop-shadow-lg cursor-pointer hover:text-themeBlue"
                  onClick={() => dispatch(togglePlayPause())}
                />
              )}
              <IoPlayForward className="w-6 h-6 mx-2 hover:text-themeBlue" />
            </div>
            <GrPowerCycle className="w-4 h-4 mx-4 hover:text-themeBlue" />
          </div>
          <div className="flex items-center justify-center text-xs mt-1">
            <span>00:00</span>
            <p className="w-[80%] h-[2px] bg-grayBg mx-3"> </p>
            <span>{currentSong.duration}</span>
          </div>
        </div>
        <div className="w-[30%] flex justify-end items-center">
          {volumeOn ? (
            <IoVolumeHigh onClick={() => volumeOnOrOff(false)} />
          ) : (
            <IoMdVolumeOff onClick={() => volumeOnOrOff(true)} />
          )}
          <input type="range" />
        </div>
      </div>
    </>
  );
};
export default Footer;
