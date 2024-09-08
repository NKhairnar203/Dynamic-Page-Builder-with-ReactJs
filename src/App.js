import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./components/Draggable";
import Droppable from "./components/Droppable";
import Input from "./components/Input";
import Label from "./components/Label";
import Checkbox from "./components/CheckBox";

import { initializeApp} from "firebase/app";
import {

  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {

} from "firebase/storage";

const App = () => {
  const [formElements, setFormElements] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === "droppable") {
      setFormElements((prev) => [...prev, active.id]);
    }
  };

  const renderFormElement = (id) => {
    switch (id) {
      case "input-text":
        return <Input />;
      case "label":
        return <Label />;
      case "checkbox":
        return <Checkbox />;
      case "button":
        return (
          <button className="bg-green-600 text-white px-3 py-1" type="submit">
            Submit
          </button>
        );

      default:
        return null;
    }
  };
  function cleanData() {
    return setFormElements([]);
  }

    const firebaseConfig = {
      apiKey: "AIzaSyByL1V6BJ8nIHOgfwIfIkRx0TEmxwHOEf4",
      authDomain: "drag-and-drop-design.firebaseapp.com",
      databaseURL: "https://drag-and-drop-design-default-rtdb.firebaseio.com",
      projectId: "drag-and-drop-design",
      storageBucket: "drag-and-drop-design.appspot.com",

      measurementId: "G-PC3HT02RCF",
      appId: "1:962235075098:web:c9f768d38fdb42696d5fa3",
    };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const saveLayout = async () => {
    try {
      // Wrap the array inside an object with a key, e.g., 'layoutData'
      await setDoc(doc(db, "layouts", "layout1"), { layoutData: formElements });
      alert("Layout saved successfully!");
    } catch (e) {
      console.error("Error saving layout: ", e);
    }
  };

  const loadLayout = async () => {
    const docRef = doc(db, "layouts/", "layout1");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Access the layout array via the key 'layoutData'
      setFormElements(docSnap.data().formElements);
    } else {
      console.log("No such document!");
    }
  };

  const publishPage = () => {
    const newWindow = window.open();
    newWindow.document.write("<html><body>");
    formElements.forEach((control) => {
      newWindow.document.write(`<div>${control}</div>`);
    });
    newWindow.document.write("</body></html>");
    newWindow.document.close();
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-screen h-screen bg-slate-400 flex">
        <div className="w-96 px-10 mt-4">
          <h2 className="font-bold text-center my-2">Elements</h2>
          <div className="flex flex-col max-w-screen-xl px-3 text-center gap-3">
            <Draggable id="label">Label</Draggable>
            <Draggable id="input-text">Input</Draggable>
            <Draggable id="checkbox">Checkbox</Draggable>
            <Draggable id="button">Button</Draggable>
          </div>
        </div>
        <Droppable
          saveLayout={saveLayout}
          loadLayout={loadLayout}
          publishPage={publishPage}
          data={cleanData}
          id="droppable"
        >
          <div className="max-w-screen-lg ">
            {formElements.length === 0 ? (
              <h2 className="text-center font-bold">Drop Here to Build Form</h2>
            ) : (
              formElements.map((id, index) => (
                <div
                  key={index}
                  className="w-full"
                  style={{ marginBottom: "10px" }}
                >
                  {renderFormElement(id)}
                </div>
              ))
            )}
          </div>
        </Droppable>
      </div>
    </DndContext>
  );
};

export default App;
