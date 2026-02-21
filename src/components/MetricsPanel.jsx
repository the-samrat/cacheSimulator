function MetricsPanel({ metrics, switchCount }) {
  if (!metrics) return null

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Metrics</h2>

      <p>Total Accesses: {metrics.total || metrics.accessCount}</p>
      <p>Hits: {metrics.hits}</p>
      <p>Misses: {metrics.misses}</p>

      {metrics.hitRate && <p>Final Hit Rate: {metrics.hitRate}%</p>}

      <p>Policy Switches: {switchCount}</p>
    </div>
  )
}

export default MetricsPanel