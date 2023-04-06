const withSvgr = require("@newhighsco/next-plugin-svgr");
const withRemoveImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withRemoveImports(withSvgr(nextConfig));
