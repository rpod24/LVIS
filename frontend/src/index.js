import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import pages from "./page.json";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import PageShell from "./Templates/page";

/* ----- tiny helper component: finds the page by ID ----- */
const RoutedPage = () => {
  const { pageId, id } = useParams();
  const schema = pages.pages.find((p) => p.id === pageId);
  return schema ? <PageShell key={`${pageId}-${id ?? ""}`} schema={schema} pageId={pageId} id={id} /> : <h1>Not found</h1>;
};

/* ----- first page to land on when visiting "/" ----- */
const firstPageId = pages.nav?.[0]?.id ?? pages.pages[0].id;

/* ----- mount the app ----- */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route for pages with BOTH a page ID and a record ID */}
        <Route path="/page/:pageId/:id" element={<RoutedPage />} />

        {/* Route for pages with only a page ID (e.g., manifest-list) */}
        <Route path="/page/:pageId" element={<RoutedPage />} />

        {/* Redirect root to first nav page */}
        <Route path="/" element={<Navigate to={`/page/${firstPageId}`} replace />} />

        {/* Catch-all */}
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
