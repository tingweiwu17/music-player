import NewListModal from "../../components/Modal/NewListModal/NewListModal";
const Frontpage = () => {
  return (
    <>
      <div className="w-[400px] mt-[200px] border-white border-2 bg-grayBg m-auto p-4">
        <h1 className="font-bold text-white text-title text-center border-b border-white pb-2">
          Title of Music Player
        </h1>
        <p className="text-center text-white">
          Weave notes into the most beautiful canvas, letting the colors of
          music flutter.
        </p>
        <button className="border-white border-2 px-2 w-[110px] py-[6px] text-white font-bold">
          Get started
        </button>
      </div>
      <NewListModal isOpen={true}></NewListModal>
    </>
  );
};
export default Frontpage();
