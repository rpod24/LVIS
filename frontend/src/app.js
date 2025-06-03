// export default DynamicPageEngine;
// src/app.js
// ----------------------------------------
// Generic page-renderer used by <PageShell>
// • Accepts a single `schema` prop (layout JSON)
// • Two-way-binds form data via component.bind paths
// • Includes Data-JSON & Layout-JSON editors + pane toggles
// ----------------------------------------

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import ReactJson from "react18-json-view";
import { saveManifest, addRoom, updateRoom, deleteRoom, listManifests, createManifest, getManifest } from "./api";
import ComponentRenderer from "./components/ComponentRenderer";

const deepGet = (obj, path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
const deepSet = (obj, path, value) => {
  const keys = Array.isArray(path) ? path : path.split(".");
  const root = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur = root;
  keys.forEach((k, i) => {
    const last = i === keys.length - 1;
    if (last) {
      cur[k] = value;
      return;
    }
    const nextKey = keys[i + 1];
    const existing = cur[k];
    const shouldBeArray = !isNaN(Number(nextKey));
    if (existing === undefined) {
      cur[k] = shouldBeArray ? [] : {};
    } else {
      cur[k] = Array.isArray(existing) ? [...existing] : { ...existing };
    }
    cur = cur[k];
  });
  return root;
};

const PageBuilder = ({ layout, id }) => {
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (layout.dataSource === "manifests") {
      listManifests().then(setRows);
    } else {
      setRows([]);
    }
  }, [layout]);

  useEffect(() => {
  if (id && id.length === 24) {
    getManifest(id).then((data) => setFormData(data));
  }
}, [id]);

  return (
    <div className="container py-3">
      <h1>{layout.title}</h1>
      {layout.components?.map((c, i) => (
        <ComponentRenderer
          key={i}
          component={{ ...c, rows }}
          formData={formData}
          setFormData={setFormData}
        />
      ))}
    </div>
  );
};

const TemplateEngine = ({ schema }) => {
  const [layout, setLayout] = useState(schema);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (layout.components) {
      const repeats = layout.components.filter((c) => c.type === "repeat");
      setFormData((prev) => {
        let next = prev;
        repeats.forEach((r) => {
          const val = deepGet(next, r.bind);
          if (!Array.isArray(val)) {
            next = deepSet(next, r.bind, []);
          }
        });
        return next;
      });
    }
  }, [layout]);

  useEffect(() => {
    Object.assign(window, {
      navigate,
      saveManifest,
      addRoom,
      updateRoom,
      deleteRoom,
      saveAndGetId: async () => {
        const payload = {
          facility: {
            facilityId: formData.facility?.facilityId?.trim() || "",
            facilityName: formData.facility?.facilityName?.trim() || "",
            address: formData.facility?.address?.trim() || "",
            city: formData.facility?.city?.trim() || "",
            state: formData.facility?.state?.trim() || "",
            zip: formData.facility?.zip?.trim() || "",
            phone: formData.facility?.phone?.trim() || "",
            product: formData.facility?.product?.trim() || "",
            productVersion: formData.facility?.productVersion?.trim() || "",
          },
          manifest: {
            installationDate: formData.manifest?.installationDate || "",
            stagingDeadline: formData.manifest?.stagingDeadline || "",
          },
          counts: {
            transmitters: formData.counts?.transmitters || "0",
            CMSs: formData.counts?.CMSs || "0",
            MEDs: formData.counts?.MEDs || "0",
          },
        };

        const saved = await createManifest(payload);
        setFormData(saved);
        return saved._id;
      },
    });
    return () => {
      delete window.navigate;
      delete window.saveManifest;
      delete window.addRoom;
      delete window.updateRoom;
      delete window.deleteRoom;
      delete window.saveAndGetId;
    };
  }, [navigate, formData]);

  const [showPage, setShowPage] = useState(true);
  const [showData, setShowData] = useState(true);
  const [showLayout, setShowLayout] = useState(false);

  const { pageId, id } = useParams();

  return (
    <div>
      <div className="d-flex gap-3 p-2 border-bottom">
        <label>
          <input type="checkbox" checked={showPage} onChange={() => setShowPage(!showPage)} /> Rendered Page
        </label>
        <label>
          <input type="checkbox" checked={showData} onChange={() => setShowData(!showData)} /> Data JSON
        </label>
        <label>
          <input type="checkbox" checked={showLayout} onChange={() => setShowLayout(!showLayout)} /> Layout JSON
        </label>
        <button
          className="btn btn-success btn-sm ms-auto"
          onClick={async () => {
            try {
              const saved = await saveManifest(formData);
              setFormData(saved);
              alert("Saved!");
            } catch (err) {
              alert(err.response?.data?.error || "Save failed");
            }
          }}
        >
          Save Data
        </button>
      </div>

      <div className="d-flex flex-row" style={{ minHeight: "calc(100vh - 56px)", overflow: "hidden" }}>
        {showPage && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <PageBuilder layout={layout} formData={formData} setFormData={setFormData} id={id} />
          </div>
        )}

        {showData && (
          <div style={{ flexBasis: "33%", borderLeft: "1px solid #ddd", overflowY: "auto" }} className="p-2">
            <h5>Data JSON</h5>
            <ReactJson
              src={formData}
              name={false}
              onEdit={(e) => setFormData(e.updated_src)}
              onAdd={(e) => setFormData(e.updated_src)}
              onDelete={(e) => setFormData(e.updated_src)}
              collapsed={2}
              enableClipboard={false}
            />
          </div>
        )}

        {showLayout && (
          <div style={{ flexBasis: "33%", borderLeft: "1px solid #ddd", overflowY: "auto" }} className="p-2">
            <h5>Layout JSON</h5>
            <ReactJson
              src={layout}
              name={false}
              onEdit={(e) => setLayout(e.updated_src)}
              onAdd={(e) => setLayout(e.updated_src)}
              onDelete={(e) => setLayout(e.updated_src)}
              collapsed={2}
              enableClipboard={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateEngine;
