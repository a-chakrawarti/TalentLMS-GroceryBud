import React, { useEffect, useState } from "react";
import "./App.css";
import BasketList from "./components/BasketList";
import InputForm from "./components/InputForm";
import Popup from "./components/Popup";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [basketList, setBasetList] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [updateItem, setUpdateItem] = useState(false);
  const [popupClass, setPopupClass] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Empty input, show error popup
    if (!inputValue) {
      setPopup(true);
      setPopupMessage("Please Enter Value");

      // Update the item
    } else if (inputValue && updateItem) {
      console.log("Item updated!");

      // Add the item
    } else {
      const newItem = { id: new Date().getTime(), value: inputValue };
      setBasetList([...basketList, newItem]);
      setInputValue("");
      setPopup(true);
      setPopupMessage("Item added to the List");
    }
    console.log("Submitted!");
  };

  const clearBasket = () => {
    setPopup(true);
    setPopupMessage("Empty List");
    setBasetList([]);
    console.log("Basket Cleared!");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPopup(false);
    }, 2000);

    return () => {
      clearInterval(timeout);
    };
  }, [popup]);

  const editItem = () => {
    console.log("Edit Item");
  };

  const deleteItem = (id) => {
    setPopup(true);
    setPopupMessage("Item Removed");
    const newItemList = basketList.filter((item) => {
      return id !== item.id;
    });
    console.log("NewItemList", newItemList);
    setBasetList([...newItemList]);
    console.log("Item Deleted");
  };

  return (
    <>
      <main className="flex-center">
        <section className="flex-center">
          {popup ? <Popup message={popupMessage} class={popupClass} /> : null}
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
            <button onClick={clearBasket}>Clear Items</button>
          ) : null}
        </section>
      </main>
    </>
  );
}

export default App;
