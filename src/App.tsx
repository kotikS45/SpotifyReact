import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "components/admin/AdminLayout.tsx";
import ArtistPage from "pages/admin/artist/ArtistPage.tsx"; 
import ArtistCreatePage from 'pages/admin/artist/ArtistCreatePage.tsx';
import AccountLayout from "pages/auth/AccountLayout.tsx";
import LoginPage from "pages/auth/LoginPage.tsx";
import RegisterPage from "pages/auth/RegisterPage.tsx";
import Layout from "components/main/Layout.tsx";
import BackgroundSetter from "components/BackgroundSetter";
import SubscriptionsPage from "pages/main/SubscriptionsPage";
import PaymentPage from "pages/main/PaymentPage";
import GenresPage from "pages/main/GenresPage";

const App = () => {
  return (
    <>
      <BackgroundSetter/>
    <Routes>
      

      <Route path="/" element={<Layout/>}>
        <Route path="library" element={<></>}/>
        <Route path="favorite" element={<></>}/>

        <Route path="albums" element={<></>}/>
        <Route path="playlists" element={<></>}/>
        <Route path="forartist" element={<></>}/>
        <Route path="account" element={<></>}/>
        
        <Route path="friends" element={<></>}/>
        <Route path="genres" element={<GenresPage/>}/>
        <Route path="notification" element={<></>}/>
        
        <Route path="premium" element={<SubscriptionsPage/>}/>
        <Route path="payment" element={<PaymentPage/>}/>
        <Route path="profile" element={<></>}/>
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="artists">
          <Route path="list" element={<ArtistPage />} />
          <Route path="create" element={<ArtistCreatePage />} />
        </Route>
      </Route>

      <Route path="/auth/" element={<AccountLayout />}>
        <Route path="register" element={<RegisterPage/>}/>
        <Route path="login" element={<LoginPage />} />
      </Route>
    
    </Routes>
    </>
  );
}
export default App