import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import RequireAuth from "../components/RequireAuth";
import LoginPage from "../pages/Login";
import GenderMain from "../pages/Gender/MainPage";
import UserMain from "../pages/User/MainPage";

const SampleComponent = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-600 p-8">Welcome to RNLAct Demo</h1>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth><AppLayout /></RequireAuth>} >
        <Route path="/" element={<SampleComponent />} />
        <Route path="/genders" element={<GenderMain />} />
        <Route path="/users" element={<UserMain />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

