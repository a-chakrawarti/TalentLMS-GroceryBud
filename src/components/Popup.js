import React from "react";

const Popup = ({ message, classType }) => {
  return (
    <>
      <div className={classType}>{message}</div>
    </>
  );
};

export default Popup;
