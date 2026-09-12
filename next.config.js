/** @type {import('next').NextConfig} */
// Force SWC WASM mode to prevent Windows Defender Application Control from blocking native binary
if (process.platform === 'win32') {
  process.versions.webcontainer = '1';
}
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
