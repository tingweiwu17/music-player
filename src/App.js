import "./App.css";
import Frontpage from "./views/Frontpage/Frontpage";
import Song from "./views/Song/Song";
import Searching from "./views/Searching/Searching";
import { Route, Routes } from "react-router-dom";
import Headerbar from "./components/Object/Headerbar";
import Footer from "./components/Object/Footer";

function App() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-r text-grayBg from-themeBlue to-themeGreen">
        <Headerbar />
        <Routes>
          <Route exact path="/" Component={Frontpage} />
          <Route path="/song" Component={Song} />
          <Route path="/searching" Component={Searching} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
