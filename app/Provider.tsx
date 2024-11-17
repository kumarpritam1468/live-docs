"use client"

import React from 'react'
import { LiveblocksProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import Loading from './loading'
import { getClerkUsers } from '@/lib/actions/user.actions'

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <LiveblocksProvider
            authEndpoint={"/api/liveblocks-auth"}
            resolveUsers={async ({ userIds }) => {
                const users = await getClerkUsers({ userIds });

                return users;
            }}
        >
            <ClientSideSuspense fallback={<Loading />}>
                {children}
            </ClientSideSuspense>
        </LiveblocksProvider>
    )
}

export default Provider