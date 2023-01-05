import { useEffect, useState } from "react";
import fetch from "cross-fetch";
import { AppCss } from "../App.css";
import { IOrder } from "../types";
import OrderCard from "./OrderCard";

const FinishedOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const getApi = async () => {
      const result = await fetch(`http://localhost:4000/orders/done`);
      const resJson = await result.json();

      setOrders(resJson);
    };

    getApi();
  }, []);

  return (
    <div>
      <h1>Finished orders</h1>

      <div className={AppCss.container}>
        {orders?.map((item: any) => {
          return (
            <div key={`card-${item.refNumber}`}>
              <OrderCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinishedOrders;
