import React from "react";

const Popup = ({ message, classType }) => {
  return (
    <>
      <div className={`popup ${classType}`}>{message}</div>
    </>
  );
};

export default Popup;
