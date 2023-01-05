import { useEffect, useState } from "react";
import { AppCss } from "./App.css";
import fetch from "cross-fetch";

export const App = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const getApi = async () => {
      const result = await fetch("http://localhost:4000/orders/");
      const resJson = await result.json();
      //@ts-ignore
      setOrders(resJson);
    };

    getApi();
  }, []);

  const markDone = async (refNumber: number) => {
    console.log(refNumber);
  };

  return (
    <>
      <div className={AppCss.container}>
        {orders?.map((item: any) => {
          console.log(item);

          return (
            <div key={`order${item._id}`} className={AppCss.card}>
              <h4>Order {item.refNumber}</h4>
              {item.card?.map((food: any, i: any) => {
                return (
                  <div key={`card-${item.refNumber}-${food.name}-${i}`}>
                    {food.name} ${food.price}
                  </div>
                );
              })}

              <button
                className={AppCss.btn}
                onClick={() => markDone(item.refNumber)}
              >
                Mark as done
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
