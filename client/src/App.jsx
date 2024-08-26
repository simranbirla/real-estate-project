import HomePage from "./routes/homePage/homePage";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import Layout, { ProtectedRoute } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import Register from "./routes/register/register";
import NewPostPage from "./routes/newPostPage/newPostPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout>
              <HomePage />
            </Layout>
          } />

          <Route path="/login" element={
            <Layout>
              <Login />
            </Layout>
          } />
          <Route path="/list" element={
            <Layout>
              <ListPage />
            </Layout>
          } />

          <Route path="/property/:id" element={
            <Layout>
              <SinglePage />
            </Layout>
          } />

          <Route path="/register" element={
            <Layout>
              <Register />
            </Layout>
          } />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <ProfileUpdatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-post"
            element={
              <ProtectedRoute>
                <NewPostPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
