import config from 'config'
import assets from '../../../public/assets/manifest.json'

import fs from 'fs'
import path from 'path'
// Use fs.readFileSync(...) instead of require(...) to avoid webpack complaining about missing file
const manifestPath = path.join(process.cwd(), 'public/assets/app-manifest.json')
let manifest = {'common.js': 'common.js', 'vendor.js': 'vendor.js', 'app.js': 'app.js'}

if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath), 'utf8')
}

const createAppScript = () => {
  //  NOTE: Removed <script async ... > due to render issues
  return `
    <script src="/assets/${manifest['common.js']}"></script>
    <script src="/assets/${manifest['vendor.js']}"></script>
    <script src="/assets/${manifest['app.js']}"></script>
  `
}

// const createAppScript = () => `<script type="text/javascript" charset="utf-8" src="/assets/${assets['app.js']}"></script>`

const createTrackingScript = () => config.has('analytics.google') ? createAnalyticsSnippet(config.get('analytics.google')) : ''

const createAnalyticsSnippet = id =>
  `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script src='https://www.google-analytics.com/analytics.js'></script>`

const createStylesheets = () => `
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
<link rel="stylesheet" href="/assets/${assets['app.css']}" />
`

export { createAppScript, createTrackingScript, createStylesheets }
