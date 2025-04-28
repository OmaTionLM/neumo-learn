import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Layout from "./layout/Layout";
import Profile from "./pages/profile/Profile";
import Disease from "./pages/diseases/Diseases";
import Quiz from "./pages/quiz/Quiz";
import Explore from "./pages/3D-Explore/Explore";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/diseases" element={<Disease />} />
        <Route path="/explore_en_3D" element={<Explore />} />

      </Routes>
    </Layout>
  </BrowserRouter>
);
