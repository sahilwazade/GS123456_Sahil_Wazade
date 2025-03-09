import { FiMenu } from "react-icons/fi";
import logo from "../assets/Gsynergy.svg";

interface Props {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: Props) => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white-600 text-white flex items-center justify-between px-6 z-50">
      <button
        className="lg:hidden text-gray-900 text-2xl mr-4"
        onClick={toggleSidebar}
      >
        <FiMenu />
      </button>
      <img src={logo} alt="Logo" className="h-15 w-auto" />
      <div className="flex justify-center w-full">
        <h1 className="text-lg font-semibold text-gray-900">
          Data Viewer Application
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
