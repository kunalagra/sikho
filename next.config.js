/** @type {import('next').NextConfig} */
const nextConfig = {
    staticPageGenerationTimeout: 150,
    webpack: (config) => {
        config.externals = [...config.externals, "bcrypt"];
        return config;
      },
    
}


module.exports = nextConfig
