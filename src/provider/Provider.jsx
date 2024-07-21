import { useState } from "react";
import { TaskContext } from "../contexts";

const Provider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  return (
    <TaskContext.Provider value={{ open, setOpen, data, setData }}>
      {children}
    </TaskContext.Provider>
  );
};

export default Provider;
