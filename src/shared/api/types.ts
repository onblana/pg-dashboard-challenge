// 거래 내역
export interface ApiResponseListPaymentListRes {
  status: number;
  message: string;
  data: PaymentListRes[];
}

export interface PaymentListRes {
  paymentCode: string;
  mchtCode: string;
  amount: string; // spec이 string으로 되어 있음
  currency: string;
  payType: "ONLINE" | "DEVICE" | "MOBILE" | "VACT" | "BILLING";
  status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
  paymentAt: string; // format: date-time
}

// 가맹점 목록
export interface ApiResponseListMerchantListRes {
  status: number;
  message: string;
  data: MerchantListRes[];
}

export interface MerchantListRes {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
}

// 가맹점 상세 (전체 리스트)
export interface ApiResponseListMerchantDetailRes {
  status: number;
  message: string;
  data: MerchantDetailRes[];
}

export interface MerchantDetailRes {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string; // date-time
  updatedAt: string; // date-time
}

// 가맹점 상세 (단건)
export interface ApiResponseMerchantDetailRes {
  status: number;
  message: string;
  data: MerchantDetailRes;
}

// 공통 코드 - 상태
export interface ApiResponseListStatusRes {
  status: number;
  message: string;
  data: StatusRes[];
}

export interface StatusRes {
  code: string;
  description: string;
}

// 공통 코드 - 결제 수단
export interface ApiResponseListPayTypeRes {
  status: number;
  message: string;
  data: PayTypeRes[];
}

export interface PayTypeRes {
  type: string;
  description: string;
}