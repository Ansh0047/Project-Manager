import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

// onAdd prop function is to add the new project input by the user and this takes object as the parameter 
export default function NewProject({onAdd , onCancel}) {
  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    // now we user has not input any value then error msg will be displayed
    if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === ''){
      // show error modal
      modal.current.open();
      return;
    }

    // when we click on the save button using the ref we can acces the input on every keystoke
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate
    });
  }

  return (
    <>
    {/* this modal component will be shown only when showModal function is called */}
    <Modal ref={modal} buttonCaption="Okay">
      <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input 🫣</h2>
      <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
      <p className="text-stone-600 mb-4">Please make sure that you provide a valid value for every input field.</p>
    </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button 
              className="text-stone-800 hover:text-stone-950" 
              onClick={onCancel}
            >Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover-bg-stone-950"
              onClick={handleSave}
            >Save
            </button>
          </li>
        </menu>
        <div>
          {/* using useRef hook to get the input on every keystroke*/}
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" textarea={true} />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}
