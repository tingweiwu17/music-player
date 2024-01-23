// import NewListModal from "../../components/Modal/NewListModal/NewListModal";
import { useState } from "react";

const Frontpage = () => {
  // const [listModal, setListModal] = useState(true);
  return (
    <>
      <div className="pt-[25y0px]">
        <div className="w-[400px] border-white border-2 bg-grayBg m-auto p-4">
          <h1 className="font-bold text-white text-title text-center border-b border-white pb-2">
            Title of Music Player
          </h1>
          <p className="text-center text-white p-3">
            Weave notes into the most beautiful canvas, letting the colors of
            music flutter.
          </p>
          <button className="border-white border-2 bg-white px-2 py-[6px] text-black font-bold">
            Get started
          </button>
        </div>
      </div>

      {/* <NewListModal isOpen={listModal}></NewListModal> */}
    </>
  );
};
export default Frontpage;