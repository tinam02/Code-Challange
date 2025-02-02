import { AppCss } from "../App.css";
import { ICard, IOrder } from "../types";

const OrderCard = ({
  item,
  handleClick,
}: {
  item: IOrder;
  handleClick?: (refNumber: number) => void;
}) => {
  const calculateTotalPrice = (card: ICard[]) => {
    let total = 0;
    card.forEach((food: any) => {
      total += food.price;
      food.options?.forEach((option: any) => {
        total += option.price;
      });
    });

    return total.toFixed(2);
  };

  return (
    <div className={AppCss.card}>
      <h4>
        Order {item.refNumber}, total: ${calculateTotalPrice(item.card)}
      </h4>
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
                  + {option.name} ${option.price}
                </div>
              );
            })}
          </div>
        );
      })}
      <p>{new Date(item.date).toLocaleString()}</p>
      {handleClick && (
        <button
          className={AppCss.btn}
          onClick={() => handleClick(item.refNumber)}
        >
          Mark as done
        </button>
      )}
    </div>
  );
};

export default OrderCard;
