import assert from 'node:assert/strict'
import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const files = ['index.html', 'class-style.css']
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    assert(!entry.isSymbolicLink(), 'Symbolic links are not allowed')
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) await collect(file)
    else files.push(file)
  }
}
await collect('groups')
const groups = (await readdir('groups', { withFileTypes: true })).filter((entry) => entry.isDirectory())
assert(groups.length > 0, 'No group websites found')
for (const group of groups) {
  assert((await stat(path.join('groups', group.name, 'index.html'))).isFile())
}
for (const file of files) {
  assert(!/\.(zip|localguide|pem|key)$/i.test(file) && !/(?:^|[/\\])(?:project\.json|\.env)/.test(file), `Private file: ${file}`)
  assert((await stat(file)).size < 50 * 1024 * 1024, `Oversize asset: ${file}`)
  if (!/\.(html|css)$/.test(file)) continue
  const text = await readFile(file, 'utf8')
  assert(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}/.test(text), `Possible credential: ${file}`)
  assert(!/(?:https?:\/\/)(?:localhost|127\.0\.0\.1)|file:\/\/|[A-Z]:\\Users\\/i.test(text), `Local URL: ${file}`)
  const refs = [...text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)].map((match) => match[1])
  for (const match of text.matchAll(/url\(\s*['"]?([^'")\s]+)['"]?\s*\)/g)) if (!match[1].startsWith('var(')) refs.push(match[1])
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(ref)) continue
    assert(!/^[a-z][a-z\d+.-]*:|^\/|^\\/i.test(ref), `Unsafe reference in ${file}`)
    const relative = decodeURIComponent(ref.split(/[?#]/)[0])
    const target = path.resolve(path.dirname(path.resolve(file)), relative)
    assert(target.startsWith(root + path.sep), `Reference outside site in ${file}`)
    assert((await stat(target)).isFile(), `Missing resource in ${file}: ${relative}`)
  }
}
const home = await readFile('index.html', 'utf8')
assert(home.includes('<h1 id="hero-title">石榴小旅行</h1>'), 'Incorrect title')
assert(!/data-filter|type="search"|photo-tag/.test(home), 'Unexpected search or tags')
assert.equal((home.match(/<article class="work-card"/g) ?? []).length, groups.length)
console.log(`PASS: ${groups.length} group websites, ${files.length} public files, all relative links/resources exist, no project backups.`)
