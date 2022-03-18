import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "styled-components";
import { Delivery } from "../../modules/deliveries/types/deliveries";
import formatDate from "../../utils/formatDate";
import * as S from "./styles";

type Props = {
  item: Delivery;
  is_available_delivery: boolean;
  client_id?: string;
  handleAcceptDelivery: (delivery_id: string) => void;
  handleConfirmDelivery: (delivery_id: string) => void;
  confirm_delivery_is_loading?: boolean;
  accept_delivery_is_loading?: boolean;
};

function DeliveryCard({
  item,
  is_available_delivery,
  handleAcceptDelivery,
  client_id,
  handleConfirmDelivery,
  confirm_delivery_is_loading,
  accept_delivery_is_loading,
}: Props) {
  const theme = useTheme();

  return (
    <S.Container>
      <S.Column
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <S.ProductName>{item.item_name}</S.ProductName>
        {is_available_delivery && item.fk_id_deliveryman === null && (
          <TouchableOpacity onPress={() => handleAcceptDelivery(item.id)}>
            {accept_delivery_is_loading ? (
              <ActivityIndicator
                style={{
                  marginTop: moderateScale(10),
                }}
                size="small"
                color={theme.systemBlue}
              />
            ) : (
              <S.SubText
                style={{
                  fontSize: moderateScale(13),
                }}
              >
                Clique aqui para ser o entregador desse pedido
              </S.SubText>
            )}
          </TouchableOpacity>
        )}
        {client_id === item?.fk_id_deliveryman && !Boolean(item.end_at) && (
          <TouchableOpacity onPress={() => handleConfirmDelivery(item.id)}>
            {confirm_delivery_is_loading ? (
              <ActivityIndicator
                style={{
                  marginTop: moderateScale(10),
                }}
                size="small"
                color={theme.systemBlue}
              />
            ) : (
              <S.SubText>Clique aqui para confirmar a entrega</S.SubText>
            )}
          </TouchableOpacity>
        )}
      </S.Column>
      <S.Column>
        <S.Badge>
          <S.CreateAt>{formatDate(new Date(item.created_at))}</S.CreateAt>
        </S.Badge>
        {Boolean(item.end_at) ? (
          <S.Badge
            style={{
              backgroundColor: theme.systemGreen,
              marginTop: moderateScale(5),
            }}
          >
            <S.CreateAt>Entregue</S.CreateAt>
          </S.Badge>
        ) : is_available_delivery ? (
          <S.Badge
            style={{
              backgroundColor: theme.systemBrown,
              marginTop: moderateScale(5),
            }}
          >
            <S.CreateAt>Aguardando entregador</S.CreateAt>
          </S.Badge>
        ) : (
          <S.Badge
            style={{
              backgroundColor: theme.systemBrown,
              marginTop: moderateScale(5),
            }}
          >
            <S.CreateAt>Em processo de entrega</S.CreateAt>
          </S.Badge>
        )}
      </S.Column>
    </S.Container>
  );
}

export default DeliveryCard;
