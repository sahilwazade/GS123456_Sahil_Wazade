import { FiMenu } from "react-icons/fi";

interface Props {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: Props) => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white-600 text-white flex items-center px-6 shadow-md z-50">
      <button
        className="lg:hidden text-gray-900 text-2xl mr-4"
        onClick={toggleSidebar}
      >
        <FiMenu />
      </button>
      <h1 className="text-lg font-semibold text-gray-900">
        Data Viewer Application
      </h1>
    </nav>
  );
};

export default Navbar;
