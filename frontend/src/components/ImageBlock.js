export default function ImageBlock({ component }) {
  return <img className="img-fluid my-2" src={component.src} alt={component.alt} />;
}
