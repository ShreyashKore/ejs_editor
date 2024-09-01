import { HydrateClient } from "~/trpc/server";
import { EditorPreview } from "./_components/editor_preview";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="text-onPrimary flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fbf0ff] to-[#f5e0ff]">
        <div className="container flex flex-col items-center justify-center gap-2 px-2">
          <div className="flex flex-col items-center">
            <h1 className="text-[1.5rem] font-extrabold tracking-tight">
              <span className="from-primary to-secondary bg-gradient-to-tr bg-clip-text text-transparent">
                EJS
              </span>{" "}
              Editor
            </h1>
            <h2 className="text-onSurface/50 text-[0.8rem]">
              Edit EJS and view the PDF output quickly
            </h2>
          </div>

          <EditorPreview className="flex h-[80vh] w-full flex-col gap-4 sm:flex-row" />
        </div>
      </main>
    </HydrateClient>
  );
}
