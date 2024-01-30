import Headerbar from "../../components/Object/Headerbar";
import SideBar from "../../components/Object/Sidebar";
import Footer from "../../components/Object/Footer";
import { CiSearch } from "react-icons/ci";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { PiListBold } from "react-icons/pi";
import he from "he";

const Searching = () => {
  const methods = useForm();
  const [videoList, setVideoList] = useState([]);
  const [favorSong, setFavorSong] = useState(false);
  const watchInput = methods.watch("search-word");

  const pressLove = (condition) => {
    setFavorSong(condition);
  };

  const getSearch = () => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: "AIzaSyCujisGM1ePBvGwD5waTQ1p9fSk8tcN8VI",
          part: "id,snippet",
          q: watchInput,
          type: "video",
          maxResult: 50,
        },
      })
      .then((res) => {
        console.log(res.data);
        const videos = res.data.items;
        setVideoList(videos);
        // const videoId = res.data.items
        // axios.get("https://www.googleapis.com/youtube/v3/videos", {
        //   params: {
        //     key: "AIzaSyCujisGM1ePBvGwD5waTQ1p9fSk8tcN8VI",
        //     part: "contentDetails",
        //     id: videoId,
        //   },
        // });
      })
      .catch((error) => {});
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
                className="p-2 indent-1 text-sm  w-[300px] h-8 border-2 rounded-3xl"
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
              className="grid grid-cols-[2fr,1fr,1fr,50px,30px] text-xs font-bold bg-white  items-center px-6 py-1.5 cursor-pointer hover:bg-lightGray"
              key={video.id.videoId}
            >
              <p className="flex items-center">
                <div className="bg-themeBlue rounded w-[40px] h-[40px] mr-2"></div>
                {he.decode(video.snippet.title)}
              </p>

              <p>{video.snippet.channelTitle}</p>
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
          ))}
        </div>
      </SideBar>
      <Footer />
    </>
  );
};
export default Searching;
