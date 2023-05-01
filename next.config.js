const withSvgr = require("@newhighsco/next-plugin-svgr");
const withRemoveImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-hotjar"],
};

module.exports = withRemoveImports(withSvgr(nextConfig));
