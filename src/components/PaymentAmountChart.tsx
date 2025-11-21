import { useMemo } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";
import type { PaymentListRes } from "../types.ts";
import { useCommonCodes } from "../contexts/CommonCodeContext.tsx";
import { Card } from "./Card.tsx";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#3B82F6", "#F59E0B", "#10B981", "#14B8A6"];

const FALLBACK_PAYTYPE_LABEL: Record<string, string> = {
  ONLINE: "온라인",
  DEVICE: "단말기",
  MOBILE: "모바일",
  VACT: "가상계좌",
  BILLING: "정기결제",
};

const aggregateAmountsByPayType = (payments: PaymentListRes[]) => {
  const map = new Map<string, number>();

  payments.forEach(({ payType, amount }) => {
    const numericAmount = Number(amount);
    const safeAmount = Number.isFinite(numericAmount) ? numericAmount : 0;
    map.set(payType, (map.get(payType) ?? 0) + safeAmount);
  });

  return Array.from(map.entries()).map(([payType, total]) => ({
    payType,
    total,
  }));
};

type Props = {
  payments: PaymentListRes[];
};

export function PaymentAmountChart({ payments }: Props) {
  const { paymentTypes } = useCommonCodes();

  const chartData = useMemo(() => {
    const aggregated = aggregateAmountsByPayType(payments);
    return aggregated.map((item) => {
      const found = paymentTypes.find((t) => t.type === item.payType);
      const label =
        found?.description ??
        FALLBACK_PAYTYPE_LABEL[item.payType] ??
        item.payType;

      return {
        ...item,
        label,
      };
    });
  }, [payments, paymentTypes]);

  if (chartData.length === 0) {
    return <p>표시할 결제 데이터가 없습니다.</p>;
  }

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-slate-600">결제 수단별 금액 비중</h2>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="label"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`slice-${entry.payType}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}