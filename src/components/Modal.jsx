import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef} from "react";
import Button from "./Button";

// to render this dialog box to other Dom structure -- thats why we used Portal
const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const dialog = useRef();

    // useImperativeHandle to expose the properties and the fucntion to other components
    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        }; 
    });

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
        {children}
        {/* this form to close the dialog box appeared */}
        <form method="dialog" className="mt-4 text-right">
            <Button>{buttonCaption}</Button>
        </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
