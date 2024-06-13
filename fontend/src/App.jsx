import { Suspense } from "react";
import AuthContextProvider from "./contexts/AuthContext";
import Router from "./route";
import "boxicons";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Router />
        </Suspense>
      </AuthContextProvider>
    </>
  );
}

export default App;
