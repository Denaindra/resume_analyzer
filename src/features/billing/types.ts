export interface Plan {
  id: string;
  name: string;
  price: string;
  period: "month" | "year";
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Subscription {
  planId: string;
  status: "active" | "canceled" | "past_due";
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "failed";
}
