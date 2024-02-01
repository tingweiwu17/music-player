import { useNavigate } from "react-router-dom";
import Headerbar from "../../components/Object/Headerbar";
import { BsFillMusicPlayerFill } from "react-icons/bs";

const Frontpage = () => {
  const navigate = useNavigate();
  const startThePlaying = () => {
    navigate("/song");
  };
  return (
    <>
      <Headerbar />
      <div className="flex mb-10 justify-center items-baseline pt-[250px]">
        <BsFillMusicPlayerFill className="text-white w-20 h-20 mx-10" />
        <BsFillMusicPlayerFill className="text-white w-20 h-20 mx-10" />
      </div>
      <div className="pt-5">
        <div className="w-[400px] border-white border-4 rounded-lg m-auto p-4">
          <h1 className="font-bold text-white text-title text-center border-b  pb-2">
            Title of Music Player
          </h1>
          <p className="text-center text-white p-3">
            Weave notes into the most beautiful canvas, letting the colors of
            music flutter.
          </p>
          <button
            onClick={() => startThePlaying()}
            className="border-white border-2 rounded-2xl bg-white px-2 py-[6px] text-grayBg font-bold"
          >
            Get started
          </button>
        </div>
      </div>
    </>
  );
};
export default Frontpage;
