import React, { createContext, useContext, useState } from "react";

export const ToDoContext = createContext({
  name: "",
  description: "",
  due: "",
  done: false
});

export const useToDo = () => useContext(ToDoContext);

export function ToDoProvider({ children }) {
  const [toDo, setToDo] = useState();
  const [btnName, setBtnName] = useState();

  return (
    <ToDoContext.Provider value={{ toDo, setToDo, btnName, setBtnName }}>
      {children}
    </ToDoContext.Provider>
  )
}
