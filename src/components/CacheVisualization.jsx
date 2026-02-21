function CacheVisualization({
  cache,
  cacheSize,
  currentAddress,
  result,
  currentPolicy,
  policySwitched
}) {
  const paddedCache = [...cache]
  while (paddedCache.length < cacheSize) {
    paddedCache.push(null)
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Cache Visualization</h2>

      {currentAddress && (
        <p>
          Accessing: <strong>{currentAddress}</strong> →{" "}
          <span style={{ color: result === "HIT" ? "green" : "red" }}>
            {result}
          </span>
        </p>
      )}

      {currentPolicy && (
        <p>
          Current Policy: <strong>{currentPolicy}</strong>
        </p>
      )}

      {policySwitched && (
        <p style={{ color: "orange", fontWeight: "bold" }}>
          Policy switched due to low hit rate
        </p>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {paddedCache.map((block, index) => (
          <div
            key={index}
            style={{
              width: "60px",
              height: "60px",
              border: "2px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              backgroundColor: block ? "lightblue" : "#222",
              color: block ? "black" : "#666"
            }}
          >
            {block || "-"}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CacheVisualization