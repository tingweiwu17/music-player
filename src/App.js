import "./App.css";
import Frontpage from "./views/Frontpage/Frontpage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-themeBlue  to-themeGreen opacity-50 p-8">
        <Routes>
          <Route exact path="/" element={Frontpage} />
        </Routes>
      </main>
    </>
  );
}

export default App;
