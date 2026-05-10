import "./page-header.css";

function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      <h1 className="page-header-title">{title}</h1>
      <p className="page-header-subtitle">{subtitle}</p>
    </div>
  );
}

export default PageHeader;
