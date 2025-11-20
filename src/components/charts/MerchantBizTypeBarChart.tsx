import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { MerchantListRes } from "../../types.ts";

interface Props {
  merchants: MerchantListRes[];
}

const buildBizTypeCountData = (merchants: MerchantListRes[]) => {
  const map = new Map<string, number>();

  merchants.forEach(m => {
    const key = m.bizType;
    map.set(key, (map.get(key) ?? 0) + 1);
  });

  // Recharts 사용가능 데이터타입으로 변환
  return Array.from(map.entries()).map(([bizType, count]) => ({
    bizType,
    count,
  }));
}

export const MerchantBizTypeBarChart = ({ merchants }: Props) => {
  const data = useMemo(() => buildBizTypeCountData(merchants), [merchants]);

  return (
    <div className="w-full h-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-slate-600">
        업종별 가맹점 수
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="bizType" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}