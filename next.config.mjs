/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n:{
    locales:['fr','ar'],
    defaultLocale:'fr'

  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
