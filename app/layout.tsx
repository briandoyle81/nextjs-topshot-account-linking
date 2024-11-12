'use client';
import "./globals.css";
import flowJSON from '../flow.json'
import * as fcl from "@onflow/fcl";

import AuthProvider from "./providers/AuthProvider";

fcl.config({
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
  'accessNode.api': process.env.NEXT_PUBLIC_ACCESS_NODE_API,
  'flow.network': process.env.NEXT_PUBLIC_FLOW_NETWORK,
  'walletconnect.projectId': process.env.NEXT_PUBLIC_WALLETCONNECT_ID
}).load({ flowJSON });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
