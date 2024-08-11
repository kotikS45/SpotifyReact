import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout.tsx";

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<AdminLayout />}>
              <Route/>
          </Route>
      </Routes>
  );
}

export default App;