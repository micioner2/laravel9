const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .setResourceRoot("")
    .js('resources/js/app.js', 'public/assets/js')
    .vue()
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps('http://192.168.100.226/laravel9/public/');
