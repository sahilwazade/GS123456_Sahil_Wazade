import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: Props) => {
  return (
    <aside
      className={`fixed top-16 left-0 w-64 h-screen bg-white-900 text-gray-800 p-6 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } lg:translate-x-0`}
    >
      <ul>
        <li className="py-2 px-4 hover:bg-gray-400 cursor-pointer rounded">
          <Link to="/">Store</Link>
        </li>
        <li className="py-2 px-4 hover:bg-gray-400 cursor-pointer rounded">
          <Link to="/SKU">SKU</Link>
        </li>
        <li className="py-2 px-4 hover:bg-gray-400 cursor-pointer rounded">
          <Link to="/planning">Planning</Link>
        </li>
        <li className="py-2 px-4 hover:bg-gray-400 cursor-pointer rounded">
          <Link to="/charts">Charts</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
