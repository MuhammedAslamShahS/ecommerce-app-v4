import { useLocation } from "react-router-dom";
import MainRoutes from "./LayoutRoutes/MainRoutes";
import HomeImage from "./components/HomeImage/HomeImage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
    const location = useLocation();

    return (
        <div>
            <MainRoutes homeTopContent={location.pathname === "/" ? <HomeImage /> : null} />
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </div>
    );
};

export default App;
