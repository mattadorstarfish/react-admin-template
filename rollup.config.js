import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';


// Convert CJS modules to ES6, so they can be included in a bundle
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import uglify from 'rollup-plugin-uglify';

const cssExportMap = {};
const isProd = process.env.NODE_ENV === 'production';

export default {
    input: 'src/app.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    sourcemap: true,
    external: [
        'react',
        'react-proptypes'
    ],
    plugins: [
        resolve(),
        postcss({
            plugins: [
                postcssModules({
                    getJSON (id, exportTokens) {
                        cssExportMap[id] = exportTokens;
                    }
                })
            ],
            getExportNamed: false,
            getExport (id) {
                return cssExportMap[id];
            },
            extract: 'dist/styles.css',
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        commonjs(),
        isProd && uglify(),
    ]
};