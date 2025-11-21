import type { ApiResponseListPaymentListRes, PaymentListRes } from "../types.ts";
import { Table, type TableColumn } from "../components/Table";
import { useFetch } from "../api/useFetch.ts";

const columns: TableColumn<PaymentListRes>[] = [
  { key: "paymentCode", header: "거래 ID" },
  { key: "mchtCode", header: "가맹점 코드" },
  { key: "amount", header: "금액(원)", align: "right" },
  { key: "currency", header: "통화" },
  { key: "payType", header: "결제수단" },
  { key: "status", header: "상태" },
  { key: "paymentAt", header: "결제일시" },
];

export function PaymentsList() {
  const { data, loading, error } = useFetch<ApiResponseListPaymentListRes>("/payments/list");

  if (loading) return <p>결제 내역을 불러오는 중…</p>;
  if (error) return <p>결제 내역을 불러오지 못했습니다.</p>;

  const payments = data?.data ?? [];

  return (
    <section>
      <Table data={payments} columns={columns} pageSize={10} />
    </section>
  );
}