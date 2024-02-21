import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiListBold } from "react-icons/pi";
import he from "he";
import { useSelector, useDispatch } from "react-redux";
import {
  addToPlaylist,
  removeFromPlaylist,
  setCurrentSong,
  switchPlaylist,
} from "../../store/musicSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./SongList.scss";
import NewListModal from "../../Modal/NewListModal/NewListModal";
import { GiMusicSpell } from "react-icons/gi";
import { RiPlayListAddLine } from "react-icons/ri";
import { useEffect } from "react";

const SongList = ({ videoList, children, search }) => {
  const [newList, setNewList] = useState();
  const [hoverStates, setHoverStates] = useState([]);
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.music.playlists);
  const { playlistName } = useParams();
  const [moreAction, setMoreAction] = useState(
    Array(videoList.length).fill(false)
  );

  useEffect(() => {
    setMoreAction(Array(videoList.length).fill(false));
  }, [videoList]);

  const isSongInFavorites = (playlists, songId) => {
    if (search) {
      if (
        !playlists ||
        !playlists.favorites ||
        !Array.isArray(playlists.favorites.songs)
      ) {
        return false;
      }
      return playlists.favorites.songs.some((song) => song.id === songId);
    } else {
      return !videoList.favorite || !videoList.favorite.songs;
    }
  };

  const pressLove = (condition, index) => {
    const playlistName = "favorites";
    if (search) {
      const vl = videoList[index];
      const song = {
        id: vl.id.videoId,
        duration: vl.duration,
        channel: vl.snippet.channelTitle,
        channelId: vl.snippet.channelId,
        imgUrl: vl.snippet.thumbnails.default.url,
        title: vl.snippet.title,
        favorite: true,
      };
      if (condition) {
        dispatch(addToPlaylist({ playlistName, song: song }));
      } else {
        dispatch(removeFromPlaylist({ playlistName, songId: vl.id.videoId }));
      }
    } else {
      dispatch(
        removeFromPlaylist({ playlistName, songId: videoList[index].id })
      );
    }
  };

  function formatTime(duration) {
    duration = duration.replace("PT", "");
    duration = duration.replace("H", ":").replace("M", ":").replace("S", "");
    const parts = duration.split(":").map((part) => parseInt(part));
    let i;
    if (parts.length === 3) {
      i = 0;
    } else {
      i = -1;
    }
    if (parts[i + 1] < 10) {
      parts[i + 1] = "0" + parts[i + 1];
    }
    if (parts[i + 2] < 10) {
      parts[i + 2] = "0" + parts[i + 2];
    }
    if (parts.length === 1) {
      parts.unshift("00");
    }
    return parts.join(":");
  }

  const getDataofVideo = (videoId) => {
    axios
      .get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          key: "AIzaSyCujisGM1ePBvGwD5waTQ1p9fSk8tcN8VI",
          part: "contentDetails,snippet",
          id: videoId,
        },
      })
      .then((ress) => {
        const videoContent = ress.data.items[0];
        const song = {
          id: videoContent.id,
          duration: formatTime(videoContent.contentDetails.duration),
          channel: videoContent.snippet.channelTitle,
          channelId: videoContent.snippet.channelId,
          imgUrl: videoContent.snippet.thumbnails.default.url,
          title: videoContent.snippet.title,
        };
        dispatch(setCurrentSong(song));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const playThisSong = (id) => {
    if (search) {
      getDataofVideo(id);
      dispatch(switchPlaylist([]));
    } else {
      for (const plName in playlists) {
        if (playlists.hasOwnProperty(playlistName)) {
          if (plName === playlistName) {
            const matchedPlaylist = playlists[plName];
            dispatch(switchPlaylist(matchedPlaylist));
            const songId = matchedPlaylist.songs.findIndex(
              (item) => item.id === id
            );
            dispatch(setCurrentSong(matchedPlaylist.songs[songId]));
          }
        }
      }
    }
  };

  const openNewList = (condition) => {
    setNewList(condition);
  };

  const moreAboutSong = (index) => {
    const newShow = moreAction.map((item, id) => {
      if (id === index) {
        if (item === true) {
          handleMouseEnter(false, index);
        }
        return !item;
      } else {
        return item;
      }
    });
    setMoreAction(newShow);
  };

  const handleMouseEnter = (condition, index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = condition;
    setHoverStates(newHoverStates);
  };

  return (
    <>
      {children}
      <div className="bg-white">
        {videoList.length > 0 &&
          videoList.map((video, index) => (
            <div
              className="grid grid-cols-[2.5fr,1fr,50px,50px,30px] relative gap-2 text-xs font-bold items-center px-6 py-1.5 cursor-pointer hover:bg-lightGray"
              key={search ? video.id.videoId : video.id}
              onClick={() => playThisSong(search ? video.id.videoId : video.id)}
            >
              <div className="flex items-center">
                <div className=" rounded min-w-[80px] min-h-[60px] mr-4">
                  <img
                    className="w-[90px] min-w-[90px] h-[60px] rounded"
                    src={
                      search ? video.snippet.thumbnails.high.url : video.imgUrl
                    }
                    alt="Thumbnail of the video"
                  />
                </div>
                <p>
                  {search
                    ? he.decode(video.snippet.title)
                    : he.decode(video.title)}
                </p>
              </div>
              <p>{search ? video.snippet.channelTitle : video.channel}</p>
              {!isSongInFavorites(
                playlists,
                search ? video.id.videoId : video.id
              ) ? (
                <GoHeart
                  className="hover:text-themeBlue"
                  onClick={(e) => {
                    e.stopPropagation();
                    pressLove(true, index);
                  }}
                />
              ) : (
                <GoHeartFill
                  className="text-themeBlue"
                  onClick={(e) => {
                    e.stopPropagation();
                    pressLove(false, index);
                  }}
                />
              )}
              <p className="text-center">{video.duration}</p>
              <PiListBold
                className="w-4 h-4 hover:text-themeGreen"
                onClick={(e) => {
                  e.stopPropagation();
                  moreAboutSong(index);
                }}
              />
              {moreAction[index] && (
                <ul className="absolute bg-white p-1 rounded drop-shadow-lg right-8 top-10 z-30 w-[112px]">
                  <li onMouseEnter={() => handleMouseEnter(true, index)}>
                    加入清單
                  </li>
                  {!search && (
                    <li
                      onClick={() =>
                        dispatch(
                          removeFromPlaylist({
                            playlistName,
                            songId: videoList[index].id,
                          })
                        )
                      }
                    >
                      從播放列表中移除
                    </li>
                  )}
                  <li
                    onClick={() => {
                      pressLove(true, index);
                      setMoreAction(Array(videoList.length).fill(false));
                    }}
                  >
                    加入喜愛項目
                  </li>
                </ul>
              )}
              {hoverStates[index] && (
                <ul
                  className="absolute bg-white py-1 px-2 rounded drop-shadow-md right-36 top-10 z-30"
                  onMouseLeave={() => handleMouseEnter(true, index)}
                >
                  <li
                    onClick={() => openNewList(true)}
                    className="flex items-center  border-b border-lightGray"
                  >
                    新增播放清單
                    <RiPlayListAddLine className="cursor-pointer w-3 h-3 ml-1" />
                  </li>
                  {Object.keys(playlists).map((key) => (
                    <li
                      key={key}
                      className="flex items-center"
                      onClick={() =>
                        dispatch(
                          addToPlaylist({
                            playlistName: key,
                            song: video,
                          })
                        )
                      }
                    >
                      <GiMusicSpell className="mr-2" />
                      {playlists[key].name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>
      <NewListModal isOpen={newList} close={() => openNewList(false)} />
      {!search && (
        <div className="bg-white text-xs py-2 px-6 border-y-[1px] border-gray">
          {videoList.length}首歌曲 ╴ n分鐘
        </div>
      )}
    </>
  );
};

export default SongList;
