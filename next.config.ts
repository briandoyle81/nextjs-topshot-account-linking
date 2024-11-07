import type { NextConfig } from "next";
//@ts-ignore
import FlowCadencePlugin from "flow-cadence-plugin";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(new FlowCadencePlugin({
      network: "mainnet",
    }))

    return config;
  },
};

export default nextConfig;
