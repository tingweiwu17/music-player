import SideBar from "../../components/Object/Sidebar";
import Footer from "../../components/Object/Footer";
import Headerbar from "../../components/Object/Headerbar";
import { useSelector } from "react-redux";
import SongList from "../../components/Object/SongList.js";

const Song = () => {
  const videoList = useSelector((state) => state.music.playlists.favorites);
  console.log(videoList);
  return (
    <>
      <Headerbar />
      <SideBar>
        <div>
          <SongList videoList={videoList} search={false}>
            <div className="grid grid-cols-[2.5fr,1fr,50px,50px,30px] bg-white text-xs py-2 px-6 border-b-[1px] border-gray">
              <p>名稱</p>
              <p>頻道</p>
              <p></p>
              <p>時長</p>
              <p></p>
            </div>
          </SongList>
        </div>
      </SideBar>
      <Footer />
    </>
  );
};

export default Song;
