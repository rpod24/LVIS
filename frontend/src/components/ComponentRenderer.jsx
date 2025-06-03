import TextBlock from "./TextBlock";
import InputField from "./InputField";
import Button from "./DynamicButton";
import ImageBlock from "./ImageBlock";
import DataTable from "./DataTable";
import RepeatGroup from "./RepeatGroup";

const ComponentRenderer = ({ component, formData, setFormData }) => {
  if (!component || !component.type) {
    return <p style={{ color: "red" }}>Invalid Component</p>;
  }

  switch (component.type) {
    case "text":
      return <TextBlock component={component} />;
    case "input":
      return <InputField component={component} formData={formData} setFormData={setFormData} />;
    case "button":
      return <Button component={component} />;
    case "image":
      return <ImageBlock component={component} />;
    case "table":
      return <DataTable component={component} />;
    case "repeat":
      return <RepeatGroup component={component} formData={formData} setFormData={setFormData} />;
    default:
      return <p>Unknown Component Type ({component.type})</p>;
  }
};

export default ComponentRenderer;