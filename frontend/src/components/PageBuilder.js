import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComponentRenderer from "./components/ComponentRenderer";
import { listManifests, getManifestById } from "./api"; // make sure these exist

const PageBuilder = ({ layout }) => {
  const { id } = useParams(); // Get manifest ID if it's an existing one
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (id && id.length === 24) {
      getManifest(id).then((data) => setFormData(data));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getManifestById(id)
        .then((data) => setFormData(data))
        .catch((err) => console.error("Failed to fetch manifest:", err));
    } else {
      setFormData({}); // New manifest
    }
  }, [id]);

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="container py-3">
      <h1>{layout.title}</h1>
      {layout.components?.map((c, i) => (
        <ComponentRenderer key={i} component={{ ...c, rows }} formData={formData} setFormData={setFormData} />
      ))}
    </div>
  );
};

export default PageBuilder;
