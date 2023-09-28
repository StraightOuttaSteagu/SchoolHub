import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Connect from './routes/Connect';
import Chat from "./routes/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Connect />
  },
  {
    path: "/chat/:you/:to",
    element: <Chat />
  }
]);

const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
