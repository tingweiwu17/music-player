import "./App.css";
import Frontpage from "./views/Frontpage/Frontpage";
import Playing from "./views/Playing/Playing";
import Song from "./views/Song/Song";
import Searching from "./views/Searching/Searching";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-r text-grayBg from-themeBlue to-themeGreen">
        <Routes>
          <Route exact path="/" Component={Frontpage} />
          <Route path="/playing" Component={Playing} />
          <Route path="/song" Component={Song} />
          <Route path="/searching" Component={Searching} />
        </Routes>
      </main>
    </>
  );
}

export default App;
