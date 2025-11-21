export function fullName(u) {
  if (!u) return "";
  return `${u.first_name || ""} ${u.last_name || ""}`.trim();
}

export function prettyDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}
