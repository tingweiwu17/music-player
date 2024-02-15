import SideBar from "../../components/Object/Sidebar";
import { CiSearch } from "react-icons/ci";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import SongList from "../../components/Object/SongList.js";

const Searching = () => {
  const methods = useForm();
  const [videoList, setVideoList] = useState([]);
  const watchInput = methods.watch("search-word");

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

  const getSearch = () => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: "AIzaSyCujisGM1ePBvGwD5waTQ1p9fSk8tcN8VI",
          part: "id,snippet",
          q: watchInput,
          type: "video",
          maxResults: 10,
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
                part: "contentDetails,snippet",
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
              console.error("取得影片資訊時錯誤：", err);
            });
        }
      })
      .catch((error) => {
        console.error("搜尋發生錯誤：", error);
      });
  };

  return (
    <>
      <SideBar>
        <div>
          <FormProvider {...methods}>
            <form
              className="flex items-center py-4 px-6"
              onSubmit={methods.handleSubmit(getSearch)}
            >
              <input
                autoFocus={true}
                className="p-2 indent-1 text-xs  w-[300px] h-8 border-2 rounded-3xl"
                placeholder="Search..."
                {...methods.register("search-word", { required: true })}
              />
              <CiSearch
                className="text-white w-6 h-6 ml-2 cursor-pointer"
                type="submit"
                onClick={getSearch}
              />
            </form>
          </FormProvider>

          <SongList videoList={videoList} search={true}>
            {videoList && videoList.length > 0 && (
              <div className="grid grid-cols-[2.5fr,1fr,50px,50px,30px] gap-2 bg-white text-xs py-2 px-6 border-b-[1px] border-gray">
                <p>名稱</p>
                <p>頻道</p>
                <p></p>
                <p className="ml-2">時長</p>
                <p></p>
              </div>
            )}
          </SongList>
        </div>
      </SideBar>
    </>
  );
};
export default Searching;
