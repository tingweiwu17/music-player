import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiListBold } from "react-icons/pi";
import he from "he";
import { useSelector, useDispatch } from "react-redux";
import { addToPlaylist, removeFromPlaylist } from "../../store/musicSlice";

const SongList = ({ videoList, children, search }) => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.music.playlists);

  const isSongInFavorites = (playlists, songId) => {
    if (search) {
      if (
        !playlists ||
        !playlists.favorites ||
        !Array.isArray(playlists.favorites)
      ) {
        return false;
      }
      return playlists.favorites.some((song) => song.id === songId);
    } else {
      return !videoList.favorite;
    }
  };

  const pressLove = (condition, index) => {
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
    const playlistName = "favorites";
    if (condition) {
      dispatch(addToPlaylist({ playlistName, song }));
    } else {
      dispatch(removeFromPlaylist({ playlistName, songId: vl.id.videoId }));
    }
  };

  return (
    <>
      {children}
      {videoList.map((video, index) => (
        <div
          className="grid grid-cols-[2.5fr,1fr,50px,50px,30px] gap-2 text-xs font-bold bg-white  items-center px-6 py-1.5 cursor-pointer hover:bg-lightGray"
          key={video.id.videoId}
        >
          <div className="flex items-center">
            <div className=" rounded min-w-[80px] min-h-[60px] mr-4">
              <img
                className="w-[90px] h-[60px]"
                src={search ? video.snippet.thumbnails.high.url : video.imgUrl}
                alt="Thumbnail of the video"
              />
            </div>
            <p>
              {search ? he.decode(video.snippet.title) : he.decode(video.title)}
            </p>
          </div>

          <p>{search ? video.snippet.channelTitle : video.channel}</p>
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
    </>
  );
};

export default SongList;
