import Modal from "react-modal";
import { useForm, FormProvider } from "react-hook-form";

const NewListModal = ({ isOpen }) => {
  const customModalStyle = {
    overlay: {
      backgroundColor: "transparent",
      zIndex: "2",
    },
    content: {
      height: "100vh",
      width: "100%",
      backgroundColor: "#0000004d",
      top: "0",
      bottom: "0",
      left: "0",
      paddingBottom: "0",
      padding: "0",
      display: "flex",
      position: "fixed",
    },
  };
  const methods = useForm();
  return (
    <>
      <Modal ariaHideApp={false} style={customModalStyle} isOpen={isOpen}>
        <FormProvider {...methods}>
          <form
            className="bg-white rounded-md m-auto flex flex-col p-4 "
            onSubmit={methods.handleSubmit()}
          >
            <h3 className="border-b text-center border-black pb-2">
              Add Playlist
            </h3>
            <input
              className="bg-black mt-2 py-1 px-2 rounded"
              placeholder="Playlist name"
              {...methods.register("playlist-title", { required: true })}
            />

            <textarea className="bg-black mt-2 py-1 px-2 rounded" />
            <div className="flex justify-between">
              <button>Cancel</button>
              <button>Add</button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
export default NewListModal;
