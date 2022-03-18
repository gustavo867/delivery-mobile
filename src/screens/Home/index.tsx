import { useState } from "react";
import { Alert, FlatList } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Button from "../../components/Button";
import DeliveryCard from "../../components/DeliveryCard";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { useAuth } from "../../modules/authentication/hooks/useAuth";
import { useDeliveries } from "../../modules/deliveries/hooks/useDelivery";
import { Ionicons } from "@expo/vector-icons";

import * as S from "./styles";

function Home() {
  const { client } = useAuth();
  const {
    deliveries,
    availableDeliveries,
    acceptDelivery,
    getAvailableDeliveries,
    getDeliveries,
    loadingProps,
    confirmDelivery,
    requestDeliveryProduct,
  } = useDeliveries();
  const [showRequestDelivery, setShowRequestDelivery] = useState(false);
  const [itemName, setItemName] = useState("");

  function handleRefresh() {
    getAvailableDeliveries();
    getDeliveries();
  }

  function handleRequestProduct() {
    if (!itemName) {
      Alert.alert("Por favor insira o nome do produto");

      return;
    }

    requestDeliveryProduct(itemName);

    setItemName("");
  }

  return (
    <S.Container>
      <Header />
      <S.TitleContainer>
        <S.Title>
          {client?.client_type === "client"
            ? `${
                deliveries.length === 1
                  ? deliveries.length + " Pedido"
                  : deliveries.length + " Pedidos"
              }`
            : `${
                deliveries.length === 1
                  ? deliveries.length + " Pedido para entrega"
                  : deliveries.length + " Pedidos para entrega"
              }`}
        </S.Title>
        {client?.client_type === "client" && (
          <S.AddIconContainer onPress={() => setShowRequestDelivery((s) => !s)}>
            <Ionicons
              name={showRequestDelivery ? "close" : "add-outline"}
              size={moderateScale(25)}
              color="#fff"
            />
          </S.AddIconContainer>
        )}
      </S.TitleContainer>

      {showRequestDelivery && client?.client_type === "client" && (
        <>
          <S.CenteredTitle>Pedir produto</S.CenteredTitle>
          <Input
            title="Nome do produto"
            placeholder="Pizza"
            value={itemName}
            onChangeText={setItemName}
          />
          <Button
            isLoading={loadingProps.requestDeliveryProduct}
            onPress={handleRequestProduct}
            text="Pedir"
            mt={moderateScale(15)}
          />
          <S.LargeHeightMargin />
        </>
      )}
      <FlatList
        style={{
          marginTop: moderateScale(10),
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(50),
        }}
        onRefresh={handleRefresh}
        refreshing={loadingProps.deliveries || loadingProps.availableDeliveries}
        data={deliveries}
        keyExtractor={(item, _) => item.id}
        renderItem={({ item }) => (
          <DeliveryCard
            handleConfirmDelivery={confirmDelivery}
            client_id={client?.id}
            handleAcceptDelivery={acceptDelivery}
            is_available_delivery={false}
            item={item}
          />
        )}
        listKey="deliveries"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <>
            {client?.client_type === "deliveryman" && (
              <>
                <S.CenteredTitle>
                  Pedidos disponíveis para entrega
                </S.CenteredTitle>
                <FlatList
                  style={{ flexGrow: 0 }}
                  data={availableDeliveries}
                  listKey="available-deliveries"
                  keyExtractor={(item, _) => item.id}
                  renderItem={({ item }) => (
                    <DeliveryCard
                      handleConfirmDelivery={confirmDelivery}
                      confirm_delivery_is_loading={loadingProps.confirmDelivery}
                      accept_delivery_is_loading={loadingProps.acceptDelivery}
                      client_id={client?.id}
                      handleAcceptDelivery={acceptDelivery}
                      is_available_delivery
                      item={item}
                    />
                  )}
                />
              </>
            )}
          </>
        )}
      />
    </S.Container>
  );
}

export default Home;
