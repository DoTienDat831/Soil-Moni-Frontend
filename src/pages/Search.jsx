import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import { Avatar, Intro, PageFooter } from "../components/Shared";

const members = [
  { name: "Alex Lee", email: "alex.lee@greengrow.io", role: "Organization Admin", organization: "GreenGrow Farm", status: "Active", initials: "AL", color: "mint", joined: "Jan 12, 2025" },
  { name: "Minh Nguyen", email: "minh.nguyen@greengrow.io", role: "Farm Manager", organization: "GreenGrow Farm", status: "Active", initials: "MN", color: "blue", joined: "Feb 03, 2025" },
  { name: "Linh Tran", email: "linh.tran@greengrow.io", role: "Agronomist", organization: "GreenGrow Farm", status: "Active", initials: "LT", color: "peach", joined: "Mar 18, 2025" },
  { name: "Quang Pham", email: "quang.pham@greengrow.io", role: "Field Operator", organization: "GreenGrow Farm", status: "Invited", initials: "QP", color: "lavender", joined: "Nov 15, 2026" },
  { name: "Hana Vu", email: "hana.vu@greengrow.io", role: "Field Operator", organization: "GreenGrow Farm", status: "Active", initials: "HV", color: "rose", joined: "Jun 21, 2025" },
  { name: "Tuan Le", email: "tuan.le@greengrow.io", role: "Viewer", organization: "GreenGrow Farm", status: "Inactive", initials: "TL", color: "gold", joined: "Aug 09, 2025" },
  { name: "Mai Do", email: "mai.do@greengrow.io", role: "Agronomist", organization: "GreenGrow Research", status: "Active", initials: "MD", color: "mint", joined: "Sep 02, 2025" },
  { name: "Bao Hoang", email: "bao.hoang@greengrow.io", role: "Farm Manager", organization: "GreenGrow Research", status: "Active", initials: "BH", color: "blue", joined: "Oct 11, 2025" },
  { name: "An Phan", email: "an.phan@greengrow.io", role: "Viewer", organization: "GreenGrow Research", status: "Invited", initials: "AP", color: "peach", joined: "Nov 12, 2026" },
];

const organizations = ["GreenGrow Farm", "GreenGrow Research"];

export default function Search() {
  const [organization, setOrganization] = useState(organizations[0]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All roles");
  const [status, setStatus] = useState("All statuses");

  const organizationMembers = members.filter((member) => member.organization === organization);
  const roles = [...new Set(organizationMembers.map((member) => member.role))];
  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesOrganization = member.organization === organization;
      const matchesQuery = !normalizedQuery || `${member.name} ${member.email} ${member.role}`.toLowerCase().includes(normalizedQuery);
      const matchesRole = role === "All roles" || member.role === role;
      const matchesStatus = status === "All statuses" || member.status === status;
      return matchesOrganization && matchesQuery && matchesRole && matchesStatus;
    });
  }, [organization, query, role, status]);

  return (
    <>
      <Intro title="Find the right teammate." subtitle="Search people and access across your organizations." right={<><Icon name="user" size={16} />Organization directory</>} />

      <section className="panel directory-panel">
        <div className="directory-heading">
          <div className="directory-org-icon"><Icon name="grid" size={20} /></div>
          <div>
            <span className="directory-eyebrow">SEARCH IN ORGANIZATION</span>
            <label className="directory-org-select-label" htmlFor="directory-organization">Organization</label>
          </div>
          <select id="directory-organization" className="directory-org-select" value={organization} onChange={(event) => { setOrganization(event.target.value); setRole("All roles"); }}>
            {organizations.map((name) => <option key={name}>{name}</option>)}
          </select>
          <div className="directory-member-total"><strong>{organizationMembers.length}</strong><span>members</span></div>
        </div>

        <div className="directory-toolbar">
          <label className="directory-search" htmlFor="member-search">
            <Icon name="search" size={18} />
            <input id="member-search" type="search" placeholder="Search by name, email, or role..." value={query} onChange={(event) => setQuery(event.target.value)} />
            {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><Icon name="x" size={16} /></button>}
          </label>
          <label className="directory-filter"><span>Role</span><select value={role} onChange={(event) => setRole(event.target.value)}><option>All roles</option>{roles.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="directory-filter"><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Active</option><option>Invited</option><option>Inactive</option></select></label>
        </div>

        <div className="directory-results-label"><span>PEOPLE</span><span>{filteredMembers.length} {filteredMembers.length === 1 ? "result" : "results"}</span></div>
        <div className="directory-table-wrap">
          <table className="directory-table">
            <thead><tr><th scope="col">Member</th><th scope="col">Role</th><th scope="col">Status</th><th scope="col">Joined</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.email}>
                  <td><div className="directory-person"><Avatar initials={member.initials} className={`avatar-${member.color}`} /><span><strong>{member.name}</strong><small>{member.email}</small></span></div></td>
                  <td><span className="directory-role"><Icon name="shield" size={14} />{member.role}</span></td>
                  <td><span className={`directory-status status-${member.status.toLowerCase()}`}><i />{member.status}</span></td>
                  <td className="directory-date">{member.joined}</td>
                  <td><button type="button" className="directory-more" aria-label={`More options for ${member.name}`} title={`More options for ${member.name}`}><span>···</span></button></td>
                </tr>
              ))}
              {filteredMembers.length === 0 && <tr><td colSpan="5"><div className="directory-empty"><span className="directory-empty-icon"><Icon name="search" size={21} /></span><strong>No members found</strong><span>Try another name or adjust your filters.</span></div></td></tr>}
            </tbody>
          </table>
        </div>
        <div className="directory-footnote"><Icon name="info" size={15} />Showing people in <strong>{organization}</strong></div>
      </section>
      <PageFooter />
    </>
  );
}
