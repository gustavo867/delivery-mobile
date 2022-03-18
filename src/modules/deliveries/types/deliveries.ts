export interface Delivery {
  id: string;
  fk_id_client: string;
  fk_id_deliveryman: string | null;
  item_name: string;
  created_at: Date;
  end_at: Date | null;
}

export interface DeliveriesResponse {
  deliveries: Delivery[];
  id: string;
  username: string;
}
