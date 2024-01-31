import Headerbar from "../../components/Object/Headerbar";
import SideBar from "../../components/Object/Sidebar";
import Footer from "../../components/Object/Footer";
import { CiSearch } from "react-icons/ci";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiListBold } from "react-icons/pi";
import he from "he";
import { useSelector, useDispatch } from "react-redux";
import {
  addToPlaylist,
  removeFromPlaylist,
} from "../../components/store/musicSlice";

const Searching = () => {
  const methods = useForm();
  const [videoList, setVideoList] = useState([]);
  const watchInput = methods.watch("search-word");
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.music.playlists);

  const isSongInFavorites = (playlists, songId) => {
    if (
      !playlists ||
      !playlists.favorites ||
      !Array.isArray(playlists.favorites)
    ) {
      return false;
    }
    return playlists.favorites.some((song) => song.id === songId);
  };

  const pressLove = (condition, index) => {
    const vl = videoList[index];
    console.log(vl);
    const song = { id: vl.id.videoId, duration: vl.duration };
    const playlistName = "favorites";
    if (condition) {
      dispatch(addToPlaylist({ playlistName, song }));
    } else {
      dispatch(removeFromPlaylist({}));
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
    return parts.join(":");
  }

  const getSearch = () => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: "AIzaSyCujisGM1ePBvGwD5waTQ1p9fSk8tcN8VI",
          part: "id,snippet",
          q: watchInput,
          type: "video",
          maxResults: 5,
        },
      })
      .then((res) => {
        const videos = res.data.items;
        setVideoList(videos);
        for (let i = 0; i < videos.length; i++) {
          const videoId = videos[i].id.videoId;
          axios
            .get("https://www.googleapis.com/youtube/v3/videos", {
              params: {
                key: "AIzaSyCujisGM1ePBvGwD5waTQ1p9fSk8tcN8VI",
                part: "contentDetails",
                id: videoId,
              },
            })
            .then((ress) => {
              const duration = formatTime(
                ress.data.items[0].contentDetails.duration
              );
              setVideoList((prevVideoList) => {
                const updatedVideos = prevVideoList.map((video) => {
                  if (video.id.videoId === videoId) {
                    return { ...video, duration: duration };
                  }
                  return video;
                });
                return updatedVideos;
              });
            })
            .catch((err) => {
              console.error("获取视频详细信息时发生错误：", err);
            });
        }
      })
      .catch((error) => {
        console.error("发生错误：", error);
      });
  };

  return (
    <>
      <Headerbar />
      <SideBar>
        <div>
          <FormProvider {...methods}>
            <form
              className="flex items-center py-4 px-6"
              onSubmit={methods.handleSubmit(getSearch)}
            >
              <input
                className="p-2 indent-1 text-xs  w-[300px] h-8 border-2 rounded-3xl"
                placeholder="Search..."
                {...methods.register("search-word", { required: true })}
              />
              <CiSearch
                className="text-white w-6 h-6 ml-2 cursor-pointer"
                type="submit"
              />
            </form>
          </FormProvider>
          {videoList && videoList.length > 0 && (
            <div className="grid grid-cols-[2fr,1fr,1fr,50px,30px] bg-white text-xs py-2 px-6 border-b-[1px] border-gray">
              <p>名稱</p>
              <p>頻道</p>
              <p></p>
              <p>時長</p>
              <p></p>
            </div>
          )}
          {videoList.map((video, index) => (
            <div
              className="grid grid-cols-[2fr,1fr,1fr,50px,30px] gap-2 text-xs font-bold bg-white  items-center px-6 py-1.5 cursor-pointer hover:bg-lightGray"
              key={video.id.videoId}
            >
              <div className="flex items-center">
                <div className="bg-black rounded w-[80px] h-[60px] mr-4">
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt="Thumbnail of the video"
                  />
                </div>
                <p>{he.decode(video.snippet.title)}</p>
              </div>

              <p>{video.snippet.channelTitle}</p>
              {!isSongInFavorites(playlists, video.id.videoId) ? (
                <GoHeart
                  className="hover:text-themeBlue"
                  onClick={() => pressLove(true, index)}
                />
              ) : (
                <GoHeartFill
                  className="text-themeBlue"
                  onClick={() => pressLove(false, index)}
                />
              )}
              <p className="text-center">{video.duration}</p>
              <PiListBold className="w-5 h-5" />
            </div>
          ))}
        </div>
      </SideBar>
      <Footer />
    </>
  );
};
export default Searching;
