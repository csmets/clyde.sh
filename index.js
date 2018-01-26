const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const sass = require('metalsmith-sass');
const sasslint = require('metalsmith-sass-lint');
const autoprefixer = require('metalsmith-autoprefixer');
const encode_html = require('metalsmith-encode-html');
const drafts = require('metalsmith-drafts');
const permalinks = require('metalsmith-permalinks');
const metadata = require('metalsmith-metadata-directory');
const layouts = require('metalsmith-layouts');

Metalsmith(__dirname)
    .metadata({
        sitename: 'clyde.sh'
    })
    .source('./src/doc')
    .destination('./dist')
    .clean(true)
    .use(metadata({
        directory: './src/metadata/**/*.json'
    }))
    .use(drafts())
    .use(encode_html())
    .use(markdown())
    .use(permalinks())
    .use(layouts({
        engine: 'nunjucks',
        directory: './src/layouts',
        default: 'default.njk',
        pattern: '**/*.html'
    }))
    .build((err) => {
        if (err) throw err;
    });

Metalsmith(__dirname)
    .source('./src/scss')
    .destination('./dist/css')
    .clean(false)
        .use(sasslint({
        configFile: '.stylelintrc',
    }))
    .use(sass({
        outputStyle: 'expanded',
    }))
    .use(autoprefixer())
    .build((err) => {
        if (err) throw err;
    });
