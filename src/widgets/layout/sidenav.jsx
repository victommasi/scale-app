import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import inbodylogo from '../../assets/images/inbody-logo.png'
import { BoltIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import PatientDialog from "../patient-dialog";
import ExamDialog from "../exam-dialog";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const [open, setIsOpen] = useState(false);

  return (
    <aside
      className={`bg-gradient-to-br from-blue-gray-500 to-blue-gray-500
      fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div className={`relative border-b border-white/20`}>
        <div className="flex flex-col items-center gap-2 p-6">
          <img src={inbodylogo} className="w-[70%] h-auto" /> 
          <Typography
            variant="h6"
            color={"white"}
          >
            {brandName}
          </Typography>
        </div>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {routes.map(({ icon, name, path }) => (
            <li key={name}>
              <NavLink to={path}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
            <li>
              <Button
                variant={"text"}
                color={"white"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
                onClick={() => setIsOpen(true)}
              >
                <BoltIcon  className="w-5 h-5 text-inherit" />
                <Typography
                  color="inherit"
                  className="font-medium capitalize"
                >
                  Exame Rápido
                </Typography>
              </Button>
              
            </li>
        </ul>
      </div>
      <ExamDialog open={open} onClose={() => setIsOpen(false)} />
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: inbodylogo,
  brandName: "Inbody H20N",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
