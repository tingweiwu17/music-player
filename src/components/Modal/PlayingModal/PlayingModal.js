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
import { useEffect, useState, useRef } from "react";
import { IoMdVolumeOff } from "react-icons/io";
import "./PlayingModal.scss";
import { useSelector, useDispatch } from "react-redux";
import { togglePlayPause, setCurrentSong } from "../../store/musicSlice";
import YouTube from "react-youtube";
import he from "he";
import Modal from "react-modal";
import { PiMusicNotesFill } from "react-icons/pi";

const PlayingModal = ({ isOpen, close }) => {
  const [volume, setVolume] = useState(100);
  const [volumeOn, setVolumeOn] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [lengthofsong, setLengthofsong] = useState(0);
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.music.isPlaying);
  const videoId = useSelector((state) => state.music.currentSong.id);
  const currSong = useSelector((state) => state.music.currentSong);
  const currentPlaylist = useSelector((state) => state.music.currentPlaylist);

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

  const videoOpts = {
    height: "350",
    width: "450",
    playerVars: {
      autoplay: 1,
    },
  };

  //play and pause
  useEffect(() => {
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();
      if (player) {
        if (isPlaying) {
          if (player.getPlayerState() !== 1) {
            player.playVideo();
          }
        } else {
          player.pauseVideo();
        }
      }
    }
  }, [isPlaying]);

  const volumeOnOrOff = (condition) => {
    setVolumeOn(condition);
    if (condition) {
      setVolume(30);
    } else {
      setVolume(0);
    }
  };

  const setVideoVolume = (newVolume) => {
    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer.setVolume(newVolume);
      setVolume(newVolume);
    }
    if (newVolume === 0) {
      setVolumeOn(false);
    } else {
      setVolumeOn(true);
    }
  };

  const handleSchedule = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer.seekTo(time, true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && playerRef.current && playerRef.current.internalPlayer) {
        playerRef.current.internalPlayer
          .getCurrentTime()
          .then((currentTime) => {
            setCurrentTime(Math.floor(currentTime));
          });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime, isPlaying]);

  const timeToSeconds = (timeString) => {
    if (timeString) {
      const timeArray = timeString.split(":").map(Number);
      let totalSeconds = 0;
      if (timeArray.length === 3) {
        totalSeconds += timeArray[0] * 3600;
        totalSeconds += timeArray[1] * 60;
        totalSeconds += timeArray[2];
      } else if (timeArray.length === 2) {
        totalSeconds += timeArray[0] * 60;
        totalSeconds += timeArray[1];
      }
      return totalSeconds;
    }
  };

  const formatTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    remainingSeconds =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    let timeString = hours + ":" + minutes + ":" + remainingSeconds;

    if (hours === "00") {
      timeString = minutes + ":" + remainingSeconds;
    }

    return timeString;
  };

  useEffect(() => {
    if (currSong.duration) {
      const percent =
        (Math.round((currentTime / timeToSeconds(currSong.duration)) * 100) /
          100) *
        100;
      setLengthofsong(percent);
    }
  }, [currSong, currentTime]);

  const nextSong = () => {
    if (currentPlaylist !== null) {
      const songlist = currentPlaylist.songs;
      const index = songlist.findIndex((item) => item.id === currSong.id);
      if (index + 2 < songlist.length) {
        dispatch(setCurrentSong(songlist[index + 1]));
      } else {
        dispatch(setCurrentSong(songlist[0]));
      }
    } else {
      return false;
    }
  };

  const lastSong = () => {
    if (currentPlaylist !== null) {
      const songlist = currentPlaylist.songs;
      const index = songlist.findIndex((item) => item.id === currSong.id);
      if (index === 0) {
        dispatch(setCurrentSong(songlist[songlist.length]));
      } else {
        dispatch(setCurrentSong(songlist[index - 1]));
      }
    } else {
      return false;
    }
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
              <YouTube
                videoId={videoId}
                opts={videoOpts}
                ref={playerRef}
                className="hidden"
              />
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
              max={timeToSeconds(currSong.duration)}
              onChange={(e) => handleSchedule(e)}
            />
            <p
              className="bg-white h-1.5 relative rounded -top-2.5"
              style={{ width: `${lengthofsong}%` }}
            ></p>
            <div className="flex justify-between text-xs">
              <span>{formatTime(currentTime)}</span>
              <span>{currSong.duration}</span>
            </div>
            <div className="flex justify-center items-center mt-2 mb-6">
              <LiaRandomSolid className="w-5 h-5  mx-4 cursor-pointer active:drop-shadow-none" />
              <div className="flex justify-center ">
                <IoPlayBack
                  className="w-8 h-8 text-white mx-2 drop-shadow-lg cursor-pointer"
                  onClick={() => lastSong()}
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
                  onClick={() => nextSong()}
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
