import { NavLink } from "react-router-dom";

type MenuItem = {
  label: string;
  to: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "대시보드", to: "/" },
  { label: "거래내역", to: "/payments" },
  { label: "가맹점", to: "/merchants" },
];

const linkClass =
  "side-menu__link";

export function SideMenu() {
  return (
    <aside className="side-menu">
      <div className="side-menu__brand">
        <span className="side-menu__brand-mark" aria-hidden>PG</span>
        <div>
          <p className="side-menu__brand-title">PG Dashboard</p>
        </div>
      </div>

      <nav aria-label="주요 메뉴">
        <ul className="side-menu__list">
          {MENU_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? "side-menu__link--active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}