import Modal from "react-modal";
import { useForm, FormProvider } from "react-hook-form";
import "./NewListModal.scss";

const NewListModal = ({ isOpen, close }) => {
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

  const onSubmit = () => {};
  return (
    <>
      <Modal ariaHideApp={false} style={customModalStyle} isOpen={isOpen}>
        <FormProvider {...methods}>
          <form
            className="bg-white rounded-xl m-auto flex flex-col p-6"
            onSubmit={methods.handleSubmit(onSubmit())}
          >
            <h3 className="border-b text-center border-themeGreen pb-2 font-bold text-themeGreen">
              Add Playlist
            </h3>
            <input
              className="bg-lightGray mt-4 px-2.5 py-2 rounded-xl text-xs w-[230px]"
              placeholder="Playlist name"
              {...methods.register("playlist-title", { required: true })}
            />

            <textarea className="bg-lightGray mt-2 px-2.5 py-2 rounded-xl text-xs" />
            <div className="flex justify-between mt-4">
              <button
                className="flex items-center text-white px-2.5 py-1.5 rounded-xl bg-themeGreen hover:bg-white hover:text-themeGreen"
                onClick={close}
                type="button"
              >
                Cancel
              </button>
              <button
                className="flex items-center text-themeGreen px-2.5 py-1.5 rounded-xl bg-white border-[1px] border-themeGreen hover:text-white hover:bg-themeGreen"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
export default NewListModal;
