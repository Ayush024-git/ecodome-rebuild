const IMG = {
  shark: 'https://images.unsplash.com/photo-1702382116645-e93f30e25626?crop=entropy&cs=srgb&fm=jpg&q=85',
  shark2: 'https://images.unsplash.com/photo-1702382116546-9ac886ed2e24?crop=entropy&cs=srgb&fm=jpg&q=85',
  reef: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?crop=entropy&cs=srgb&fm=jpg&q=85',
  mangrove: 'https://images.unsplash.com/photo-1771985239333-cbf2ab43f566?crop=entropy&cs=srgb&fm=jpg&q=85',
  mangrove2: 'https://images.unsplash.com/photo-1651011097573-d7783bab82b8?crop=entropy&cs=srgb&fm=jpg&q=85',
  roots: 'https://images.unsplash.com/photo-1717292741426-d050f4f25503?crop=entropy&cs=srgb&fm=jpg&q=85',
  water: 'https://images.unsplash.com/photo-1616141893496-fbc65370493e?crop=entropy&cs=srgb&fm=jpg&q=85',
}

const FALLBACK_IMAGE = IMG.mangrove

// Optional image: every tile/detail page falls back to one consistent visual.
export function paperImage(paper) {
  return paper.image || FALLBACK_IMAGE
}

export function downloadName(paper) {
  return `${paper.id}.pdf`
}

