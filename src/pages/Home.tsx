import { MerchantBizTypeChart } from "../components/MerchantBizTypeChart.tsx";
import { Card } from "../components/Card.tsx";
import { PaymentAmountChart } from "../components/PaymentAmountChart.tsx";
import { useFetch } from "../api/useFetch.ts";
import type {
  ApiResponseListMerchantListRes,
  ApiResponseListPaymentListRes,
} from "../types.ts";

export const Home = () => {
  const {
    data: merchantRes,
    loading: merchantLoading,
    error: merchantError,
  } = useFetch<ApiResponseListMerchantListRes>("/merchants/list");
  const {
    data: paymentRes,
    loading: paymentLoading,
    error: paymentError,
  } = useFetch<ApiResponseListPaymentListRes>("/payments/list");

  if (merchantLoading || paymentLoading) return <p>대시보드 데이터를 불러오는 중…</p>;
  if (merchantError || paymentError) return <p>대시보드 데이터를 불러오지 못했습니다.</p>;

  const merchants = merchantRes?.data ?? [];
  const payments = paymentRes?.data ?? [];

  return (
    <section>
      <div className="grid grid-cols-3 mb-4">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <PaymentAmountChart payments={payments} />
        <MerchantBizTypeChart merchants={merchants} />
      </div>
    </section>
  )
}
