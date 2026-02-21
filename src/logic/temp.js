export function runSimulation(config, updateUI, finishSimulation) {
  const { cacheSize, addresses, policy, nValue } = config

  let cache = []
  let hits = 0
  let misses = 0
  let accessCount = 0
  let switchCount = 0

  let currentPolicy = policy
  let fifoQueue = []
  let lruMap = new Map()

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  function switchPolicy() {
    currentPolicy = currentPolicy === "FIFO" ? "LRU" : "FIFO"
    switchCount++

    // Rebuild structures after switching
    if (currentPolicy === "LRU") {
      lruMap.clear()
      cache.forEach((block) => {
        lruMap.set(block, accessCount)
      })
    }

    if (currentPolicy === "FIFO") {
      fifoQueue = [...cache]
    }
  }

  async function simulate() {
    for (let address of addresses) {
      accessCount++
      let result = ""
      let policySwitched = false

      if (cache.includes(address)) {
        hits++
        result = "HIT"

        if (currentPolicy === "LRU") {
          lruMap.set(address, accessCount)
        }
      } else {
        misses++
        result = "MISS"

        if (cache.length < cacheSize) {
          cache.push(address)

          if (currentPolicy === "FIFO") {
            fifoQueue.push(address)
          } else {
            lruMap.set(address, accessCount)
          }
        } else {
          if (currentPolicy === "FIFO") {
            const removed = fifoQueue.shift()
            const index = cache.indexOf(removed)
            cache[index] = address
            fifoQueue.push(address)
          } else {
            let leastUsed = null
            let minTime = Infinity

            for (let [key, value] of lruMap.entries()) {
              if (value < minTime) {
                minTime = value
                leastUsed = key
              }
            }

            const index = cache.indexOf(leastUsed)
            cache[index] = address
            lruMap.delete(leastUsed)
            lruMap.set(address, accessCount)
          }
        }
      }

      // Dynamic Switching
      if (accessCount % nValue === 0) {
        const hitRate = (hits / accessCount) * 100
        if (hitRate < 60) {
          switchPolicy()
          policySwitched = true
        }
      }

      updateUI({
        cache: [...cache],
        hits,
        misses,
        accessCount,
        currentAddress: address,
        result,
        currentPolicy,
        switchCount,
        policySwitched
      })

      await delay(800)
    }

    finishSimulation({
      total: accessCount,
      hits,
      misses,
      hitRate: ((hits / accessCount) * 100).toFixed(2),
      switchCount,
      currentPolicy
    })
  }

  simulate()
}