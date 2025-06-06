/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [
      {
        hostname: 'rickandmortyapi.com',
        protocol: 'https',
      },
    ],
  },
}
 
export default nextConfig