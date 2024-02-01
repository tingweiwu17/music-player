import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { PiListBold } from "react-icons/pi";
// import { useState } from "react";
import SideBar from "../../components/Object/Sidebar";
import Footer from "../../components/Object/Footer";
import Headerbar from "../../components/Object/Headerbar";
import he from "he";
import { useSelector } from "react-redux";

const Song = () => {
  const videoList = useSelector((state) => state.music.playlists.favorites);
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

  const pressLove = (condition) => {};
  return (
    <>
      <Headerbar />
      <SideBar>
        <div>
          {videoList && videoList.length > 0 && (
            <div className="grid grid-cols-[2.5fr,1fr,50px,50px,30px] bg-white text-xs py-2 px-6 border-b-[1px] border-gray">
              <p>名稱</p>
              <p>頻道</p>
              <p></p>
              <p>時長</p>
              <p></p>
            </div>
          )}
          {videoList.map((video, index) => (
            <div
              className="grid grid-cols-[2.5fr,1fr,50px,50px,30px] gap-2 text-xs font-bold bg-white  items-center px-6 py-1.5 cursor-pointer hover:bg-lightGray"
              key={video.id.videoId}
            >
              <div className="flex items-center">
                <div className="bg-black rounded min-w-[80px] min-h-[60px] mr-4">
                  <img
                    className="w-[80px] h-[60px]"
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

export default Song;
