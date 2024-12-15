import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "components/admin/AdminLayout.tsx";
import ArtistCreatePage from 'components/pages/admin/artist/ArtistCreatePage.tsx';
import AccountLayout from "components/pages/auth/AccountLayout.tsx";
import LoginPage from "components/pages/auth/LoginPage.tsx";
import RegisterPage from "components/pages/auth/RegisterPage.tsx";
import Layout from "components/main/Layout.tsx";
import BackgroundSetter from "components/BackgroundSetter";
import SubscriptionsPage from "components/pages/main/premium/SubscriptionsPage.tsx";
import PaymentPage from "components/pages/main/premium/PaymentPage.tsx";
import GenresPage from "components/pages/main/genre/GenresPage.tsx";
import PlaylistsPage from "components/pages/main/playlist/PlaylistsPage.tsx";
import FavoritePage from "components/pages/main/favorite/FavoritePage.tsx";
import { PlayerProvider } from "components/main/player/PlayerProvider";
import PrivateRoute from "components/pages/auth/PrivateRoute";
import ResetPasswordPage from "components/pages/auth/ResetPasswordPage";
import ForgotPasswordPage from "components/pages/auth/ForgotPasswordPage";
import ArtistsPage from "components/pages/main/artist/ArtistsPage.tsx";
import PlaylistPage from "components/pages/main/playlist/PlaylistPage.tsx";
import HomePage from "components/pages/main/home/HomePage";
import AlbumsPage from "components/pages/main/album/AlbumsPage.tsx";
import {ModalProvider} from "components/main/modal/ModalContext.tsx";
import AlbumPage from "components/pages/main/album/AlbumPage.tsx";
import ArtistPage from "components/pages/main/artist/ArtistPage.tsx";
import SearchPage from "components/pages/main/search/SearchPage.tsx";

const App = () => {
  return (
      <ModalProvider>
        <PlayerProvider>
          <BackgroundSetter/>
          <Routes>

            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Layout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="favorite" element={<FavoritePage/>}/>

                <Route path="albums" element={<AlbumsPage/>}/>
                <Route path="album" element={<AlbumPage/>}/>
                <Route path="playlists" element={<PlaylistsPage/>}/>
                <Route path="playlist" element={<PlaylistPage />} />
                <Route path="artists" element={<ArtistsPage/>}/>
                <Route path="artist" element={<ArtistPage/>}/>
                <Route path="account" element={<></>}/>

                <Route path="friends" element={<></>}/>
                <Route path="search" element={<SearchPage/>}/>
                <Route path="genres" element={<GenresPage/>}/>
                <Route path="notification" element={<></>}/>

                <Route path="premium" element={<SubscriptionsPage/>}/>
                <Route path="payment" element={<PaymentPage/>}/>
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route path="artists">
                  <Route path="list" element={<ArtistPage />} />
                  <Route path="create" element={<ArtistCreatePage />} />
                </Route>
              </Route>
            </Route>

            <Route element={<AccountLayout />}>
              <Route path="register" element={<RegisterPage/>}/>
              <Route path="login" element={<LoginPage />} />
              <Route path="resetPassword" element={<ResetPasswordPage />} />
              <Route path="forgotPassword" element={<ForgotPasswordPage/>} />
            </Route>

          </Routes>
        </PlayerProvider>
      </ModalProvider>
  );
}
export default App