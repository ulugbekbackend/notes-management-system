import "./StatsCard.css";

export default function StatsCard({
  number,
  title,
  icon,
  color,
}) {

  return (

    <div className="stats-card">

      <div
        className="stats-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="stats-copy">
        <h2>{number}</h2>
        <p>{title}</p>
      </div>

    </div>

  );

}
