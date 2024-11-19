"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import ActiveCollaborators from '../ActiveCollaborators'
import { Input } from './input'
import Image from 'next/image'
import { updateDocument } from '@/lib/actions/room.actions'

const CollaborativeRoom = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {
    const currentUserType = 'editor';
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            setLoading(true);
            try {
                if(documentTitle !== roomMetadata.title) {
                    const updatedDocument = await updateDocument({ roomId, title: documentTitle });

                    if(updatedDocument) {
                        setEditing(false);
                    }
                }

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setEditing(false);
                updateDocument({ roomId, title: documentTitle });
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    useEffect(() => {
        if(editing && inputRef.current) {
            inputRef.current.focus();
        }
    },[editing]);

    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                <div className='collaborative-room'>
                    <Header>
                        <div className=' flex w-fit items-center justify-center gap-2 mr-4' ref={containerRef}>
                            {editing && !loading ? (
                                <Input
                                    type='text'
                                    value={documentTitle}
                                    ref={inputRef}
                                    placeholder='Untitled'
                                    onChange={(e) => setDocumentTitle(e.target.value)}
                                    onKeyDown={updateTitleHandler}
                                    disable={(!editing).toString()}
                                    className='document-title-input'
                                />
                            ) : (
                                <>
                                    <p className='document-title'>{documentTitle}</p>
                                </>
                            )}

                            {currentUserType === 'editor' && !editing && (
                                <Image
                                    src={'/assets/icons/edit.svg'}
                                    alt="Edit"
                                    width={24}
                                    height={24}
                                    onClick={() => setEditing(true)}
                                    className=' cursor-pointer'
                                />
                            )}

                            {currentUserType !== 'editor' && !editing && (
                                <p className='view-only-tag'>
                                    View Only
                                </p>
                            )}

                            {loading && <p className=' text-sm text-gray-400'>Saving...</p>}
                        </div>
                        <div className=' flex w-full gap-2 sm:gap-4 justify-end'>
                            <ActiveCollaborators />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>
                    <Editor />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom