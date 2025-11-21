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
  const merchantCount = merchants.length;
  const totalKrwAmount = payments.reduce((sum, { amount, currency }) => {
    if (currency !== "KRW") return sum;
    const numericAmount = Number(amount);
    return sum + (Number.isNaN(numericAmount) ? 0 : numericAmount);
  }, 0);
  const totalPayments = payments.length;
  const successCount = payments.filter(({ status }) => status === "SUCCESS").length;
  const successRate =
    totalPayments > 0 ? (successCount / totalPayments) * 100 : 0;

  return (
    <section>
      <div className="grid grid-cols-3 mb-2 gap-2">
        <Card>
          <h3 className="text-sm text-slate-500 mb-1">총 가맹점 수</h3>
          <p className="text-2xl font-bold">{merchantCount.toLocaleString()}개</p>
        </Card>
        <Card>
          <h3 className="text-sm text-slate-500 mb-1">총 결제 금액 (KRW)</h3>
          <p className="text-2xl font-bold">{totalKrwAmount.toLocaleString()}원</p>
        </Card>
        <Card>
          <h3 className="text-sm text-slate-500 mb-1">결제 성공률</h3>
          <p className="text-2xl font-bold">{successRate.toFixed(1)}%</p>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <PaymentAmountChart payments={payments} />
        <MerchantBizTypeChart merchants={merchants} />
      </div>
    </section>
  )
}