import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StoreComponent from "./pages/StoreComponent";
import SkusComponent from "./pages/SkusComponent";
import PlanningComponent from "./pages/PlanningComponent";
import ChartsComponent from "./pages/ChartsComponent";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="flex">
          <Navbar toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} />
          <main
            className="lg:ml-64 mt-16 p-6 h-[calc(100vh-4rem)] overflow-auto w-full"
            style={{ backgroundColor: "#DFDFDF" }}
          >
            <Routes>
              <Route path="/" element={<StoreComponent />} />
              <Route path="/SKU" element={<SkusComponent />} />
              <Route path="/planning" element={<PlanningComponent />} />
              <Route path="/charts" element={<ChartsComponent />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
