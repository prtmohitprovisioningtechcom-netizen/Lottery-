export type PrizeRank =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13;

export interface Winner {
  _id?: string;
  name: string;
  mobile: string;
  position: PrizeRank | number;
  ticketNumber: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
}

export interface PrizeTier {
  rank: PrizeRank;
  label: string;
  amount: string;
  icon: string;
  ticketCount: number;
  headerClass: string;
}

export interface CheckResultResponse {
  success: boolean;
  message?: string;
  winner?: Winner;
  prizeTickets?: Record<number, string[]>;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  admin?: { id: string; name: string; email: string };
}
