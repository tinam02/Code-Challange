import { useState } from "react";
import FinishedOrders from "./components/FinishedOrders";

import NewOrders from "./components/NewOrders";

export const App = () => {
  const [showFinished, setShowFinished] = useState(false);
  return (
    <>
      <button onClick={() => setShowFinished(!showFinished)}>
        {showFinished ? "Show new orders" : "Show finished orders"}
      </button>
      {showFinished ? <FinishedOrders /> : <NewOrders />}
    </>
  );
};
