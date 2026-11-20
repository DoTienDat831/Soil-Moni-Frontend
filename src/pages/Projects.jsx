import { useEffect } from "react";
import Icon from "../components/Icon";
import CreateGardenDialog from "../components/projects/CreateGardenDialog";
import GardenGrid from "../components/projects/GardenGrid";
import useProjects from "../hooks/useProjects";

export default function Projects() {
  const {
    gardens,
    dialogOpen,
    setDialogOpen,
    form,
    updateField,
    createGarden,
    openGarden,
  } = useProjects();

  useEffect(() => {
    const openDialog = () => setDialogOpen(true);
    window.addEventListener("soil-monitor:create-garden", openDialog);
    return () => window.removeEventListener("soil-monitor:create-garden", openDialog);
  }, [setDialogOpen]);

  return (
    <>
      <section className="projects-page">
        <div className="projects-content">
          <div className="projects-title">
            <div>
              <span className="directory-eyebrow">YOUR WORKSPACE</span>
              <h1>All gardens</h1>
              <p>Choose a garden to open its monitoring dashboard.</p>
            </div>
            <button className="login-submit projects-add" onClick={() => setDialogOpen(true)}>
              <Icon name="info" size={18} /> Add garden
            </button>
          </div>
          <GardenGrid gardens={gardens} onOpen={openGarden} />
        </div>
      </section>

      {dialogOpen && (
        <CreateGardenDialog
          form={form}
          onChange={updateField}
          onSubmit={createGarden}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </>
  );
}
import { useEffect } from "react";
