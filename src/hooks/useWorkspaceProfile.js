export default function useWorkspaceProfile() {
  let user = null;
  try {
    user = JSON.parse(sessionStorage.getItem("soilMonitorUser") || "null");
  } catch {
    user = null;
  }

  const name = user?.fullName || user?.username || "Guest user";
  const initials = name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return { name, initials };
}
