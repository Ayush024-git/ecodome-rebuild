import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { papers } from '../lib/papers.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const ids = new Set()

for (const [i, paper] of papers.entries()) {
  const where = `papers[${i}]${paper?.id ? ` (${paper.id})` : ''}`

  if (!paper?.id) errors.push(`${where}: missing id`)
  else if (ids.has(paper.id)) errors.push(`${where}: duplicate id "${paper.id}"`)
  else ids.add(paper.id)

  for (const key of ['title', 'category', 'year', 'region', 'abstract', 'file']) {
    if (!paper?.[key]) errors.push(`${where}: missing ${key}`)
  }
  if (!Array.isArray(paper?.authors) || paper.authors.length === 0) errors.push(`${where}: authors must be a non-empty array`)
  if (!Array.isArray(paper?.tags) || paper.tags.length === 0) errors.push(`${where}: tags must be a non-empty array`)

  if (typeof paper?.file === 'string') {
    if (!paper.file.startsWith('/docs/')) errors.push(`${where}: file must live under /docs/`)
    else if (!fs.existsSync(path.join(root, 'public', paper.file))) errors.push(`${where}: missing PDF public${paper.file}`)
  }
}

if (errors.length) {
  console.error(`Paper check failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

const docsDir = path.join(root, 'public', 'docs')
const pdfFiles = fs.readdirSync(docsDir).filter((f) => f.toLowerCase().endsWith('.pdf'))
const listed = new Set(papers.map((p) => p.file))
const orphaned = pdfFiles.filter((f) => !listed.has(`/docs/${f}`))
if (orphaned.length) {
  console.error(`Paper check failed:\n- unlisted PDFs in public/docs:\n  - ${orphaned.join('\n  - ')}`)
  process.exit(1)
}

console.log(`Paper check passed: ${papers.length} papers, ${pdfFiles.length} PDFs, ${ids.size} unique ids, all listed files present.`)
