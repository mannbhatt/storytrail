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
      },{
        protocol:"https",
        hostname:"a2buwabb1g.ufs.sh",
        pathname:"/**",
      },
      ],
     },
  
};

export default nextConfig;
