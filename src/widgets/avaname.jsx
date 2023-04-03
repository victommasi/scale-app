import classNames from "classnames";

const Avaname = ({ name, size }) => {

  return (
    <div className={classNames("flex items-center justify-center rounded-full bg-blue-gray-500 text-white", {
      "h-8 w-8 text-sm": size === "sm",
      "h-10 w-10 text-md": size === "md",
      "h-12 w-12 text-lg": size === "lg",
    }
    )}>
      {name.match(/\b\w/g).join('')}
    </div>
  )
}

export default Avaname;