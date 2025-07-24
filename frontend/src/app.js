// export default DynamicPageEngine;
// src/app.js
// ----------------------------------------
// Generic page-renderer used by <PageShell>
// • Accepts a single `schema` prop (layout JSON)
// • Two-way-binds form data via component.bind paths
// • Includes Data-JSON & Layout-JSON editors + pane toggles
// ----------------------------------------

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactJson from "react18-json-view";
import { saveManifest, createManifest, getManifest, getFacility } from "./api";
import api from "./api";
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

const PageBuilder = ({ layout, id, formData, setFormData }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!layout.dataSource) {
        setRows([]);
        return;
      }

      const fnName = "list" + layout.dataSource[0].toUpperCase() + layout.dataSource.slice(1);

      if (typeof api[fnName] === "function") {
        try {
          const data = await api[fnName]();
          setRows(data);
          console.log("DataSetPoint1");
          // setFormData({[layout.dataSource]: data});
          setFormData((prev) => ({ ...prev, [layout.dataSource]: data }));
        } catch (err) {
          console.error(`Failed to load data from ${fnName}:`, err);
          setRows([]);
        }
      } else {
        console.warn(`No function found for ${fnName} in api.js`);
        setRows([]);
      }
    };

    loadData();
  }, [layout]);

  useEffect(() => {
    if (id && id.length === 24) {
      console.log(`🔎 Fetching ${layout.dataSource} with ID:`, id);

      const fetchById = {
        manifests: getManifest,
        facilities: getFacility,
      }[layout.dataSource];

      if (fetchById) {
        fetchById(id).then((data) => {
          console.log(`✅ Loaded ${layout.dataSource} data:`, data);
          console.log("DataSetPoint2");
          setFormData(data);
        });
      } else {
        console.warn("⚠️ No fetch function for dataSource:", layout.dataSource);
      }
    }
  }, [id, layout.dataSource]);

  useEffect(() => {
    console.log("🧾 Current formData:", formData);
  }, [formData]);

  return (
    <div className="container py-3">
      <h1>{layout.title}</h1>
      {layout.components?.map((c, i) => (
        <ComponentRenderer key={i} component={{ ...c, rows }} formData={formData} setFormData={setFormData} />
      ))}
    </div>
  );
};

const TemplateEngine = ({ schema }) => {
  const [layout, setLayout] = useState(schema);
  const [formData, setFormData] = useState({});
  const formDataRef = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    //Update formDataRef whenever formData changes
    // if (formDataRef.current === formData) return; // Avoid unnecessary updates
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    if (layout.components) {
      const repeats = layout.components.filter((c) => c.type === "repeat");
      console.log("DataSetPoint3");
      setFormData((prev) => {
        let next = structuredClone(prev); // or use JSON.parse(JSON.stringify(prev)) for older compatibility
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
      saveAndGetId: async () => {
        const current = formDataRef.current;
        if (!current) alert("Catastrophic error: formData is undefined. Please contact support.");
        const payload = {
          facility: {
            facilityId: current?.facility?.facilityId?.trim() || "",
            facilityName: current?.facility?.facilityName?.trim() || "",
            facilityShortName: current?.facility?.facilityName?.trim() || "",
            // address: current?.facility?.address?.trim() || "",
            address: current?.facility?.address || {},
            city: current?.facility?.city?.trim() || "",
            state: current?.facility?.state?.trim() || "",
            zip: current?.facility?.zip?.trim() || "",
            phone: current?.facility?.phone?.trim() || "",
          },
          manifest: {
            installationDate: current?.manifest?.installationDate || "",
            stagingDeadline: current?.manifest?.stagingDeadline || "",
            product: current?.manifestProduct || "",
            version: current?.manifestVersion || "",
          },
          counts: {
            transmitters: current?.counts?.transmitters || "0",
            CMSs: current?.counts?.CMSs || "0",
            MEDs: current?.counts?.MEDs || "0",
          },
        };

        console.log("📦 Current:", current);
        console.log("📦 Formdata:", formData);
        console.log("📦 Payload being sent:", payload);
        const saved = await createManifest(payload);

        console.log("DataSetPoint4");
        setFormData(saved);
        return saved._id;
      },
      save: async () => {
        try {
          console.log("📦 Current:", formDataRef.current);
          const saved = await saveManifest(formDataRef.current);
          const saved2 = await getManifest(formDataRef.current._id);
          console.log("📦 saved:", saved);
          console.log("📦 saved2:", saved2);
          console.log(formDataRef.current._id);
          console.log("DataSetPoint5");
          setFormData(saved);
          // alert("Saved!");
        } catch (err) {
          alert(err.response?.data?.error || "Save failed");
        }
      },
    });
    return () => {
      delete window.navigate;
      delete window.saveManifest;
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
              console.log("📦 Current:", formDataRef.current);
              const saved = await saveManifest(formDataRef.current);
              const saved2 = await getManifest(formDataRef.current._id);
              console.log("📦 saved:", saved);
              console.log("📦 saved2:", saved2);
              console.log(formDataRef.current._id);
              console.log("DataSetPoint6");
              setFormData(saved);
              // alert("Saved!");
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
