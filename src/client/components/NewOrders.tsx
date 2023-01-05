import { useEffect, useState } from "react";
import fetch from "cross-fetch";
import { AppCss } from "../App.css";

const NewOrders = () => {
  const [orders, setOrders] = useState([]);

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
            <div key={`order${item._id}`} className={AppCss.card}>
              <h4>Order {item.refNumber}</h4>
              {item.card?.map((food: any, i: any) => {
                return (
                  <div key={`card-${item.refNumber}-${food.name}-${i}`}>
                    {food.name} ${food.price}
                    {food.options?.map((option: any, j: any) => {
                      return (
                        <div
                          key={`option-${item.refNumber}-${option.name}-${j}`}
                          className={AppCss.secondaryText}
                        >
                          - {option.name} ${option.price}
                        </div>
                      );
                    })}
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

export default NewOrders;
