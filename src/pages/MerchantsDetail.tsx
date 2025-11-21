import { useLocation, useParams } from "react-router-dom";
import type { ApiResponseMerchantDetailRes, MerchantDetailRes } from "../types.ts";
import { useFetch } from "../api/useFetch.ts";

type LocationState = MerchantDetailRes | undefined;

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-sm uppercase tracking-wide text-slate-500">{label}</p>
    <p className="text-base font-medium text-slate-900">{value ?? "-"}</p>
  </div>
);

export function MerchantsDetail() {
  const { state } = useLocation();
  const { mchtCode } = useParams();
  const initialData = (state as LocationState) ?? null;
  const shouldFetch = !initialData && mchtCode ? `/merchants/details/${mchtCode}` : null;
  const { data, loading, error } = useFetch<ApiResponseMerchantDetailRes>(shouldFetch);
  const merchant = initialData ?? data?.data;

  if (!merchant && loading) return <p>가맹점 정보를 불러오는 중…</p>;
  if (!merchant && error) return <p>가맹점 정보를 불러오지 못했습니다.</p>;
  if (!merchant) return <p>가맹점 정보를 찾을 수 없습니다.</p>;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">{merchant.mchtName}</h2>
        <p className="text-md text-slate-600 mb-10">가맹점 코드: {merchant.mchtCode}</p>
        <div className="grid gap-4 grid-cols-2 mb-10">
          <InfoRow label="상태" value={merchant.status} />
          <InfoRow label="업종" value={merchant.bizType} />
          <InfoRow label="사업자 번호" value={merchant.bizNo} />
          <InfoRow label="연락처" value={merchant.phone} />
          <InfoRow label="이메일" value={merchant.email} />
          <InfoRow label="주소" value={merchant.address} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-600">
          <p>등록일: {new Date(merchant.registeredAt).toLocaleString()}</p>
          <p>수정일: {new Date(merchant.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </section>
  );
}