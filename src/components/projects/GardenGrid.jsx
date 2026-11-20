import Icon from "../Icon";

export default function GardenGrid({ gardens, onOpen }) {
  if (!gardens.length) {
    return <div className="projects-empty"><Icon name="sprout" size={32} /><strong>No gardens yet</strong><span>Add your first garden to get started.</span></div>;
  }

  return (
    <div className="project-grid">
      {gardens.map((garden) => (
        <button className="project-card" key={garden.id} onClick={() => onOpen(garden)}>
          <span className="project-card-icon"><Icon name="sprout" size={24} /></span>
          <strong>{garden.name}</strong>
          <span>{garden.address}</span>
          <small>{garden.slots} slots · Code {garden.code}</small>
          <b>Open dashboard <Icon name="arrow" size={16} /></b>
        </button>
      ))}
    </div>
  );
}
