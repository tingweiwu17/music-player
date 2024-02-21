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
import { IoMdVolumeOff } from "react-icons/io";
import "./PlayingModal.scss";
import { useDispatch } from "react-redux";
import { togglePlayPause } from "../../store/musicSlice";
import he from "he";
import Modal from "react-modal";
import { PiMusicNotesFill } from "react-icons/pi";

const PlayingModal = ({
  isOpen,
  close,
  lastSong,
  nextSong,
  currSong,
  timeToSeconds,
  handleSchedule,
  currentTime,
  lengthofsong,
  formatStart,
  volume,
  volumeOn,
  setVideoVolume,
  volumeOnOrOff,
  isPlaying,
}) => {
  const dispatch = useDispatch();

  const customModalStyle = {
    overlay: {
      zIndex: "30",
    },
    content: {
      height: "100vh",
      width: "100%",
      backgroundColor: "#0000004d",
      top: "0",
      bottom: "0",
      left: "0",
      paddingBottom: "0",
      padding: "0",
    },
  };

  return (
    <>
      <Modal ariaHideApp={false} style={customModalStyle} isOpen={isOpen}>
        <div className="bg-playingBg min-h-playing fixed bottom-0 top-0 w-full rounded-t-[40px] text-grayBg">
          <SlClose
            className="w-7 h-7 cursor-pointer drop-shadow-xl relative top-5 left-5"
            onClick={close}
          />
          <div className="w-[450px] m-auto mt-20 ">
            <div className="rounded-xl my-10">
              <div className="w-[450px] h-[380px] bg-white shadow-2xl rounded-md flex items-center justify-center">
                {/* <img alt="video thumnail" src={currSong.imgUrl} /> */}
                <PiMusicNotesFill className="w-[250px] h-[250px] text-playingBg drop-shadow-md" />
              </div>
            </div>
            <p className="text-center font-bold">
              {currSong.title && he.decode(currSong.title)}
            </p>
            <p className="text-center text-sm  pb-8  relative mt-1">
              - {currSong.channel} -
            </p>
            <input
              type="range"
              value={Math.floor(currentTime)}
              min={0}
              max={timeToSeconds}
              onChange={handleSchedule}
            />
            <p
              className="bg-white h-1.5 relative rounded -top-2.5"
              style={{ width: `${lengthofsong}%` }}
            ></p>
            <div className="flex justify-between text-xs">
              <span>{formatStart}</span>
              <span>{currSong.duration}</span>
            </div>
            <div className="flex justify-center items-center mt-2 mb-6">
              <LiaRandomSolid className="w-5 h-5  mx-4 cursor-pointer active:drop-shadow-none" />
              <div className="flex justify-center ">
                <IoPlayBack
                  className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer"
                  onClick={lastSong}
                />
                {!isPlaying ? (
                  <IoPlay
                    className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer active:drop-shadow-none"
                    onClick={() => dispatch(togglePlayPause())}
                  />
                ) : (
                  <IoPause
                    className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer active:drop-shadow-none"
                    onClick={() => dispatch(togglePlayPause())}
                  />
                )}
                <IoPlayForward
                  className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer active:drop-shadow-none"
                  onClick={nextSong}
                />
              </div>
              <GrPowerCycle className="w-5 h-5 mx-4 cursor-pointer" />
            </div>
            <div className="w-[300px] m-auto relative">
              <input
                type="range"
                className="z-5 cursor-pointer"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVideoVolume(parseInt(e.target.value))}
              />
              <p
                className="bg-white h-1.5 relative rounded -top-2.5"
                style={{ width: `${volume}%` }}
              ></p>
              {volumeOn ? (
                <IoVolumeHigh
                  className="-top-5 right-6 relative"
                  onClick={() => volumeOnOrOff(false)}
                />
              ) : (
                <IoMdVolumeOff
                  className="-top-5 right-6 relative"
                  onClick={() => volumeOnOrOff(true)}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default PlayingModal;
