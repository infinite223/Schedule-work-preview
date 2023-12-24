import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from "./hooks/useAuth";
import {BrowserRouter} from "react-router-dom";
import {NotificationsProvider} from "reapop";
import {ATopLevelComponent} from "./components/ATopLevelComponent ";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NotificationsProvider>
          <ATopLevelComponent />

          <App />
        </NotificationsProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
