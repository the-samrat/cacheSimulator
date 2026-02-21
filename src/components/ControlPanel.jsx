import { useState } from "react"

function ControlPanel({ onStart }) {
  const [cacheSize, setCacheSize] = useState(4)
  const [addresses, setAddresses] = useState("")
  const [policy, setPolicy] = useState("FIFO")
  const [nValue, setNValue] = useState(5)

  const handleStart = () => {
    const addressArray = addresses
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a !== "")

    onStart({
      cacheSize: Number(cacheSize),
      addresses: addressArray,
      policy,
      nValue: Number(nValue)
    })
  }

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Control Panel</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Cache Size: </label>
        <input
          type="number"
          value={cacheSize}
          onChange={(e) => setCacheSize(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Addresses (comma separated): </label>
        <input
          type="text"
          value={addresses}
          onChange={(e) => setAddresses(e.target.value)}
          placeholder="Example: 1,2,3,1,4"
          style={{ width: "300px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Initial Policy: </label>
        <select
          value={policy}
          onChange={(e) => setPolicy(e.target.value)}
        >
          <option value="FIFO">FIFO</option>
          <option value="LRU">LRU</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Check after N accesses: </label>
        <input
          type="number"
          value={nValue}
          onChange={(e) => setNValue(e.target.value)}
        />
      </div>

      <button onClick={handleStart}>
        Start Simulation
      </button>
    </div>
  )
}

export default ControlPanel