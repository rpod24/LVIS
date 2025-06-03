// src/components/DynamicButton.js
const DynamicButton = ({ component }) => {
  return (
    <button
      className="btn btn-primary my-2"
      onClick={() => {
        if (component.onClick) {
          // eslint-disable-next-line no-eval
          eval(component.onClick);
        }
      }}
    >
      {component.text}
    </button>
  );
};

export default DynamicButton;
