import {
  HomeIcon,
  UsersIcon,
  BoltIcon,
  BellIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Patients, Notifications } from "@/pages/dashboard";
import Result from "./pages/dashboard/result";

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
    icon: <HomeIcon {...icon} />,
    name: "Página Inicial",
    path: "/inicio",
    element: <Home />,
  },
  {
    icon: <UsersIcon {...icon} />,
    name: "Pacientes",
    path: "/pacientes",
    element: <Patients />,
  },
  {
    icon: <BoltIcon {...icon} />,
    name: "Paciente (temp)",
    path: "/paciente",
    element: <Profile user={testUser}/>,
  },
  {
    icon: <BellIcon {...icon} />,
    name: "Resultado (temp)",
    path: "/resultado",
    element: <Result />,
  },
];

export default routes;
