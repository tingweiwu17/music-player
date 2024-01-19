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
        <FormProvider>
          <div>
            <input />
            <textarea></textarea>
          </div>
        </FormProvider>
      </Modal>
    </>
  );
};
export default NewListModal;
