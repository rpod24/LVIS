import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import PageShell from "./Templates/page";
import pages from "./page.json";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

/* ----- tiny helper component: finds the page by ID ----- */
const RoutedPage = () => {
  const { id } = useParams();
  const schema = pages.pages.find((p) => p.id === id);
  return schema ? <PageShell schema={schema} /> : <h1>Not found</h1>;
};

/* ----- first page to land on when visiting "/" ----- */
const firstPageId = pages.nav?.[0]?.id ?? pages.pages[0].id;

/* ----- mount the app ----- */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* matches /page/manifest   AND   /page/manifest/ */}
        <Route path="/page/:id/*" element={<RoutedPage />} />

        {/* root → first page in nav (or first in pages[]) */}
        <Route path="/" element={<Navigate to={`/page/${firstPageId}`} replace />} />

        {/* fallback 404 */}
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
