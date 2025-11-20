import type {ApiResponseListMerchantListRes} from "../types.ts";
import { MerchantBizTypeBarChart } from "../components/MerchantBizTypeBarChart";
import {useFetch} from "../api/useFetch.ts";

export const Home = () => {
  const { data, loading, error } = useFetch<ApiResponseListMerchantListRes>("/merchants/list");

  if (loading) return <p>불러오는 중…</p>;
  if (error) return <p>에러가 발생했습니다.</p>;

  const merchants = data?.data ?? [];

  return (
    <section>
      <MerchantBizTypeBarChart merchants={merchants} />
    </section>
  )
}