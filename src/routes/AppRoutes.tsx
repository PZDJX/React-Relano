import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import RequireAuth from "../components/RequireAuth";

const Home = () => (
  <div className="p-4">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Hello World</h1>
    <p className="text-gray-600">RNLAct Demo Dashboard with Flowbite layout.</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/genders" element={<Home />} />
        <Route path="/users" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

