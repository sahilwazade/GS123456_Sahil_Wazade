import { Link } from "react-router-dom";
import { MdStore } from "react-icons/md";
import { BiGame } from "react-icons/bi";
import { VscGraph } from "react-icons/vsc";
import { BiBarChartSquare } from "react-icons/bi";

interface Props {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: Props) => {
  return (
    <aside
      className={`fixed top-20 left-0 w-64 h-screen bg-white-900 text-gray-800 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } lg:translate-x-0`}
    >
      <ul>
        <li
          className="py-2 px-10 custom-gray cursor-pointer flex items-center space-x-2"
          style={{ transition: "background-color 0.3s ease" }}
        >
          <Link
            to="/"
            className="flex items-center space-x-2 w-full text-gray-900"
          >
            <MdStore className="text-2xl" />
            <span>Store</span>
          </Link>
        </li>
        <li
          className="py-2 px-10 custom-gray cursor-pointer flex items-center space-x-2"
          style={{ transition: "background-color 0.3s ease" }}
        >
          <Link to="/SKU" className="flex items-center space-x-2 w-full">
            <BiGame className="text-2xl" />
            <span>SKU</span>
          </Link>
        </li>
        <li
          className="py-2 px-10 custom-gray cursor-pointer flex items-center space-x-2"
          style={{ transition: "background-color 0.3s ease" }}
        >
          <Link to="/planning" className="flex items-center space-x-2 w-full">
            <VscGraph className="text-2xl" />
            <span>Planning</span>
          </Link>
        </li>
        <li
          className="py-2 px-10 custom-gray cursor-pointer flex items-center space-x-2"
          style={{ transition: "background-color 0.3s ease" }}
        >
          <Link to="/charts" className="flex items-center space-x-2 w-full">
            <BiBarChartSquare className="text-2xl" />
            <span>Charts</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
