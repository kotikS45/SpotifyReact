import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout.tsx";
import ArtistPage from "pages/admin/artist/ArtistPage.tsx"; 
import ArtistCreatePage from 'pages/admin/artist/ArtistCreatePage.tsx';
import AccountLayout from "components/layouts/AccountLayout.tsx";
import LoginPage from "pages/auth/LoginPage.tsx";
import RegisterPage from "pages/auth/RegisterPage.tsx";

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<AdminLayout />}>
              <Route/>
              <Route path="admin/artists">
                <Route path="list" element={<ArtistPage />} />
                <Route path="create" element={<ArtistCreatePage />} />
              </Route>
          </Route>

          
          <Route path="/auth/" element={<AccountLayout />}>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="login" element={<LoginPage />} />
            </Route>
      </Routes>
  );
}
export default App