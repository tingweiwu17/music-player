import { useState } from "react";
import { createContext } from "react";

export const PlayingContext = createContext({});
const PlayingProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState();
  const defaultValue = { isPlaying, setIsPlaying };
  return (
    <PlayingContext.Provider value={defaultValue}>
      {children}
    </PlayingContext.Provider>
  );
};
export default PlayingProvider;
