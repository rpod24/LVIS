const DynamicButton = ({ component, formData }) => {
  return (
    <button
      className="btn btn-primary my-2"
      onClick={() => {
        if (component.onClick) {
          try {
            const fn = new Function("formData", "navigate", `return (${component.onClick});`);
            fn(formData, window.navigate);
          } catch (err) {
            console.error("Button onClick failed:", err);
          }
        }
      }}
    >
      {component.text}
    </button>
  );
};

export default DynamicButton;
