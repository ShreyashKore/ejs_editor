import { HydrateClient } from "~/trpc/server";
import { EjsEditorAndPreview } from "./_components/ejs_editor_and_preview";
import { Logo } from "./_components/logo";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fbf0ff] to-[#f5e0ff] text-onPrimary">
        <WarningBanner />
        <div className="container flex flex-col items-center justify-center gap-2 px-2">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center">
              <Logo />
              <h2 className="text-[0.8rem] text-onSurface/50">
                Edit EJS and view the PDF output quickly
              </h2>
            </div>
          </div>
          <EjsEditorAndPreview className="flex h-[86vh] w-full flex-col gap-4 sm:flex-row" />
        </div>
      </main>
    </HydrateClient>
  );
}

function WarningBanner() {
  return (
    <div className="w-full bg-red-900 p-2 text-white">
      <div className="container mx-auto flex items-center justify-center">
        <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-sm">
          Warning: This editor executes JavaScript code directly. Only use
          trusted code.
        </p>
      </div>
    </div>
  );
}
