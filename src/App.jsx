import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/layout.jsx";
import Dashboard from "./pages/Dashboard/dashboard.jsx";
import NotFound from "./components/NotFound/index.jsx";
import Login from "./pages/SignIn/signin.jsx";
import SignUp from "./pages/Signup/index.jsx";
import PrivateRoute from "./authentication/PrivateRoute.jsx";
import Starter from "./pages/Starter/starter.jsx";
import MainCourse from "./pages/MainCourse/maincourse.jsx";
import BreakFast from "./pages/BreakFast/breakfast.jsx";
import Dssert from "./pages/Dssert/dssert.jsx";
import Deluxe from "./pages/Rooms/DeluxRoom/deluxe.jsx";
import Standard from "./pages/Rooms/StandardRoom/standard.jsx";
import UserList from "./pages/UserList/userList.jsx";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/layout" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="maincourse"
            element={
              <PrivateRoute>
                <MainCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="starter"
            element={
              <PrivateRoute>
                <Starter />
              </PrivateRoute>
            }
          />
          <Route
            path="dssert"
            element={
              <PrivateRoute>
                <Dssert />
              </PrivateRoute>
            }
          />
          <Route
            path="breakfast"
            element={
              <PrivateRoute>
                <BreakFast />
              </PrivateRoute>
            }
          />
          <Route
          path="deluxeroom"
          element={
            <PrivateRoute>
              <Deluxe />
            </PrivateRoute>
          }
           />

          <Route 
          path="standardroom"
          element={
            <PrivateRoute>
              <Standard />
            </PrivateRoute>
          }
          />

          <Route path="userList"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
           />

        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
