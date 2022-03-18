import { useContext } from "react";
import { DeliveryContext } from "../context/DeliveriesContext";

export function useDeliveries() {
  const context = useContext(DeliveryContext);

  return context;
}
