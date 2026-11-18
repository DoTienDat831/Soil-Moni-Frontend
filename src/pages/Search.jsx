import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import { Avatar, Intro, PageFooter } from "../components/Shared";
import { apiRequest } from "../services/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true); setError("");
      try { setUsers(await apiRequest(`/users/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })); }
      catch (e) { if (e.name !== "AbortError") setError(e.message); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);
  return <><Intro title="Find a user." subtitle="Search registered accounts by username." right={<><Icon name="user" size={16} />User directory</>} /><section className="panel directory-panel"><div className="directory-toolbar"><label className="directory-search" htmlFor="user-search"><Icon name="search" size={18} /><input id="user-search" type="search" placeholder="Search by username…" value={query} onChange={e => setQuery(e.target.value)} /></label></div><div className="directory-results-label"><span>USERS</span><span>{loading ? "Searching…" : `${users.length} results`}</span></div><div className="directory-table-wrap"><table className="directory-table"><thead><tr><th>User</th><th>Username</th><th>Email</th></tr></thead><tbody>{error ? <tr><td colSpan="3">{error}</td></tr> : users.map(user => <tr key={user.id}><td><div className="directory-person"><Avatar initials={(user.fullName || user.username || "?").slice(0, 2).toUpperCase()} /><strong>{user.fullName || user.username}</strong></div></td><td>{user.username}</td><td>{user.email}</td></tr>)}{!error && !loading && users.length === 0 && <tr><td colSpan="3"><div className="directory-empty"><strong>{query ? "No users found" : "Enter a username to search"}</strong></div></td></tr>}</tbody></table></div></section><PageFooter /></>;
}
