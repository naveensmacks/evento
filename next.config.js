/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export", for static site generation(no server side rendering)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bytegrad.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
