import React from "react";
import TopNav from "./nav";
import TemplateEngine from "../app";          // ← your existing “template engine” code
import { Helmet } from "react-helmet";

const PageShell = ({ schema }) => (
  <div>
    <Helmet>
      <title>{schema.title}</title>
    </Helmet>

    <TopNav />

    {/* TemplateEngine now only needs the schema for ONE page */}
    <TemplateEngine schema={schema} />
  </div>
);

export default PageShell;
