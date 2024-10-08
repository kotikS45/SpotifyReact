import "css/index.css";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "utils/contexts/ThemeContext";
import App from "./App.tsx";
import { store } from "app/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </Router>
  </Provider>
)