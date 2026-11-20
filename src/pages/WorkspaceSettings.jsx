
import { useNavigate } from 'react-router'

import Icon from '../components/Icon'
import { Brand } from '../components/Shared'
import useWorkspaceProfile from '../hooks/useWorkspaceProfile'
import { clearAuth } from '../services/auth'

export default function WorkspaceSettings() {
  const navigate = useNavigate()
  const { name, initials } = useWorkspaceProfile()

  return (
    <main className="projects-page">
      <aside className="projects-sidebar">
        <Brand />

        <div className="projects-nav-label">WORKSPACE</div>

        <button className="projects-nav active">
          <Icon name="settings" />
          Setting
        </button>

        <button
          className="projects-nav"
          onClick={() => navigate('/messages')}
        >
          <Icon name="mail" />
          Messages
        </button>

        <div className="projects-sidebar-bottom">
          <div className="projects-profile">
            <span>{initials}</span>
            <strong>{name}</strong>
          </div>

          <button
            className="projects-nav signout"
            onClick={() => {
              clearAuth()
              navigate('/login')
            }}
          >
            <Icon name="x" />
            Sign out
          </button>
        </div>
      </aside>

      <section className="projects-main">
        <header className="projects-top">
          <span>Workspace settings</span>
          <button className="projects-top-link" onClick={() => navigate('/overview')}>
            <Icon name="grid" size={17} />
            Overview
          </button>
        </header>

        <div className="projects-content">
          <div className="projects-title">
            <div>
              <span className="directory-eyebrow">WORKSPACE</span>
              <h1>Settings</h1>
              <p>Manage your account and workspace preferences.</p>
            </div>
          </div>

          <section className="panel workspace-settings-card">
            <div className="workspace-settings-icon">
              <Icon name="user" size={22} />
            </div>

            <div>
              <strong>Account</strong>
              <p>{name}</p>
              <small>Signed in to Soil Monitor</small>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
