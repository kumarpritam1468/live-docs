"use client"

import React from 'react'
import { LiveblocksProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import Loading from './loading'

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
            <ClientSideSuspense fallback={<Loading />}>
                {children}
            </ClientSideSuspense>
        </LiveblocksProvider>
    )
}

export default Provider