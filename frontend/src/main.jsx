import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store/store.js";
import { AuthLayout } from "./components/index.js";
import {
  LoginPage,
  SignupPage,
  AddPost,
  IndividualPost,
  AllPosts,
  HomePage,
  EditPosts,
} from "./pages/index.js";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";

import App from "./App.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      <Route index element={<HomePage />} />
      <Route path="/post/:id" element={<IndividualPost />} />

      {/* auth guest only (no login required) */}
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        }
      />

      <Route
        path="/register"
        element={
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        }
      />

      {/* Requires login */}
      <Route
        path="/all-posts"
        element={
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        }
      />
      <Route
        path="/add-posts"
        element={
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        }
      />
      <Route
        path="/update/:id"
        element={
          <AuthLayout authentication={true}>
            <EditPosts />
          </AuthLayout>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
