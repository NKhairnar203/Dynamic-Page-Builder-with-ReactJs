import React, { useState } from "react";

const Label = () => {
  const [model, setModel] = useState(false);

  const [inputValue, setInputValue] = useState("Label");

  return (
    <div className="h-10 -mb-5">
      <div className=" absolute" onClick={() => setModel(!model)}>
        <label htmlFor="name">{inputValue}</label>
      </div>
      {model && (
        <div className="relative bottom-4 right-1 w-[234px] flex gap-1 h-auto  border-2 border-black">
          <input
            type="text"
            className="border-1 border-green-600"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-green-600 px-2 text-white"
            onClick={() => setModel(!model)}
          >
            edit
          </button>
          
        </div>
      )}
    </div>
  );
};

export default Label;
