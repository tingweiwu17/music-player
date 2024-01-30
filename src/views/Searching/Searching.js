import Headerbar from "../../components/Object/Headerbar";
import SideBar from "../../components/Object/Sidebar";
import Footer from "../../components/Object/Footer";
import { CiSearch } from "react-icons/ci";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";

const Searching = () => {
  const methods = useForm();

  const getSearch = () => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: "AIzaSyCujisGM1ePBvGwD5waTQ1p9fSk8tcN8VI",
          maxResult: 10,
          part: "id,snippet",
          q: "Heize",
          type: "video",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {});
  };

  return (
    <>
      <Headerbar />
      <SideBar>
        <div className="p-4">
          <FormProvider {...methods}>
            <form
              className="flex items-center"
              onSubmit={methods.handleSubmit(getSearch)}
            >
              <input
                className="p-2 ml-8  indent-3 text-sm  w-[300px] h-8 border-2 rounded-3xl"
                placeholder="Search..."
                {...methods.register("search-word", { required: true })}
              />
              <CiSearch
                className="text-white w-6 h-6 ml-2 cursor-pointer"
                type="submit"
              />
            </form>
          </FormProvider>
        </div>
      </SideBar>
      <Footer />
    </>
  );
};
export default Searching;
