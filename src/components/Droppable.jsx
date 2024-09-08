import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = ({
  id,
  children,
  data,
  saveLayout,
  loadLayout,
  publishPage,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const style = {
    backgroundColor: isOver ? "lightblue" : "lightgray",
  };

  return (
    <div>
      <div className="w-full h-14  flex justify-center gap-4 items-center">
        <input
          type="text"
          className="w-[280px] px-2 py-1"
          placeholder="Enter Layout Name"
        />
        <button
          onClick={saveLayout}
          className="bg-red-500 px-2 py-1 text-white font-semibold"
        >
          Save Layout
        </button>
        <button
          onClick={loadLayout}
          className="bg-red-500 px-2 py-1 text-white font-semibold"
        >
          Load Layout
        </button>
        <button
          onClick={publishPage}
          className="bg-red-500 px-2 py-1 text-white font-semibold"
        >
          Publish
        </button>

        <button
          onClick={data}
          className="bg-green-600 text-white px-3 py-1"
          type="submit"
        >
          Remove All
        </button>
      </div>
      <div
        ref={setNodeRef}
        style={style}
        className="p-6 w-[750px] border-2 border-dashed border-green-200 min-h-[300px] flex flex-col"
      >
        {children}
      </div>
    </div>
  );
};

export default Droppable;
