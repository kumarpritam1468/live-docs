"use client"
// "use server";

import AddDocumentBtn from "@/components/AddDocumentBtn";
import Header from "@/components/Header"
import { SignedIn, UserButton, useUser } from "@clerk/nextjs"
// import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
// import Loading from "../loading";

const Home = () => {
  const { user: clerkUser } = useUser();

  if(!clerkUser) redirect("/sign-in");

  const documents = [];
  return (
    <main className=" home-container">

      <Header className=" flex w-full items-center justify-between" >
        <div className=" flex items-center gap-6">
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {documents.length > 0 ? (
        <div>

        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src={'/assets/icons/doc.svg'}
            alt="doc"
            width={40}
            height={40}
            className=" mx-auto"
          />

          <AddDocumentBtn userId={clerkUser?.id || ""} email={clerkUser?.emailAddresses[0].emailAddress || ""} />
        </div>
      )}

    </main>
  )
}

export default Home;