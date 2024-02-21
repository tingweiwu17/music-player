import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    playlists: {
      favorites: {
        name: "Favorites",
        description: "A collection of favorite songs.",
        songs: [],
      },
      myPlaylist: {
        name: "My Playlist",
        description: "A custom playlist created by the user.",
        songs: [],
      },
    },
    currentPlaylist: null,
    currentSong: "",
    isPlaying: false,
  },
  reducers: {
    switchPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    addToPlaylist: (state, action) => {
      const { playlistName, song } = action.payload;
      state.playlists[playlistName].songs.push(song);
    },
    removeFromPlaylist: (state, action) => {
      const { playlistName, songId } = action.payload;
      state.playlists[playlistName].songs = state.playlists[
        playlistName
      ].songs.filter((song) => song.id !== songId);
    },
    clearPlaylist: (state, action) => {
      const { playlistName } = action.payload;
      state.playlists[playlistName].songs = [];
    },
    createPlaylist: (state, action) => {
      const { playlistName, description } = action.payload;
      state.playlists[playlistName] = {
        name: playlistName,
        description: description,
        songs: [],
      };
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const {
  switchPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  clearPlaylist,
  createPlaylist,
  togglePlayPause,
  setCurrentSong,
} = musicSlice.actions;
export default musicSlice.reducer;
