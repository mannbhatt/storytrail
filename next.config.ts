import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
    images: {
      remotePatterns:[{
        protocol:"https",
        hostname:"lh3.googleusercontent.com",
        pathname:"/**",
      },{
        protocol:"https",
        hostname:"cdn.pixabay.com"
      },
      {
        protocol:"https",
        hostname:"utfs.io",
        pathname:"/**",
      },],
     },
  
};

export default nextConfig;
