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

const testUser = {
  "id": 1,
  "name": "Nilson Ierland",
  "email": "nierland0@indiegogo.com",
  "gender": "F",
  "dob": "01/05/1981",
  "phone": "(743) 1107769",
  "height": 1.63,
  "weight": 84.7,
  "bf": 40.0,
  "muscle": 70.3,
  "bmi": 90.7
}

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Página Inicial",
        path: "/inicio",
        element: <Home />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Pacientes",
        path: "/pacientes",
        element: <Tables />,
      },
      {
        icon: <BoltIcon {...icon} />,
        name: "Exame Rápido",
        path: "/examerapido",
        element: <Profile user={testUser}/>,
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
