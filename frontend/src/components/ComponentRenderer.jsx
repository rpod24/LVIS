import TextBlock from "./TextBlock";
import InputField from "./InputField";
import Button from "./DynamicButton";
import ImageBlock from "./ImageBlock";
import DataTable from "./DataTable";
import RepeatGroup from "./RepeatGroup";
import Group from "./Group";
import SelectField from "./SelectField";
import TextArea from "./TextArea";


const ComponentRenderer = ({ component, formData, setFormData, handleChange, errors }) => {
  if (!component || !component.type) {
    return <p style={{ color: "red" }}>Invalid Component</p>;
  }

  const { name, options } = component;

  switch (component.type) {
    case "text":
      return <TextBlock component={component} />;

    case "input":
      return (
        <InputField
          component={component}
          formData={formData}
          setFormData={setFormData}
        />
      );

    case "button":
      return (
        <Button
          component={component}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
        />
      );

    case "image":
      return (
        <ImageBlock
          component={component}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
        />
      );

    case "table":
      return (
        <DataTable
          component={component}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
        />
      );

    case "select":
      return (
        <SelectField
          component={component}
          formData={formData}
          setFormData={setFormData}
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          error={errors?.[name]}
          options={options}
        />
      );

    case "repeat":
      return (
        <RepeatGroup
          component={component}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
        />
      );

    case "group":
      return (
        <Group
          component={component}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
        />
      );

    case "textarea":
      return (
        <TextArea
          component={component}
          formData={formData}
          setFormData={setFormData}
        />
      );

    default:
      return <p>Unknown Component Type ({component.type})</p>;
  }
};

export default ComponentRenderer;
