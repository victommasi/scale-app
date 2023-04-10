import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      {/* <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, desenvolvido por Masitech / Creative Tim
        </Typography>
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <Link key={name} to={path}>
              <Typography
                as="a"
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </Link>
          ))}
        </ul>
      </div> */}
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Creative Tim",
  brandLink: "https://www.creative-tim.com",
  routes: [
    { name: "Sobre", path: "/sobre" },
    { name: "Contato", path: "/contato" },
    { name: "Licença", path: "/licenca" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
