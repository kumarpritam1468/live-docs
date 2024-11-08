"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
    const roomId = nanoid();

    try {
        const roomMetadata = {
            creatorId: userId,
            email,
            title: "Untitled",
        }

        const usersAccesses: RoomAccesses = {
            [email]: ["room:write"],
        }

        const room = await liveblocks.createRoom(roomId, {
            metadata: roomMetadata,
            usersAccesses,
            defaultAccesses: [],
        });

        revalidatePath('/');

        return parseStringify(room);
    } catch (error) {
        console.error(`Error while creating document: ${error}`);
    }
}