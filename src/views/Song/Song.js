import SideBar from "../../components/Object/Sidebar";
import { useSelector } from "react-redux";
import SongList from "../../components/Object/SongList.js";
import { GiMusicSpell } from "react-icons/gi";
import { FaPlay } from "react-icons/fa6";
import { FaRandom } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  setCurrentSong,
  switchPlaylist,
  toggleRandomPlay,
} from "../../components/store/musicSlice.js";
import { useDispatch } from "react-redux";

const Song = () => {
  const { playlistName } = useParams();
  const videoList = useSelector(
    (state) => state.music.playlists[playlistName]?.songs || []
  );
  const description = useSelector(
    (state) => state.music.playlists[playlistName]?.description || []
  );
  const name = useSelector(
    (state) => state.music.playlists[playlistName]?.name || []
  );
  const dispatch = useDispatch();

  const playListinList = () => {
    dispatch(switchPlaylist(playlistName));
    dispatch(setCurrentSong(videoList[0]));
  };

  return (
    <>
      <SideBar>
        <div>
          <SongList videoList={videoList} search={false}>
            <div className="p-6 bg-white flex items-center">
              <div className=" w-[150px] h-[150px] shadow-xl rounded mr-4 relative">
                <GiMusicSpell className="w-[100px] h-[100px] text-themeBlue m-[25px] drop-shadow-2xl relative" />
                <div className="absolute flex left-[166px] bottom-0">
                  <button
                    className="flex items-center text-white bg-themeBlue py-1 w-20 mx-0.5 justify-center text-xs rounded"
                    onClick={() => playListinList()}
                  >
                    <FaPlay className="mr-0.5" />
                    播放
                  </button>
                  <button
                    className="flex items-center text-white bg-themeBlue py-1 w-20 mx-0.5 justify-center text-xs rounded"
                    onClick={() => dispatch(toggleRandomPlay(true))}
                  >
                    <FaRandom className="mr-0.5" />
                    隨機播放
                  </button>
                </div>
              </div>
              <div>
                <h2 className="text-black">{name}</h2>
                <p className="text-xs mt-1.5">{description}</p>
              </div>
            </div>
            <div className="grid grid-cols-[2.5fr,1fr,50px,50px,30px] bg-white text-xs py-2 px-6 border-y-[1px] border-gray">
              <p>名稱</p>
              <p>頻道</p>
              <p></p>
              <p>時長</p>
              <p></p>
            </div>
          </SongList>
        </div>
      </SideBar>
    </>
  );
};

export default Song;
