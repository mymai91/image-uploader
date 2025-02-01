# Load Image from domain

```
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
    // Or if you prefer using remotePatterns for more specific control:
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      // TODO
      // change the hostname myapp.vercel.app with production domain
      {
        protocol: "https",
        hostname: "myapp.vercel.app",
        pathname: "/uploads/**",
      },
    ],
  },
}

export default nextConfig
```
