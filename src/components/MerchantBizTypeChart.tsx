import { useMemo } from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell} from "recharts";
import type { MerchantListRes } from "../types.ts";
import {Card} from "./Card.tsx";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#3B82F6", "#F59E0B", "#10B981", "#14B8A6"];

const buildBizTypeCountData = (merchants: MerchantListRes[]) => {

  const BIZ_TYPE_LABEL: Record<string, string> = {
    CAFE: "카페",
    SHOP: "쇼핑",
    MART: "마트",
    APP: "앱",
    TRAVEL: "여행",
    EDU: "교육",
    TEST: "테스트",
  };

  const map = new Map<string, number>();

  merchants.forEach(m => {
    const key = m.bizType;
    map.set(key, (map.get(key) ?? 0) + 1);
  });

  // Recharts 사용가능 데이터타입으로 변환
  return Array.from(map.entries()).map(([bizType, count]) => ({
    bizType: BIZ_TYPE_LABEL[bizType] ?? bizType,
    count,
  }));
}

type Props = {
  merchants: MerchantListRes[];
};

export const MerchantBizTypeChart = ({ merchants }: Props) => {
  const chartData = useMemo(() => buildBizTypeCountData(merchants), [merchants]);

  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-600 mb-6">
        업종별 가맹점 수
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="bizType" />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value: number) => `${value}개`}
          />
          <Bar dataKey="count" name="가맹점 수">
            {chartData.map((_, index) => (
              <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}