import { useEffect, useState } from "react";
import { AppCss } from "./App.css";
import fetch from "cross-fetch";

export const App = () => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const getApi = async () => {
            const result = await fetch("http://localhost:4000/orders/");
            const resJson = await result.json();
            //@ts-ignore
            setOrders(resJson);
        };

        getApi();
    }, []);

    return (
        <div className={AppCss.container}>
            {
                //@ts-ignore
                orders?.map((item: any) => {
                    console.log(item);

                    return <div key={`order${item._id}`}>{item.refNumber}</div>;
                })
            }
        </div>
    );
};
