import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getManifestById } from "./api"; // adjust path as needed
import PageRenderer from "./PageRenderer"; // your dynamic page renderer

const PageShell = ({ schema }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (id) {
      getManifestById(id).then(setFormData).catch(console.error);
    } else {
      setFormData({}); // for new manifests
    }
  }, [id]);

  if (id && !formData) return <div>Loading...</div>;

  return <PageRenderer schema={schema} formData={formData} setFormData={setFormData} />;
};

export default PageShell;
