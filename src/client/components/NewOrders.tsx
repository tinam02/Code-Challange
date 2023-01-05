import { useEffect, useState } from "react";
import fetch from "cross-fetch";
import { AppCss } from "../App.css";
import { IOrder } from "../types";
import OrderCard from "./OrderCard";

const NewOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const getApi = async () => {
      const result = await fetch(`http://localhost:4000/orders/`);
      const resJson = await result.json();

      setOrders(resJson);
    };

    getApi();
  }, []);

  const markDone = async (refNumber: number) => {
    console.log(refNumber);
  };

  return (
    <>
      <h1>Pending orders</h1>

      <div className={AppCss.container}>
        {orders?.map((item: any) => {
          console.log(item);

          return (
            <OrderCard
              item={item}
              handleClick={(refNumber: number) => markDone(refNumber)}
            />
          );
        })}
      </div>
    </>
  );
};

export default NewOrders;
