import React, { useState } from "react";

const Input = () => {
  const [model, setModel] = useState(false);

  return (
    <div className="h-10 w-auto">
      <div className=" absolute" onClick={() => setModel(!model)}>
        <input type="text" id="text" name="text" />
      </div>
    </div>
  );
};

export default Input;
