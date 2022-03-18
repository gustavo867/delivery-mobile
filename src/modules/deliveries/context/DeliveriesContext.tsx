import { createContext, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { api } from "../../../services/api";
import { useAuth } from "../../authentication/hooks/useAuth";
import { DeliveriesResponse, Delivery } from "../types/deliveries";

export type IDeliveryContext = ReturnType<typeof useDeliveriesValuesProvider>;

export const DeliveryContext = createContext<IDeliveryContext>(
  {} as unknown as IDeliveryContext
);

function useDeliveriesValuesProvider() {
  const { client } = useAuth();
  const [loadingProps, setLoadingProps] = useState({
    deliveries: false,
    availableDeliveries: false,
    acceptDelivery: false,
    confirmDelivery: false,
    requestDeliveryProduct: false,
  });
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [availableDeliveries, setAvailableDeliveries] = useState<Delivery[]>(
    []
  );

  const getDeliveries = useCallback(async () => {
    setLoadingProps((s) => ({
      ...s,
      deliveries: true,
    }));

    try {
      const res = await api.get<DeliveriesResponse[]>(
        `/${client?.client_type}/deliveries`
      );

      setDeliveries(res.data[0]?.deliveries);

      setLoadingProps((s) => ({
        ...s,
        deliveries: false,
      }));
    } catch (err: any) {
      setLoadingProps((s) => ({
        ...s,
        deliveries: false,
      }));

      Alert.alert(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Erro ao buscar pedidos"
      );
    }
  }, []);

  const getAvailableDeliveries = useCallback(async () => {
    if (client?.client_type === "deliveryman") {
      setLoadingProps((s) => ({
        ...s,
        deliveries: true,
      }));

      try {
        const res = await api.get<Delivery[]>(`/delivery/available`);

        setAvailableDeliveries(res.data);

        setLoadingProps((s) => ({
          ...s,
          deliveries: false,
        }));
      } catch (err: any) {
        setLoadingProps((s) => ({
          ...s,
          deliveries: false,
        }));

        Alert.alert(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Erro ao buscar pedido disponíveis"
        );
      }
    }
  }, []);

  const acceptDelivery = useCallback(async (delivery_id: string) => {
    if (client?.client_type === "deliveryman") {
      setLoadingProps((s) => ({
        ...s,
        acceptDelivery: true,
      }));

      try {
        const res = await api.put<Delivery>(
          `/delivery/updateDeliveryman/${delivery_id}`
        );

        if (res.data?.id) {
          setDeliveries((s) => [res.data, ...s]);
          setAvailableDeliveries((s) =>
            s.filter((delivery) => delivery.id !== delivery_id)
          );

          setLoadingProps((s) => ({
            ...s,
            acceptDelivery: false,
          }));
        }

        Alert.alert("Pedido aceita com sucesso");
      } catch (err: any) {
        setLoadingProps((s) => ({
          ...s,
          acceptDelivery: false,
        }));

        console.log("Erro", err.request);
        Alert.alert(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Erro ao aceitar pedido"
        );
      }
    }
  }, []);

  const confirmDelivery = useCallback(
    async (delivery_id: string) => {
      if (client?.client_type === "deliveryman") {
        setLoadingProps((s) => ({
          ...s,
          confirmDelivery: true,
        }));

        const deliveryToUpdate = deliveries.find(
          (delivery) => delivery.id === delivery_id
        );

        if (!deliveryToUpdate) {
          Alert.alert("Entrega não encontrada");

          return;
        }

        try {
          const res = await api.put(`/delivery/updateEndDate/${delivery_id}`);

          if (res.status === 200) {
            setDeliveries((s) =>
              s.map((delivery) =>
                delivery?.id === delivery_id
                  ? {
                      ...delivery,
                      end_at: new Date(),
                    }
                  : delivery
              )
            );

            Alert.alert("Entrega atualizada com sucesso");
          }

          setLoadingProps((s) => ({
            ...s,
            confirmDelivery: false,
          }));
        } catch (err: any) {
          setLoadingProps((s) => ({
            ...s,
            confirmDelivery: false,
          }));

          Alert.alert(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : "Falha ao atualizar o status da entrega"
          );
        }
      }
    },
    [deliveries]
  );

  const requestDeliveryProduct = useCallback(async (item_name: string) => {
    if (client?.client_type === "client") {
      setLoadingProps((s) => ({
        ...s,
        requestDeliveryProduct: true,
      }));

      try {
        const res = await api.post<Delivery>("/delivery", {
          itemName: item_name,
        });

        if (res.data.id) {
          setDeliveries((s) => [res.data, ...s]);
        }

        setLoadingProps((s) => ({
          ...s,
          requestDeliveryProduct: false,
        }));
      } catch (err: any) {
        setLoadingProps((s) => ({
          ...s,
          requestDeliveryProduct: false,
        }));

        Alert.alert(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Falha ao criar produto."
        );
      }
    }
  }, []);

  useEffect(() => {
    getDeliveries();
    getAvailableDeliveries();
  }, []);

  return {
    deliveries,
    availableDeliveries,
    acceptDelivery,
    getDeliveries,
    getAvailableDeliveries,
    loadingProps,
    confirmDelivery,
    requestDeliveryProduct,
  };
}

export const DeliveryProvider: React.FC = ({ children }) => {
  const values = useDeliveriesValuesProvider();

  return (
    <DeliveryContext.Provider value={values}>
      {children}
    </DeliveryContext.Provider>
  );
};
