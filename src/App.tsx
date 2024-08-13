import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout.tsx";
import ArtistPage from "pages/admin/artist/ArtistPage.tsx"; 

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<AdminLayout />}>
              <Route path="admin/artists">
                <Route path="list" element={<ArtistPage />} />
              </Route>
          </Route>
      </Routes>
  );
}

export default App;