'use client'
import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X, ArrowRight } from 'lucide-react'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const HOTSPOTS = [
  { id: 'sundarbans', name: 'Sundarbans', country: 'India · Bangladesh', coords: [89.0, 21.9], loss: 28, since: 1996, status: 'critical', note: 'World’s largest contiguous mangrove forest. Sea-level rise + cyclones threaten 40% of remaining cover by 2050.' },
  { id: 'mekong', name: 'Mekong Delta', country: 'Vietnam', coords: [105.6, 9.9], loss: 67, since: 1973, status: 'critical', note: 'Aquaculture conversion has erased two thirds of historic mangrove cover.' },
  { id: 'philippines', name: 'Palawan Reef-Mangrove Belt', country: 'Philippines', coords: [118.7, 9.8], loss: 41, since: 1990, status: 'high', note: 'Coral-mangrove corridor under restoration. ECODOME field site since 2024.' },
  { id: 'french-polynesia', name: 'Society Islands', country: 'French Polynesia', coords: [-149.4, -17.7], loss: 12, since: 2000, status: 'monitored', note: 'Active blacktip reef shark nursery monitoring (acoustic telemetry).' },
  { id: 'belize', name: 'Belize Barrier Reef', country: 'Belize', coords: [-88.1, 17.4], loss: 24, since: 1980, status: 'high', note: 'Caribbean coral-mangrove connectivity studies via eDNA.' },
  { id: 'florida', name: 'Everglades', country: 'United States', coords: [-80.9, 25.3], loss: 35, since: 1950, status: 'high', note: 'Hydrology disruption + saltwater intrusion. Restoration: 1.4M saplings planted.' },
  { id: 'amazon', name: 'Amazon Estuary', country: 'Brazil', coords: [-49.5, -1.0], loss: 17, since: 1996, status: 'monitored', note: 'World’s second-largest mangrove area. Buffer against deforestation runoff.' },
  { id: 'niger', name: 'Niger Delta', country: 'Nigeria', coords: [6.5, 4.6], loss: 53, since: 1986, status: 'critical', note: 'Oil pollution + microplastic accumulation 9.4× above coastal average.' },
  { id: 'madagascar', name: 'Mahajamba Bay', country: 'Madagascar', coords: [47.0, -15.7], loss: 36, since: 1990, status: 'high', note: 'Charcoal harvesting + shrimp farming. Community-led protection scaling.' },
  { id: 'australia', name: 'Gulf of Carpentaria', country: 'Australia', coords: [140.0, -16.0], loss: 19, since: 2015, status: 'monitored', note: '40 million-tree dieback event in 2015–16 from extreme heat anomaly.' },
  { id: 'indonesia', name: 'Sumatra Coast', country: 'Indonesia', coords: [101.5, 0.5], loss: 49, since: 1980, status: 'critical', note: 'Largest national mangrove loss globally; restoration partnerships active.' },
  { id: 'panama', name: 'Bocas del Toro', country: 'Panama', coords: [-82.2, 9.3], loss: 22, since: 2000, status: 'monitored', note: 'Coral bleaching refugia in mangrove-adjacent reefs (2024 heatwave study).' },
]

const statusColors = {
  critical: '#E15554',
  high: '#F0A03B',
  monitored: '#7CDFC0',
}

export default function WorldMap() {
  const [active, setActive] = useState(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="relative">
      <div className="relative aspect-[16/9] rounded-3xl bg-[#071E16] overflow-hidden ring-1 ring-white/10">
        {mounted && (
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 175 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: '#0F3A2C', stroke: '#1F7A52', strokeWidth: 0.4, outline: 'none' },
                      hover:   { fill: '#13503C', outline: 'none' },
                      pressed: { fill: '#13503C', outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {HOTSPOTS.map((h) => (
              <Marker key={h.id} coordinates={h.coords} onClick={() => setActive(h)}>
                <g style={{ cursor: 'pointer' }}>
                  <circle r={9} fill={statusColors[h.status]} fillOpacity={0.18} />
                  <circle r={5} fill={statusColors[h.status]} fillOpacity={0.45}>
                    <animate attributeName="r" values="5;10;5" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.45;0.05;0.45" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle r={2.6} fill={statusColors[h.status]} stroke="#FAFAF7" strokeWidth={0.6} />
                </g>
              </Marker>
            ))}
          </ComposableMap>
        )}

        {/* Legend */}
        <div className="absolute left-4 bottom-4 flex flex-wrap items-center gap-3 rounded-full bg-black/40 backdrop-blur-md ring-1 ring-white/10 px-4 py-2 text-[11px] text-white/80">
          {Object.entries(statusColors).map(([k, c]) => (
            <span key={k} className="inline-flex items-center gap-1.5 capitalize">
              <span className="h-2 w-2 rounded-full" style={{ background: c }} />
              {k}
            </span>
          ))}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-black/40 backdrop-blur-md ring-1 ring-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/70">
          {HOTSPOTS.length} Hotspots Mapped
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-4 sm:right-6 top-16 sm:top-20 w-[300px] sm:w-[340px] rounded-2xl bg-white/95 backdrop-blur-md ring-1 ring-[#0B3D2E]/15 p-5 shadow-[0_24px_60px_-30px_rgba(11,61,46,0.55)]"
          >
            <button onClick={() => setActive(null)} className="absolute top-3 right-3 h-7 w-7 rounded-full hover:bg-[#0B3D2E]/5 flex items-center justify-center">
              <X className="h-4 w-4 text-[#0B3D2E]/70" />
            </button>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: statusColors[active.status] }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusColors[active.status] }} />
              {active.status}
            </div>
            <h3 className="font-display mt-2 text-xl font-semibold text-[#0B3D2E] tracking-tightest">{active.name}</h3>
            <div className="mt-1 inline-flex items-center gap-1 text-[12px] text-[#0B1F18]/65"><MapPin className="h-3 w-3" /> {active.country}</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#0B1F18]/55">Loss since {active.since}</div>
                <div className="font-display text-2xl font-semibold text-[#0B3D2E]">−{active.loss}%</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#0B1F18]/55">Hotspot</div>
                <div className="font-display text-2xl font-semibold text-[#0E7490] capitalize">{active.status}</div>
              </div>
            </div>
            <p className="mt-4 text-[13px] text-[#0B1F18]/75 leading-relaxed">{active.note}</p>
            <button className="mt-5 w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0B3D2E] text-white px-4 py-2.5 text-[12px] font-semibold hover:bg-[#0F5238]">
              View Field Reports <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
