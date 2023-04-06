import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
} from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="hidden items-center gap-1 px-4 xl:flex text-blue-gray-500">
            <UserCircleIcon className="h-10 w-10 text-blue-gray-500" />
            <p className="text-sm font-bold">John Doe</p>
          </div>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Link to="/auth/sign-in">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-xs font-semibold text-blue-gray-600"
                  >
                    Editar Perfil
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem className="flex items-center gap-3">
                <button onClick={() => {}}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-xs font-semibold text-blue-gray-600"
                  >
                    Sair
                  </Typography>
                </button>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
