import { IoSettings } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Headerbar = () => {
  const navigate = useNavigate();
  const toFrontPage = () => {
    navigate("/");
  };
  return (
    <>
      <div className="bg-white w-full h-[50px] p-4 flex justify-between items-center shadow-xl border-b-2 border-themeBlur">
        <div className="cursor-pointer" onClick={toFrontPage}>
          logo
        </div>
        <button className="flex items-center text-white px-2.5 py-1.5 rounded-md bg-themeGreen">
          <IoSettings className="mr-1" />
          <p className="text-xs font-bold">Setting</p>
        </button>
      </div>
    </>
  );
};
export default Headerbar;
