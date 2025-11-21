import { useLocation } from "react-router-dom";

const ROUTE_TITLES: Record<string, string> = {
  "/": "대시보드",
  "/merchants": "가맹점 상세정보",
  "/payments": "거래내역",
  "/settings": "설정",
};

export function Title() {
  const { pathname } = useLocation();
  const [ _, title ] =
    Object.entries(ROUTE_TITLES).find(([route]) =>
      route === "/" ? pathname === "/" : pathname.startsWith(route),
    ) ?? ["*", "PG Dashboard"];

  return (
    <header className="title-bar">
      <div className="flex items-center">
        <p className="my-1 text-[1.6rem] font-semibold text-slate-900">{title}</p>
      </div>
    </header>
  );
}