import React from "react";

const InputForm = ({ inputValue, handleChange, updateItem, handleSubmit }) => {
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="e.g. eggs"
            value={inputValue}
            onChange={handleChange}
          />
          <button type="submit">{updateItem ? "Edit" : "Submit"}</button>
        </form>
      </div>
    </>
  );
};

export default InputForm;
