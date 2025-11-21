// src/contexts/CommonCodeContext.tsx
import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import { apiClient } from "../api/apiClient"; // 네가 쓰는 axios 인스턴스 기준으로 수정

interface PaymentStatusCode {
  code: string;
  description: string;
}

interface PaymentTypeCode {
  type: string;
  description: string;
}

interface MerchantStatusCode {
  code: string;
  description: string;
}

interface CommonCodeState {
  paymentStatuses: PaymentStatusCode[];
  paymentTypes: PaymentTypeCode[];
  merchantStatuses: MerchantStatusCode[];
  loading: boolean;
  error: unknown | null;
}

export const useCommonCodes = () => {
  const ctx = useContext(CommonCodeContext);
  if (!ctx) {
    throw new Error("useCommonCodes는 CommonCodeProvider 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
};

const CommonCodeContext = createContext<CommonCodeState | null>(null);

export const CommonCodeProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CommonCodeState>({
    paymentStatuses: [],
    paymentTypes: [],
    merchantStatuses: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const [paymentStatusRes, paymentTypeRes, merchantStatusRes] =
          await Promise.all([
            apiClient.get("/common/payment-status/all"),
            apiClient.get("/common/payment-type/all"),
            apiClient.get("/common/mcht-status/all"),
          ]);

        setState({
          paymentStatuses: paymentStatusRes.data.data,
          paymentTypes: paymentTypeRes.data.data,
          merchantStatuses: merchantStatusRes.data.data,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: err,
        }));
      }
    };

    fetchCodes();
  }, []);

  return (
    <CommonCodeContext.Provider value={state}>
      {children}
    </CommonCodeContext.Provider>
  );
};