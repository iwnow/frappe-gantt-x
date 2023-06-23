import sass from 'rollup-plugin-sass';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

const inputPath = 'src/index.js';
const libName = 'Gantt';
const outFileName = 'frappe-gantt';

export default [config(), config({ prod: true })];


function config(options) {
    const { prod } = options || {};
    const plugins = [
        sass({
            output: true,
            options: {
                outputStyle: prod ? 'compressed' : 'expanded',
            },
        }),
    ];
    if (!prod) {
        plugins.push(
            serve({
                contentBase: [''],
                openPage: '/index.html',
                open: true,
            })
        );
    } else {
        plugins.push(terser());
    }
    return {
        input: inputPath,
        output: [
            {
                name: libName,
                file: `dist/${outFileName}${prod ? '.min' : ''}.js`,
                sourcemap: true,
                format: 'iife',
            },
            {
                name: libName,
                file: `dist/${outFileName}.es${prod ? '.min' : ''}.js`,
                sourcemap: true,
                format: 'es',
            }
        ],
        plugins: plugins,
    };
}


