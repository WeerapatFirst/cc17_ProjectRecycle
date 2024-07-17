import { Suspense } from "react";
import AuthContextProvider from "./contexts/AuthContext";
import Router from "./route";
import "boxicons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Router />
          <ToastContainer />
        </Suspense>
      </AuthContextProvider>
    </>
  );
}

export default App;
