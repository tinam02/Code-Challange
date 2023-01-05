import { useEffect, useState } from "react";
import fetch from "cross-fetch";
import { AppCss } from "../App.css";
import { IOrder } from "../types";
import OrderCard from "./OrderCard";

const NewOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [sortDate, setSortDate] = useState(false);

  useEffect(() => {
    const getApi = async () => {
      const result = await fetch(`http://localhost:4000/orders/`);
      const resJson = await result.json();
      if (sortDate) {
        resJson.sort((a: any, b: any) => a.date - b.date);
      }
      setOrders(resJson);
    };

    getApi();
  }, [sortDate]);

  const markDone = async (refNumber: number) => {
    console.log(refNumber);
    const res = await fetch(`http://localhost:4000/orders/${refNumber}`, {
      method: "PUT",
    });
    const resJson = await res.json();
    console.log(resJson);

    const newArr = orders?.filter((item: any) => {
      return item.refNumber !== refNumber;
    });
    setOrders(newArr);
  };

  return (
    <div>
      <h1>Pending orders</h1>
      <button onClick={() => setSortDate(!sortDate)}>Sort by date</button>

      <div className={AppCss.container}>
        {orders?.map((item: any) => {
          return (
            <div key={`card-${item.refNumber}`}>
              <OrderCard
                item={item}
                handleClick={(refNumber: number) => markDone(refNumber)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewOrders;
