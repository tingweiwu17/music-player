import Headerbar from "../../components/Object/Headerbar";
import SideBar from "../../components/Object/Sidebar";
import Footer from "../../components/Object/Footer";
import { CiSearch } from "react-icons/ci";
const Searching = () => {
  return (
    <>
      <Headerbar />
      <SideBar>
        <div className="p-4">
          <input
            className="p-2 ml-8  indent-3 text-sm  w-[300px] h-8 border-2 rounded-3xl"
            placeholder="Search..."
          />
          <CiSearch />
        </div>
      </SideBar>
      <Footer />
    </>
  );
};
export default Searching;
