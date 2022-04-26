const withLess = require('next-with-less');
const removeImports = require('next-remove-imports');

/** @type {import('next').NextConfig} */
const nextConfig = removeImports(withLess({
  lessLoaderOptions: {

  },
  typescript: {
    //ignoreBuildErrors: true,
  },
  reactStrictMode: true,
}))

module.exports = nextConfig
