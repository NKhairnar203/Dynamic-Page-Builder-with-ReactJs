import React from "react";
import { useDraggable } from "@dnd-kit/core";

const Draggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id, // Unique ID for each draggable element
  });

  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    padding: "10px",
    border: "1px solid black",
    cursor: "grab",
    display: "inline-block",
  };

  return (
    <div className="rounded-lg p-3 border-2 border-dashed" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default Draggable;
