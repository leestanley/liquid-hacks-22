/** @type {import('next').NextConfig} */
const withImages = require("next-images");

module.exports = {
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }
  
      return config
    }
  }

module.exports = withImages();