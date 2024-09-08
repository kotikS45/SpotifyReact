import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout.tsx";
import ArtistPage from "pages/admin/artist/ArtistPage.tsx"; 
import ArtistCreatePage from 'pages/admin/artist/ArtistCreatePage.tsx';

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
      </Routes>
  );
}
export default App