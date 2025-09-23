import { Outlet, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/authReducer";
import Navbar from "../Navbar";
import Loader from "./Loader";

const Layout = () => {
  const navigation = useNavigation();

  // Get the global auth loading state
  const { loading } = useSelector(authSelector);

  // Loader should appear when:
  // 1. Auth is in a loading state
  // 2. Or when route navigation is in progress
  const isLoading = loading || navigation.state === "loading";

  return (
    <>
      <Navbar />
      {/* Covers entire screen*/}
      {isLoading && <Loader />}
      {/* Main content area where child routes will render */}
      <Outlet />
    </>
  );
};

export default Layout;
