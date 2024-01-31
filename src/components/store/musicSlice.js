import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    playlists: {
      favorites: [],
    },
    currentPlaylist: null,
    currentSong: null,
    isPlaying: false,
  },
  reducers: {
    switchPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    addToPlaylist: (state, action) => {
      const { playlistName, song } = action.payload;
      state.playlists[playlistName].push(song);
    },
    removeFromPlaylist: (state, action) => {
      const { playlistName, songId } = action.payload;
      state.playlists[playlistName] = state.playlists[playlistName].filter(
        (song) => song.id !== songId
      );
    },
    clearPlaylist: (state, action) => {
      const { playlistName } = action.payload;
      state.playlists[playlistName] = [];
    },
    createPlaylist: (state, action) => {
      const { playlistName } = action.payload;
      state.playlists[playlistName] = [];
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
