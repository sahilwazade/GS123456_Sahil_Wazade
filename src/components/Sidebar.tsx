import { Link } from "react-router-dom";
import { MdStore } from "react-icons/md";
import { BiGame } from "react-icons/bi";
import { VscGraph } from "react-icons/vsc";
import { BiBarChartSquare } from "react-icons/bi";
import { useState } from "react";

interface Props {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: Props) => {
  const [selected, setSelected] = useState<string>("store");

  const menuItems = [
    {
      label: "Store",
      icon: <MdStore className="text-2xl" />,
      path: "/",
      id: "store",
    },
    {
      label: "SKU",
      icon: <BiGame className="text-2xl" />,
      path: "/SKU",
      id: "sku",
    },
    {
      label: "Planning",
      icon: <VscGraph className="text-2xl" />,
      path: "/planning",
      id: "planning",
    },
    {
      label: "Charts",
      icon: <BiBarChartSquare className="text-2xl" />,
      path: "/charts",
      id: "charts",
    },
  ];

  return (
    <aside
      className={`fixed top-20 left-0 w-64 h-screen bg-white-900 text-gray-800 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } lg:translate-x-0`}
    >
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`py-2 px-10 cursor-pointer flex items-center space-x-2
              ${selected === item.id ? "custom-gray" : ""}`}
            style={{ transition: "background-color 0.3s ease" }}
          >
            <Link
              to={item.path}
              className="flex items-center space-x-2 w-full text-gray-900"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
