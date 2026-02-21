import { useState } from "react"
import ControlPanel from "./components/ControlPanel"
import CacheVisualization from "./components/CacheVisualization"
import MetricsPanel from "./components/MetricsPanel"
import { runSimulation } from "./logic/temp"

function App() {
  const [cache, setCache] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [currentAddress, setCurrentAddress] = useState(null)
  const [result, setResult] = useState(null)
  const [currentPolicy, setCurrentPolicy] = useState(null)
  const [switchCount, setSwitchCount] = useState(0)
  const [cacheSize, setCacheSize] = useState(0)
  const [policySwitched, setPolicySwitched] = useState(false)

  const handleStart = (config) => {
    setCache([])
    setMetrics(null)
    setSwitchCount(0)
    setCacheSize(config.cacheSize)

    runSimulation(
      config,
      (data) => {
        setCache(data.cache)
        setCurrentAddress(data.currentAddress)
        setResult(data.result)
        setCurrentPolicy(data.currentPolicy)
        setSwitchCount(data.switchCount)
        setPolicySwitched(data.policySwitched)

        setMetrics({
          hits: data.hits,
          misses: data.misses,
          accessCount: data.accessCount
        })
      },
      (finalData) => {
        setMetrics(finalData)
        setCurrentPolicy(finalData.currentPolicy)
        setSwitchCount(finalData.switchCount)
      }
    )
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Cache Memory Simulator</h1>

      <ControlPanel onStart={handleStart} />

      <CacheVisualization
        cache={cache}
        cacheSize={cacheSize}
        currentAddress={currentAddress}
        result={result}
        currentPolicy={currentPolicy}
        policySwitched={policySwitched}
      />

      <MetricsPanel metrics={metrics} switchCount={switchCount} />
    </div>
  )
}

export default App