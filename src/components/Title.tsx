import { useLocation } from "react-router-dom";

const ROUTE_TITLES: Record<string, string> = {
  "/": "대시보드",
  "/merchants": "가맹점 현황",
  "/payments": "결제 내역",
  "/settings": "설정",
};

export function Title() {
  const { pathname } = useLocation();
  const [ , title ] =
    Object.entries(ROUTE_TITLES).find(([route]) =>
      route === "/" ? pathname === "/" : pathname.startsWith(route),
    ) ?? ["*", "PG Dashboard"];

  return (
    <header className="title-bar">
      <div className="title-bar__heading">
        <h1 className="title-bar__title">{title}</h1>
      </div>
    </header>
  );
}
