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

  const gotoPage = (next: number) => {
    setPage(Math.min(Math.max(next, 1), totalPages));
  };

  const from = data.length ? (page - 1) * pageSize + 1 : 0;
  const to = Math.min(page * pageSize, data.length);

  return (
    <div className="table-card">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th
                  key={String(column.key)}
                  className="py-3 border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400"
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
              <td className="table__empty" colSpan={columns.length}>
                {emptyText}
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => {
                  const value = row[column.key as keyof T];
                  return (
                    <td
                      key={String(column.key)}
                      className="py-3 border-b border-slate-100 text-slate-900"
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

      <div className="table-pagination">
        <div className="table-pagination__info">
          {from}-{to} / {data.length || 0}
        </div>
        <div className="table-pagination__actions">
          <button
            type="button"
            className="table-pagination__btn"
            onClick={() => gotoPage(page - 1)}
            disabled={page === 1}
          >
            이전
          </button>
          <span className="table-pagination__page">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            className="table-pagination__btn"
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