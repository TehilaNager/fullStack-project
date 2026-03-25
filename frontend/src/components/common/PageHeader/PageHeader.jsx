import "./page-header.css";

function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
}

export default PageHeader;
