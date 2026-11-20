import Icon from "../components/Icon";
import { Avatar, Intro, PageFooter } from "../components/Shared";
import useUserSearch from "../hooks/useUserSearch";

export default function Search() {
  const { query, setQuery, users, loading, error } = useUserSearch();
  return <><Intro title="Find a user." subtitle="Search registered accounts by username." right={<><Icon name="user" size={16} />User directory</>} /><section className="panel directory-panel"><div className="directory-toolbar"><label className="directory-search" htmlFor="user-search"><Icon name="search" size={18} /><input id="user-search" type="search" placeholder="Search by username…" value={query} onChange={e => setQuery(e.target.value)} /></label></div><div className="directory-results-label"><span>USERS</span><span>{loading ? "Searching…" : `${users.length} results`}</span></div><div className="directory-table-wrap"><table className="directory-table"><thead><tr><th>User</th><th>Username</th><th>Email</th></tr></thead><tbody>{error ? <tr><td colSpan="3">{error}</td></tr> : users.map(user => <tr key={user.id}><td><div className="directory-person"><Avatar initials={(user.fullName || user.username || "?").slice(0, 2).toUpperCase()} /><strong>{user.fullName || user.username}</strong></div></td><td>{user.username}</td><td>{user.email}</td></tr>)}{!error && !loading && users.length === 0 && <tr><td colSpan="3"><div className="directory-empty"><strong>{query ? "No users found" : "Enter a username to search"}</strong></div></td></tr>}</tbody></table></div></section><PageFooter /></>;
}
