import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  UsersIcon,
  BoltIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Página Inicial",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Pacientes",
        path: "/patients",
        element: <Profile />,
      },
      {
        icon: <BoltIcon {...icon} />,
        name: "Exame Rápido",
        path: "/quickexam",
        element: <Tables />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
      },
    ],
  }
];

export default routes;
