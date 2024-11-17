"use server";

import Loading from '@/app/loading';
import CollaborativeRoom from '@/components/ui/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Document = async ({ params }: SearchParamProps) => {
  const { id } = await params;
  console.log(id);

  const clerkUser = await currentUser();

  const room = await getDocument({ roomId: id, userId: clerkUser?.emailAddresses[0].emailAddress! });

  if (!room) redirect('/');
  return (
    < main className=' flex items-center flex-col w-full'>
      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  )
}

export default Document