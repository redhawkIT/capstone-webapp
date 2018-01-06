import config from 'config'
let manifest = {'common.js': 'common.js', 'vendor.js': 'vendor.js', 'app.js': 'app.js'}

const createAppScript = () => {
  //  NOTE: Removed <script async ... > due to render issues
  return `
    <script src="/assets/${manifest['common.js']}"></script>
    <script src="/assets/${manifest['vendor.js']}"></script>
    <script src="/assets/${manifest['app.js']}"></script>
  `
}

const createTrackingScript = () => config.has('analytics.google') ? createAnalyticsSnippet(config.get('analytics.google')) : ''

const createAnalyticsSnippet = id =>
  `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script src='https://www.google-analytics.com/analytics.js'></script>`

const createStylesheets = () => `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />`

export { createAppScript, createTrackingScript, createStylesheets }
