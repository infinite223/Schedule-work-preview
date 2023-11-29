import Background from './components/Background';
import Content from './components/Content';
import Nav from './components/Nav';
import './styles/appStyles.scss'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Start from './pages/Start';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
