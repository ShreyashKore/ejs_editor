import { HydrateClient } from "~/trpc/server";
import { EditorPreview } from "./_components/editor_preview";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="text-onPrimary flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#f5dbff] to-[#eadbf1]">
        <div className="container flex flex-col items-center justify-center gap-2 px-2">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[2rem]">
              <span className="from-primary to-secondary bg-gradient-to-tr bg-clip-text text-transparent">
                EJS
              </span>{" "}
              Editor
            </h1>
            <h2 className="text-onSurface/50">View EJS output quickly</h2>
          </div>

          <EditorPreview className="flex h-[80vh] w-full gap-4" />
        </div>
      </main>
    </HydrateClient>
  );
}
