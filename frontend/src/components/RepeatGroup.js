import ComponentRenderer from "./ComponentRenderer";
import { deepGet, deepSet } from "../utils/deepHelpers";

const RepeatGroup = ({ component, formData, setFormData }) => {
  const raw = deepGet(formData, component.bind);
  const list = Array.isArray(raw) ? raw : [];

  const fullBind = (idx, fieldBind) =>
    [component.bind, String(idx), fieldBind]
      .filter((v) => v !== undefined && v !== null && v !== "")
      .join(".");

  return (
    <div className="my-3">
      <h5>{component.label}</h5>

      {list.map((item, idx) => (
        <div key={idx} className="d-flex gap-2 align-items-start mb-2">
          {component.fields.map((field, fIdx) => (
            <ComponentRenderer
              key={fIdx}
              component={{ ...field, bind: fullBind(idx, field.bind) }}
              formData={formData}
              setFormData={setFormData}
            />
          ))}

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              const newList = [...list];
              newList.splice(idx, 1);
              setFormData((prev) => deepSet(prev, component.bind, newList));
            }}
          >
            &times;
          </button>
        </div>
      ))}

      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => {
          const current = list;
          const newEntry = JSON.parse(JSON.stringify(component.prototype));
          const next = [...current, newEntry];
          setFormData((prev) => deepSet(prev, component.bind, next));
        }}
      >
        + Add
      </button>
    </div>
  );
};

export default RepeatGroup;
