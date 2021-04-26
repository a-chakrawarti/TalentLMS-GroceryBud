import React from "react";

const InputForm = ({ inputValue, handleChange, updateItem, handleSubmit }) => {
  return (
    <>
      <div className="form-container">
        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="e.g. eggs"
            value={inputValue}
            onChange={handleChange}
            className="input-text"
          />
          <button className="submit-btn" type="submit">
            {updateItem ? "Edit" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default InputForm;
