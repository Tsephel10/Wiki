window.$docsify = {
  themeColor: '#ff9500',
  alias: {
    '/((?!bo).)*/_sidebar.md': '/_sidebar.md',
    '/((?!bo).)*/_navbar.md': '/_navbar.md',
    '/bo/.*/_sidebar.md': '/bo/_sidebar.md',
    '/bo/.*/_navbar.md': '/bo/_navbar.md'
  },
  auto2top: true,
  coverpage: false,
  executeScript: true,
  loadSidebar: true,
  loadNavbar: true,
  mergeNavbar: true,
  maxLevel: 4,
  subMaxLevel: 2,
  name: 'Monlam AI Wiki',
  search: {
    noData: {
      '/bo/': 'བཙལ་འབྲས་མེད།',
      '/': 'No results'
    },
    paths: 'auto',
    placeholder: {
      '/bo/': 'འཚོལ།',
      '/': 'Search'
    }
  },
  formatUpdated: '{MM}/{DD} {HH}:{mm}',
  externalLinkTarget: '_self',
  plugins: [
    EditOnGithubPlugin.create('https://github.com/cyanzhong/docs.taio.app/blob/master/docs/', null, path => {
      if (path.indexOf('bo/') === 0) {
        return '✍️';
      } else {
        return '✍️';
      }
    }),
    (hook, vm) => {
      hook.beforeEach(async(content, next) => {
        const path = vm.route.path;
        if (path.indexOf('/editor/math') !== -1) {
          await loadPlugin('mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML');
        } else if (path.indexOf('/editor/diagrams') !== -1) {
          const plugins = [
            'raphael/2.3.0/raphael.min.js',
            'underscore.js/1.11.0/underscore-min.js',
            'js-sequence-diagrams/1.0.6/sequence-diagram-min.js',
            'flowchart/1.15.0/flowchart.min.js',
            'mermaid/8.8.4/mermaid.min.js'
          ];
          for (const src of plugins) {
            await loadPlugin(src);
          }
        }
        next(content);
      });
      hook.doneEach(() => {
        renderMathJax();
        renderDiagrams();
      });
    }
  ]
};

function loadPlugin(path) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.onload = resolve;
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/${path}`;
    document.head.appendChild(script);
  });
}