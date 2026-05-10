export const highlightText = (text, search) => {
    if (!search || !text) return text;

    const regex = new RegExp(
        `(${search.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")})`,
        "gi",
    );

    return text.split(regex).map((part, i) =>
        regex.test(part) ? (
            <mark key={i} className="highlight">
                {part}
            </mark>
        ) : (
            part
        ),
    );
};

