import { Link, Outlet, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "General",
    path: "/settings",
  },
  {
    name: "Security",
    path: "/settings/security",
  },
  {
    name: "Categories",
    path: "/settings/categories",
  },
  {
    name: "Repports",
    path: "/settings/repports",
  },
  {
    name: "Advanced",
    path: "/settings/advanced",
  },
];

const SettingsSubMenu = () => {
  const { pathname } = useLocation();
  return (
    <>
      <nav
        className="grid gap-2 text-sm text-muted-foreground rounded-md bg-muted/40 border p-4"
        x-chunk="dashboard-04-chunk-0"
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`${item?.path === pathname && "font-semibold text-primary"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </>
  );
};

const Settings = () => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
      </div>
      <div className="grid w-full max-w-6xl items-start gap-4 lg:grid-cols-[150px_1fr]">
        <SettingsSubMenu />
        <div className="grid gap-6">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Settings;
