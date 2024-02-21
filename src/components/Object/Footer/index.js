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
import { PiMusicNotesFill } from "react-icons/pi";
import classNames from "classnames";
import "./Footer.scss";

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
          <div
            className={classNames(
              "bg-black rounded-md min-w-[50px] w-[50px] h-[50px] flex items-center",
              {
                "bg-white shadow-md justify-center": currentSong === "",
              }
            )}
          >
            {currentSong !== "" ? (
              <img alt="thumnail of video" src={currentSong.imgUrl} />
            ) : (
              <PiMusicNotesFill className="w-7 h-7" />
            )}
          </div>
          <div className="flex flex-col text-xs ml-3 font-bold truncate">
            <span>
              {currentSong !== "" ? he.decode(currentSong.title) : ""}
            </span>
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
          <div className="music-control flex relative items-center justify-center text-xs mt-1">
            <span>00:00</span>
            <input type="range" value={0} />
            <div className="absolute w-[80%]">
              <p className="w-[30%] h-1 bg-grayBg"> </p>
            </div>
            <span>{currentSong.duration}</span>
          </div>
        </div>
        <div className="w-[30%] footer flex justify-end relative items-center">
          {volumeOn ? (
            <IoVolumeHigh
              onClick={() => volumeOnOrOff(false)}
              className="mr-2"
            />
          ) : (
            <IoMdVolumeOff
              onClick={() => volumeOnOrOff(true)}
              className="mr-2"
            />
          )}
          <input type="range" value={100} />
          <div className="absolute w-[50%]">
            <p className="w-[30%] h-1 bg-grayBg"> </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
