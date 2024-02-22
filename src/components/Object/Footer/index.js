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
import { useState, useRef, useEffect } from "react";
import he from "he";
import { PiMusicNotesFill } from "react-icons/pi";
import classNames from "classnames";
import "./Footer.scss";
import { setCurrentSong, toggleRandomPlay } from "../../store/musicSlice";
import YouTube from "react-youtube";
import SongList from "../SongList.js";

const Footer = () => {
  const isRandom = useSelector((state) => state.music.randomPlay);
  const isPlaying = useSelector((state) => state.music.isPlaying);
  const dispatch = useDispatch();
  const [openPlayModal, setOpenPlayModal] = useState(false);
  const currSong = useSelector((state) => state.music.currentSong);
  const currentPlaylist = useSelector((state) => state.music.currentPlaylist);
  const videoId = useSelector((state) => state.music.currentSong.id);
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [lengthofsong, setLengthofsong] = useState(0);
  const [volume, setVolume] = useState(100);
  const [volumeOn, setVolumeOn] = useState(true);

  const videoOpts = {
    playerVars: {
      autoplay: 0,
    },
  };

  const toPlaying = (condition) => {
    setOpenPlayModal(condition);
  };

  const volumeOnOrOff = (condition) => {
    setVolumeOn(condition);
    if (condition) {
      setVideoVolume(50);
    } else {
      setVideoVolume(0);
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

  const [playRecord, setPlayRecord] = useState([]);

  const nextSong = () => {
    if (currentPlaylist !== null) {
      const songlist = currentPlaylist.songs;
      console.log(songlist);
      const index = songlist.findIndex((item) => item.id === currSong.id);
      if (isRandom) {
        const remainingSongs = songlist.filter(
          (item) => !playRecord.includes(item)
        );
        const randomIndex = Math.floor(Math.random() * remainingSongs.length);
        const nextRandomSong = remainingSongs[randomIndex];
        dispatch(setCurrentSong(nextRandomSong));
        setPlayRecord([...playRecord, nextRandomSong]);
      } else {
        if (index + 2 < songlist.length) {
          dispatch(setCurrentSong(songlist[index + 1]));
        } else {
          dispatch(setCurrentSong(songlist[0]));
        }
      }
    } else {
      return false;
    }
  };

  const lastSong = () => {
    if (currentPlaylist !== null) {
      const songlist = currentPlaylist.songs;
      const index = songlist.findIndex((item) => item.id === currSong.id);
      if (isRandom) {
        if (playRecord.length >= 0) {
          dispatch(setCurrentSong(playRecord[playRecord.length - 1]));
        }
      } else {
        if (index === 0) {
          dispatch(setCurrentSong(songlist[songlist.length]));
        } else {
          dispatch(setCurrentSong(songlist[index - 1]));
        }
      }
    } else {
      return false;
    }
  };

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

  const handleSchedule = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer.seekTo(time, true);
    }
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

  // useEffect(() => {
  //   if (currentTime === timeToSeconds(currSong.duration) - 1) {
  //     if (currentPlaylist !== null) {
  //       nextSong();
  //     }
  //   }
  // }, [currSong, currentPlaylist]);

  return (
    <>
      <PlayingModal
        isOpen={openPlayModal}
        close={() => toPlaying(false)}
        lastSong={() => lastSong()}
        currSong={currSong}
        nextSong={() => nextSong()}
        playerRef={playerRef}
        timeToSeconds={timeToSeconds(currSong.duration)}
        handleSchedule={(e) => handleSchedule(e)}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        lengthofsong={lengthofsong}
        formatStart={formatTime(currentTime)}
        volume={volume}
        volumeOn={volumeOn}
        setVideoVolume={setVideoVolume}
        volumeOnOrOff={volumeOnOrOff}
        isPlaying={isPlaying}
      />
      <div
        className="fixed bottom-0 flex bg-white h-[70px] cursor-pointer justify-between items-center w-full z-20 p-4 border-t-[1px] border-lightGray"
        onClick={() => toPlaying(true)}
      >
        <div className="flex items-center w-[30%]">
          <div
            className={classNames(
              "bg-black rounded-md min-w-[50px] w-[50px] h-[50px] flex items-center",
              {
                "bg-white shadow-md justify-center": currSong === "",
              }
            )}
          >
            {currSong !== "" ? (
              <img alt="thumnail of video" src={currSong.imgUrl} />
            ) : (
              <PiMusicNotesFill className="w-7 h-7" />
            )}
          </div>
          <div className="flex flex-col text-xs ml-3 font-bold truncate">
            <span>{currSong !== "" ? he.decode(currSong.title) : ""}</span>
            <span>- {currSong.channel} -</span>
          </div>
        </div>

        <div>
          <div className="flex justify-center w-[500px] items-center">
            <LiaRandomSolid
              className={classNames("w-4 h-4 mx-4 hover:text-themeBlue", {
                "text-themeBlue": isRandom,
              })}
              onClick={() => dispatch(toggleRandomPlay(!isRandom))}
            />
            <div className="flex justify-center items-center">
              <IoPlayBack
                className="w-6 h-6 mx-2 hover:text-themeBlue"
                onClick={() => lastSong()}
              />
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
              <IoPlayForward
                className="w-6 h-6 mx-2 hover:text-themeBlue"
                onClick={() => nextSong()}
              />
            </div>
            <GrPowerCycle className="w-4 h-4 mx-4 hover:text-themeBlue" />
          </div>
          <div className="music-control flex relative items-center justify-center text-xs mt-1">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              value={Math.floor(currentTime)}
              min={0}
              max={timeToSeconds(currSong.duration)}
              onChange={(e) => handleSchedule(e)}
            />
            <div className="absolute w-[80%]">
              <p
                className="h-1 bg-grayBg"
                style={{ width: `${lengthofsong}%` }}
              ></p>
            </div>
            <span>{currSong.duration}</span>
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
          <input
            type="range"
            className="z-5 cursor-pointer"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVideoVolume(parseInt(e.target.value))}
          />
          <div className="absolute w-[50%]">
            <p className="h-1 bg-grayBg" style={{ width: `${volume}%` }}></p>
          </div>
        </div>
      </div>
      <YouTube
        videoId={videoId}
        opts={videoOpts}
        ref={playerRef}
        className="hidden"
      />
    </>
  );
};
export default Footer;
