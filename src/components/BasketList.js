import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const BasketList = ({ items, deleteItem, editItem }) => {
  return (
    <>
      <div className="item-container">
        {items.map((item) => {
          const { id, value } = item;
          return (
            <div key={id} className="item">
              <p>{value}</p>
              <div className="btn-container">
                <button onClick={() => editItem(id)}>
                  <FaEdit />
                </button>
                <button onClick={() => deleteItem(id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BasketList;
