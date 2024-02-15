import { BsFillMusicPlayerFill } from "react-icons/bs";
import { RiPlayListAddLine } from "react-icons/ri";
import NewListModal from "../../Modal/NewListModal/NewListModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiMusicSpell } from "react-icons/gi";

const SideBar = ({ children }) => {
  const [newList, setNewList] = useState(false);
  const navigate = useNavigate();
  const allPlayList = useSelector((state) => state.music.playlists);

  const openNewList = (condition) => {
    setNewList(condition);
  };

  const toSearchingPage = () => {
    navigate("/searching");
  };

  const toSongPage = () => {
    navigate("/song");
  };

  return (
    <div className=" grid grid-cols-[300px,1fr] min-h-playlist">
      <div className=" z-20 border-r-2  p-10  border-white">
        <div className="flex mb-10 justify-center items-baseline">
          <BsFillMusicPlayerFill className="text-white w-10 h-10" />
          <div className="border-b-4 border-white w-14 mx-1"></div>
          <BsFillMusicPlayerFill className="text-white w-10 h-10" />
        </div>
        <button
          className="w-full px-3 py-1 rounded text-sm bg-white text-left cursor-text focus:none"
          onClick={toSearchingPage}
        >
          Search...
        </button>
        <div className="flex justify-between mt-3 text-xs">
          播放清單
          <RiPlayListAddLine
            className="cursor-pointer w-5 h-5 mb-2"
            onClick={() => openNewList(true)}
          />
        </div>
        {Object.keys(allPlayList).map((playlistName) => (
          <div
            key={playlistName}
            className="cursor-pointer ml-4 flex items-center"
            onClick={toSongPage}
          >
            <GiMusicSpell className="mr-2" />
            <p className="font-bold drop-shadow-sm">{playlistName}</p>
          </div>
        ))}
        <NewListModal isOpen={newList} close={() => openNewList(false)} />
      </div>
      {children}
    </div>
  );
};
export default SideBar;
