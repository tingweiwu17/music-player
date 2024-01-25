import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { PiListBold } from "react-icons/pi";
import { useState } from "react";
import SideBar from "../../components/Object/Sidebar";
import Footer from "../../components/Object/Footer";
import Headerbar from "../../components/Object/Headerbar";

const Song = () => {
  const [favorSong, setFavorSong] = useState(false);

  const pressLove = (condition) => {
    setFavorSong(condition);
  };
  return (
    <>
      <Headerbar />

      <SideBar>
        <div className="text-sm bg-white">
          <div className="grid grid-cols-[1fr,1fr,1fr,1fr,50px,30px]  h-10 py-2 px-6 border-b-[1px] border-gray">
            <p>名稱</p>
            <p>藝人</p>
            <p>頻道</p>
            <p></p>
            <p>時長</p>
            <p></p>
          </div>
          <div className="grid grid-cols-[1fr,1fr,1fr,1fr,50px,30px]  items-center px-6 py-1.5 cursor-pointer hover:bg-lightGray">
            <p className="flex items-center">
              <div className="bg-themeBlue rounded w-[40px] h-[40px] mr-2"></div>
              We don't talk together
            </p>
            <p>Heize</p>
            <p>Stone Music Entertainment</p>
            {!favorSong ? (
              <GoHeart
                className="hover:text-themeBlue"
                onClick={() => pressLove(true)}
              />
            ) : (
              <GoHeartFill
                className="text-themeBlue"
                onClick={() => pressLove(false)}
              />
            )}

            <p>03:43</p>
            <PiListBold className="w-5 h-5" />
          </div>
          <div className="grid grid-cols-[1fr,1fr,1fr,1fr,50px,30px] items-center px-6 py-1.5 cursor-pointer hover:bg-lightGray">
            <p className="flex items-center">
              <div className="bg-themeBlue rounded w-[40px] h-[40px] mr-2"></div>
              Back door
            </p>
            <p>Stray kids</p>
            <p>JYP Entertainment</p>
            {!favorSong ? (
              <GoHeart
                className="hover:text-themeBlue"
                onClick={() => pressLove(true)}
              />
            ) : (
              <GoHeartFill
                className="text-themeBlue"
                onClick={() => pressLove(false)}
              />
            )}
            <p>03:43</p>
            <PiListBold className="w-5 h-5" />
          </div>
        </div>
      </SideBar>
      <Footer />
    </>
  );
};

export default Song;
