import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type TableKey<T> = Extract<keyof T, string | number | symbol>;

export type TableColumn<T> = {
  key: TableKey<T>;
  header: string;
  render?: (row: T) => ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Array<TableColumn<T>>;
  pageSize?: number;
  emptyText?: string;
};

const PAGE_SIZE_DEFAULT = 10;

export function Table<T extends object>({
  data,
  columns,
  pageSize = PAGE_SIZE_DEFAULT,
  emptyText = "표시할 데이터가 없습니다.",
}: TableProps<T>) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);
  const startIndex = (page - 1) * pageSize;

  const gotoPage = (next: number) => {
    setPage(Math.min(Math.max(next, 1), totalPages));
  };

  return (
    <div className="grid bg-white rounded-2xl">
      <table className="mb-5">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b border-slate-400 text-md text-slate-600 text-center w-16">순번</th>
            {columns.map((column) => {
              return (
                <th
                  key={String(column.key)}
                  className="py-3 px-10 border-b border-slate-400 text-md text-slate-600 text-center"
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
                className="transition-colors hover:bg-slate-50 cursor-pointer"
                onClick={() => {
                  const merchantCode = (row as Record<string, unknown>).mchtCode;
                  console.log(merchantCode ?? "mchtCode 없음");
                }}
              >
                <td className="py-3 border-b border-slate-100 text-slate-500 text-center">
                  {startIndex + rowIndex + 1}
                </td>
                {columns.map((column) => {
                  const value = row[column.key as keyof T];
                  return (
                    <td
                      key={String(column.key)}
                      className="py-3 border-b border-slate-100 text-slate-900 text-center"
                    >
                      {column.render ? column.render(row) : (value as ReactNode) ?? "-"}
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