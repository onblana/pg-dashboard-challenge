import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../api/useFetch.ts";
import type { ApiResponseMerchantDetailRes, PayTypeRes, StatusRes } from "../types.ts";
import { useCommonCodes } from "../contexts/CommonCodeContext.tsx";

type TableKey<T> = Extract<keyof T, string | number | symbol>;

export type TableColumn<T> = {
  key: TableKey<T>;
  header: string;
  render?: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
};

type TableProps<T> = {
  data: T[];
  columns: Array<TableColumn<T>>;
  pageSize?: number;
  emptyText?: string;
};

const PAGE_SIZE_DEFAULT = 10;

const formatCellValue = (
  value: unknown,
  key: string,
  paymentTypes: PayTypeRes[],
  paymentStatuses: StatusRes[],
): ReactNode => {

  // api 공통코드 매칭 실패 시의 폴백
  const FALLBACK_PAYTYPE_LABEL: Record<string, string> = {
    ONLINE: "온라인",
    DEVICE: "단말기",
    MOBILE: "모바일",
    VACT: "가상계좌",
    BILLING: "정기결제",
  };

  // api 공통코드 매칭 실패 시의 폴백
  const FALLBACK_STATUS_LABEL: Record<string, string> = {
    SUCCESS: "성공",
    FAILED: "실패",
    CANCELLED: "취소",
    PENDING: "대기",
  };

  if (key === "payType") {
    const found = paymentTypes.find((x) => x.type === value);
    return found ? found.description : FALLBACK_PAYTYPE_LABEL[String(value)] ?? (value as ReactNode);
  }

  if (key === "status") {
    const found = paymentStatuses.find((x) => x.code === value);
    return found ? found.description : FALLBACK_STATUS_LABEL[String(value)] ?? (value as ReactNode);
  }

  if (key === "paymentAt") {
    if (!value) return "-";
    const date = new Date(String(value));
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  }

  if (key === "amount") {
    if (value === undefined || value === null || value === "") return "-";
    const num = Number(value);
    return Number.isNaN(num) ? (value as ReactNode) : num.toLocaleString();
  }

  return value as ReactNode;
};

export const PaymentsTable = <T extends object> ({
  data,
  columns,
  pageSize = PAGE_SIZE_DEFAULT,
  emptyText = "표시할 데이터가 없습니다.",
}: TableProps<T>) => {
  const [page, setPage] = useState(1);
  const [selectedMerchantCode, setSelectedMerchantCode] = useState<string | null>(null);
  const navigate = useNavigate();
  const { paymentTypes, paymentStatuses } = useCommonCodes();

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);
  const startIndex = (page - 1) * pageSize;
  const detailUrl = selectedMerchantCode ? `/merchants/details/${selectedMerchantCode}` : null;
  const { data: merchantDetail, error: merchantError } =
    useFetch<ApiResponseMerchantDetailRes>(detailUrl);

  useEffect(() => {
    if (merchantDetail?.data && selectedMerchantCode) {
      navigate(`/merchants/${selectedMerchantCode}`, {
        state: merchantDetail.data,
      });
      setSelectedMerchantCode(null);
    }
  }, [merchantDetail, selectedMerchantCode, navigate]);

  useEffect(() => {
    if (merchantError) {
      console.error("가맹점 상세 조회에 실패했습니다.", merchantError);
      setSelectedMerchantCode(null);
    }
  }, [merchantError]);

  const gotoPage = (next: number) => {
    setPage(Math.min(Math.max(next, 1), totalPages));
  };

  return (
    <div className="table-container grid bg-white rounded-2xl px-4 py-2">
      <table className="mb-5">
        <thead>
          <tr>
            <th className="px-4 border-b border-slate-400 text-md text-slate-600 text-center w-16">순번</th>
            {columns.map((column) => {
              const align =
                column.align === "right"
                  ? "text-right"
                  : column.align === "left"
                    ? "text-left"
                    : "text-center";
              return (
                <th
                  key={String(column.key)}
                  className={`py-3 px-10 border-b border-slate-400 text-md text-slate-600 ${align}`}
                >
                  {column.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td className="" colSpan={columns.length + 1}>
                {emptyText}
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition-colors hover:bg-slate-200 cursor-pointer"
                onClick={() => {
                  const merchantCode = (row as Record<string, unknown>).mchtCode;
                  if (typeof merchantCode === "string") {
                    setSelectedMerchantCode(merchantCode);
                  }
                }}
              >
                <td className="py-3 border-b border-slate-200 text-slate-500 text-center">
                  {startIndex + rowIndex + 1}
                </td>
                {columns.map((column) => {
                  const value = row[column.key as keyof T];
                  const align =
                    column.align === "right"
                      ? "text-right"
                      : column.align === "left"
                        ? "text-left"
                        : "text-center";
                  return (
                    <td
                      key={String(column.key)}
                      className={`border-b border-slate-200 text-slate-900 ${align}`}
                    >
                      {column.render ? column.render(row) : formatCellValue(value, String(column.key), paymentTypes, paymentStatuses)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between gap-2 w-[50vw]">
        <div className="">
          총 {data.length || 0}건
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className=""
            onClick={() => gotoPage(page - 1)}
            disabled={page === 1}
          >
            이전
          </button>
          <span className="">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            className=""
            onClick={() => gotoPage(page + 1)}
            disabled={page === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}