// Single source of truth for the research library.
// To add a paper: drop the PDF in public/docs and add an entry here.
export const papers = [
  {
    id: 'guardians-of-the-tidal-forest',
    title: 'Guardians of the Tidal Forest: Why Sharks Are Essential to Mangrove Forest Ecosystems',
    category: 'Shark Ecology',
    authors: ['Divya Venkatesan'],
    year: 2026,
    region: 'Global',
    abstract:
      'Mangrove forests are among the most productive coastal ecosystems on Earth, yet their dependence on apex predators remains critically underexplored. This paper synthesizes ecological research to argue that sharks act as keystone species in mangroves — regulating prey populations, structuring food webs, and sustaining biodiversity through trophic cascades. It examines the consequences of shark depletion and calls for integrating shark conservation into mangrove management frameworks.',
    tags: ['Keystone Species', 'Trophic Cascades', 'Coastal Ecology', 'Marine Biodiversity'],
    file: '/docs/sharks-importance.pdf',
    image: IMG.shark,
  },
  {
    id: 'role-of-mangrove-forests',
    title: 'The Role of Mangrove Forests in Ecology and Economy',
    category: 'Mangrove Conservation',
    authors: ['Zenha K'],
    year: 2026,
    region: 'Global',
    abstract:
      "Mangrove forests occupy less than one percent of the planet's surface but deliver outsized ecological and economic benefits. This paper reviews how they shield coastlines from storms, support fisheries and livelihoods, store blue carbon, and sustain biodiversity — and how coastal development, aquaculture, pollution, and sea-level rise are pushing these ecosystems into decline. It closes with management and restoration priorities.",
    tags: ['Mangrove Ecosystems', 'Coastal Protection', 'Fisheries', 'Blue Carbon'],
    file: '/docs/roles-of-mangrove-forests.pdf',
    image: IMG.roots,
  },
  {
    id: 'fragmented-waters',
    title: 'Fragmented Waters: How Habitat Fragmentation Affects Early-Life Survival Strategies in Sharks',
    category: 'Shark Conservation',
    authors: ['Syeda Aleeza Anaum'],
    year: 2026,
    region: 'Global',
    abstract:
      'Juvenile sharks depend on coastal nurseries — mangroves, estuaries, coral reefs, and seagrass meadows — during their most vulnerable life stages. This paper examines how coastal urbanization, pollution, and habitat degradation fragment these ecosystems into isolated patches, reducing juvenile survival and threatening long-term shark population stability. It proposes marine protected areas, habitat restoration, and sustainable coastal management as responses.',
    tags: ['Habitat Fragmentation', 'Shark Conservation', 'Nursery Habitat', 'Coastal Ecosystems'],
    file: '/docs/habitat-fragmentation.pdf',
    image: IMG.shark2,
  },
  {
    id: 'pilot-study-design',
    title: 'Pilot Study Design: Modular HDPE Dome System',
    category: 'Pilot Research',
    authors: ['Zenha K'],
    year: 2026,
    region: 'Pacific Colombia',
    abstract:
      'This pilot study design validates the EcoDome modular HDPE dome system under real-world conditions before scaling to larger mangrove areas. A 50 m² degraded mangrove patch in the Esmeraldas–Pacific Colombia mangroves will be monitored for 6–12 months across seasonal cycles, tracking root growth, sediment stability, and juvenile shark and fish activity.',
    tags: ['Pilot Study', 'HDPE Domes', 'Mangrove Restoration', 'Colombia'],
    file: '/docs/pilot-study-design.pdf',
    image: IMG.mangrove2,
  },
  {
    id: 'ecodome-mangroves-x-sharks',
    title: 'EcoDome: Mangroves × Sharks Project Framework',
    category: 'Environmental Innovation',
    authors: ['EcoDome Research Team'],
    year: 2026,
    region: 'Pacific Colombia',
    abstract:
      'The EcoDome project proposes a modular, non-toxic, recycled-HDPE dome system placed between weak or newly planted mangrove roots to stabilize sediment, deflect wave action, and create sheltered micro-habitats for fish and juvenile sharks. The modules are temporary and fully retrievable once roots are self-supporting. The framework addresses plastic toxicity, entrapment, root dependency, and long-term waste through material choice, escape gaps, timed deployment, and GPS-tracked recovery.',
    tags: ['Mangrove Restoration', 'HDPE', 'Shark Nurseries', 'Circular Economy'],
    file: '/docs/ecodome-mangroves-x-sharks.pdf',
    image: IMG.mangrove,
  },
  {
    id: 'designed-escape-gaps',
    title: 'Designed Escape Gaps in Artificial Reefs to Prevent Animals Entrapment',
    category: 'Marine Engineering',
    authors: ['Regina Chineze'],
    year: 2026,
    region: 'Global',
    abstract:
      'Artificial reefs support conservation and fisheries, but poorly designed structures can trap fish, sea turtles, crustaceans, and octopuses in enclosed chambers and narrow openings. This research examines how strategically integrated escape gaps reduce entrapment while preserving habitat complexity and biodiversity. It combines ecological engineering principles with case studies from Japan, Australia, the Gulf of Mexico, and Nigeria to propose practical design and policy recommendations.',
    tags: ['Artificial Reefs', 'Escape Gaps', 'Ecological Engineering', 'Entrapment'],
    file: '/docs/designed-escape-gaps-in-artificial-reefs-to-prevent-animals-entrapment.pdf',
    image: IMG.reef,
  },
  {
    id: 'hydroacoustic-navigation',
    title: 'Hydroacoustic Navigation in Mangrove Estuaries: Assessing Juvenile Shark Reliance on Root Vibratory Signatures',
    category: 'Shark Ecology',
    authors: ['EcoDome Research Team'],
    year: 2026,
    region: 'Global',
    abstract:
      'Mangrove nurseries offer juvenile sharks refuge from predators but present severe sensory challenges: tidal turbidity and suspended sediment neutralize visual navigation. This paper tests whether juvenile lemon sharks (Negaprion brevirostris) use their mechanoreceptive lateral line to map the vortices shed by tidal flow through red mangrove (Rhizophora mangle) stilt roots. Field hydroacoustic monitoring and laboratory mesocosms show a preference for root-like frequency signatures (5–25 Hz), with lateral-line ablation producing random movement.',
    tags: ['Lemon Sharks', 'Lateral Line', 'Hydroacoustics', 'Mangrove Roots'],
    file: '/docs/hydroacoustic-navigation-in-mangrove-estuaries-assessing-juvenile-shark-reliance-on-root-vibratory-signatures.pdf',
    image: IMG.shark2,
  },
  {
    id: 'recycled-hdpe-marine-conservation',
    title: 'Assessing the Environmental Safety of Recycled HDPE in Marine Conservation Applications',
    category: 'Marine Conservation',
    authors: ['Arya Umrikar'],
    year: 2026,
    region: 'Global',
    abstract:
      "This paper examines the environmental safety of recycled high-density polyethylene (rHDPE) in marine conservation through a synthesis of scientific literature and sustainability analysis. It reviews UV photo-oxidation, hydrolysis, and wave abrasion that embrittle the material over time, the resulting risk of secondary microplastics, and chemical leaching, while weighing those risks against the material's durability and circular-economy benefits. It concludes with monitoring and design safeguards for marine infrastructure.",
    tags: ['Recycled HDPE', 'Microplastics', 'Chemical Leaching', 'Marine Infrastructure'],
    file: '/docs/marine-conservation-hdpe.pdf',
    image: IMG.water,
  },
  {
    id: 'mangrove-carbon-sequestration',
    title: 'Role of Mangrove Forests on Sequestration of CO₂ in the Atmosphere',
    category: 'Blue Carbon Research',
    authors: ['Yatika Shah'],
    year: 2026,
    region: 'Global',
    abstract:
      'Mangrove forests capture and store large quantities of carbon, making them a key component of blue-carbon climate solutions. This review synthesizes research on how, where, and at what scale mangroves remove CO₂ from the atmosphere, including typical ecosystem carbon stocks of ~480–940 Mg C ha⁻¹ and global sequestration estimates of roughly 10–32 Tg C yr⁻¹. Case studies from Brazil, Seychelles, and the Sundarbans identify national blue-carbon hotspots, and restoration is shown to enhance sequestration.',
    tags: ['Blue Carbon', 'Carbon Sequestration', 'Climate Mitigation', 'Mangrove Soils'],
    file: '/docs/mangrove-carbon-sequestration.pdf',
    image: IMG.mangrove2,
  },
  {
    id: 'blue-carbon-ecodome-framework',
    title: 'Blue Carbon Dynamics and Accelerated Restoration Using HDPE Substrate Stabilization Frameworks',
    category: 'EcoDome Framework',
    authors: ['Mohammed Fawwaz'],
    year: 2026,
    region: 'Pacific Colombia',
    abstract:
      'Mangrove forests sequester atmospheric carbon at rates up to ten times greater than terrestrial tropical rainforests, but degradation has compromised this blue-carbon sink. This paper introduces the EcoDome framework: temporary modular recycled-HDPE dome structures deployed in a 50 m² pilot in the Esmeraldas–Pacific Colombia mangroves to stabilize sediment, prevent erosion, and shield vulnerable root systems. Preliminary operational metrics report faster root anchoring, reduced sediment displacement, and increased carbon-sequestration potential across restored substrates.',
    tags: ['Blue Carbon', 'HDPE Substrates', 'Sediment Stabilization', 'Restoration'],
    file: '/docs/blue-carbon-ecodome-framework.pdf',
    image: IMG.mangrove,
  },
  {
    id: 'mangrove-ecosystems-blue-carbon',
    title: 'Mangrove Ecosystems: Blue Carbon, Carbon Sequestration and Greenhouse Gas Emissions — Assessing Their Role in Climate Change Mitigation and Sustainable Future',
    category: 'Blue Carbon Research',
    authors: ['Shivman Kamboj'],
    year: 2026,
    region: 'Global',
    abstract:
      "Mangrove ecosystems function both as vital blue-carbon reservoirs and as potential greenhouse-gas emitters when stressed. Covering less than 15% of Earth's coastline, mangroves store carbon in waterlogged soils for centuries, yet aquaculture, pollution, and urban sprawl can turn them from carbon sinks into atmospheric hazards. Drawing on Global Mangrove Watch data and the Sundarbans, this paper examines the balance between carbon sequestration and microbial emissions, and reviews conservation and restoration strategies.",
    tags: ['Blue Carbon', 'Carbon Sequestration', 'Greenhouse Gases', 'Climate Mitigation'],
    file: '/docs/mangrove-ecosystems-blue-carbon.pdf',
    image: IMG.mangrove2,
  },
  {
    id: 'rooted-resilience',
    title: 'Rooted Resilience: Mangroves and Sediment Dynamics During Coastal Storm',
    category: 'Climate Impact',
    authors: ['Nethra Shree. S'],
    year: 2026,
    region: 'South Asia',
    abstract:
      'Coastal regions face rising seas and stronger storms that reshape shorelines and mobilize sediment. This study examines how mangrove coverage and vegetation density influence sediment behaviour during storm events, using secondary environmental studies and case examples from cyclone-prone coasts. It finds that denser mangroves consistently reduce sediment displacement and improve shoreline stability, reinforcing their role as nature-based coastal protection.',
    tags: ['Sediment Dynamics', 'Storm Surge', 'Coastal Protection', 'Nature-based Solutions'],
    file: '/docs/rooted-resilience-mangroves-sediment-storms.pdf',
    image: IMG.water,
  },
  {
    id: 'premature-open-water-migration',
    title: 'Effects of Premature Open-Water Migration on the Mortality of Shark Pups',
    category: 'Shark Conservation',
    authors: ['Rounak Gupta'],
    year: 2024,
    region: 'Global',
    abstract:
      'Shark pups depend on nursery habitats — mangroves, estuaries, seagrass meadows, and coastal lagoons — for protection and food during early life. Environmental disturbances increasingly force juveniles into open water before maturity, a phenomenon known as premature open-water migration. This study examines its causes and mortality consequences — predation, starvation, physiological stress, disease, and fisheries interactions — and argues for stronger nursery-habitat protection and adaptive management.',
    tags: ['Shark Pups', 'Nursery Habitat', 'Juvenile Mortality', 'Climate Change'],
    file: '/docs/premature-open-water-migration-shark-pups.pdf',
    image: IMG.shark,
  },
  {
    id: 'sediment-dynamics-mangrove-stability',
    title: 'Sediment Dynamics and Their Role in Mangrove Ecosystem Stability',
    category: 'Mangrove Conservation',
    authors: ['Rounak Gupta'],
    year: 2026,
    region: 'Global',
    abstract:
      'Mangrove ecosystems occupy the dynamic boundary between land and sea, where their survival depends on sediment supply, tidal transport, deposition, and erosion. This literature-based study examines how sediment dynamics sustain mangrove stability, how roots trap and stabilize sediment, and how sediment deficits or excessive burial can weaken forests under relative sea-level rise. It argues that sediment dynamics should be central to mangrove conservation and restoration.',
    tags: ['Sediment Dynamics', 'Accretion', 'Sea-Level Rise', 'Coastal Resilience'],
    file: '/docs/sediment-dynamics-mangrove-stability.pdf',
  },
]
