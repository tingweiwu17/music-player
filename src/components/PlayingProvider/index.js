import { createContext } from "react";

export const PlayingContext = createContext({});
const PlayingProvider = ({ children }) => {
  const defaultValue = {};
  return (
    <PlayingContext.Provider value={defaultValue}>
      {children}
    </PlayingContext.Provider>
  );
};
export default PlayingProvider;
