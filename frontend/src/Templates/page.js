import React from "react";
import TopNav from "./nav";
import TemplateEngine from "../app"; // ← your existing “template engine” code
import { Helmet } from "react-helmet";

const PageShell = ({ schema, pageId, id }) => (
  <div>
    <Helmet>
      <title>{schema.title}</title>
    </Helmet>

    <TopNav />

    {/* TemplateEngine now only needs the schema for ONE page */}
    <TemplateEngine schema={schema} pageId={pageId} id={id} />
  </div>
);

export default PageShell;
