import { useState } from "react";

const usePlaylist = () => {
  const [playlists, setPlaylists] = useState({
    id: 1,
    name: "我的最爱",
    songs: [
      {
        id: 1,
        title: "歌曲1",
        artist: "歌手1",
        channel: "頻道1",
        duration: "3:30",
      },
      {
        id: 2,
        title: "歌曲2",
        artist: "歌手2",
        channel: "頻道2",
        duration: "4:15",
      },
    ],
  });
  return { playlists, setPlaylists };
};

export default usePlaylist;
