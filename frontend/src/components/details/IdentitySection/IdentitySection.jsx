import "./identity-section.css";

function IdentitySection({ title, authorName, isOwner }) {
  return (
    <>
      <h1 className="details-header-title">{title}</h1>

      <p className="entity-author">
        {isOwner
          ? "פורסם על ידך"
          : `פורסם ע"י: ${authorName || "משתמש לא זמין"}`}
      </p>
    </>
  );
}

export default IdentitySection;
