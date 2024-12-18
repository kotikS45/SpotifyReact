import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "utils/contexts/ThemeContext";
import App from "./App.tsx";
import { store } from "./store";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "utils/envData.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Router>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </Router>
        </GoogleOAuthProvider>
    </Provider>
)