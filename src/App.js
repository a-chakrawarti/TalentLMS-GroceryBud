import React, { useEffect, useState } from "react";
import "./App.css";
import BasketList from "./components/BasketList";
import InputForm from "./components/InputForm";
import Popup from "./components/Popup";

function App() {
  const getLocalStorage = () => {
    const localBasketList = localStorage.getItem("localBasketList");
    return localBasketList ? JSON.parse(localBasketList) : [];
  };

  const initialValue = getLocalStorage();

  const [inputValue, setInputValue] = useState("");
  const [basketList, setBasetList] = useState(initialValue);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [updateItem, setUpdateItem] = useState(false);
  const [popupClass, setPopupClass] = useState("");
  const [editID, setEditID] = useState(null);

  // Update the popup message
  const showPopup = (msg, type) => {
    setPopup(true);
    setPopupMessage(msg);
    setPopupClass(type);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Empty input, show error popup
    if (!inputValue) {
      showPopup("Please Enter Value", "error");

      // Update the item
    } else if (inputValue && updateItem) {
      // console.log("Item updated!");
      const newBasketList = basketList.map((item) => {
        if (item.id === editID) {
          return { ...item, value: inputValue };
        }
        return item;
      });

      setBasetList(newBasketList);
      setInputValue("");
      setEditID(null);
      setUpdateItem(false);
      showPopup("Value Changed", "success");

      // Add the item
    } else {
      const newItem = { id: new Date().getTime(), value: inputValue };
      setBasetList([...basketList, newItem]);
      setInputValue("");
      showPopup("Item added to the List", "success");
    }
    console.log("Submitted!");
  };

  const clearBasket = () => {
    showPopup("Empty List", "error");
    setBasetList([]);
    console.log("Basket Cleared!");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPopup(false);
    }, 3000);

    return () => {
      clearInterval(timeout);
    };
  }, [popup, basketList]);

  const editItem = (id) => {
    console.log("Edit Item");
    const updateItem = basketList.find((item) => id === item.id);
    setUpdateItem(true);
    setEditID(id);
    setInputValue(updateItem.value);
  };

  const deleteItem = (id) => {
    showPopup("Item Removed", "error");
    const newItemList = basketList.filter((item) => {
      return id !== item.id;
    });
    console.log("NewItemList", newItemList);
    setBasetList([...newItemList]);
    console.log("Item Deleted");
  };

  // Retain data on refresh

  useEffect(() => {
    localStorage.setItem("localBasketList", JSON.stringify(basketList));
  }, [basketList]);

  return (
    <>
      <main className="flex-center">
        <section className="flex-center">
          {popup ? (
            <Popup message={popupMessage} classType={popupClass} />
          ) : null}
          <h3>Grocery Bud</h3>
          <InputForm
            inputValue={inputValue}
            handleChange={handleChange}
            updateItem={updateItem}
            handleSubmit={handleSubmit}
          />
          <BasketList
            items={basketList}
            editItem={editItem}
            deleteItem={deleteItem}
          />
          {basketList.length ? (
            <button className="clear-items" onClick={clearBasket}>
              Clear Items
            </button>
          ) : null}
        </section>
      </main>
    </>
  );
}

export default App;
