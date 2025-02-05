"use client";
import { render } from "../utils/ejs";

import { useEffect, useState, lazy, Suspense } from "react";
import Spacer from "./spacer";
import HtmlPreview from "./html_preview";
import dynamic from "next/dynamic";
import EditorLoading from "./editor_loading";
import { unknown } from "zod";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";

const MonacoEditorWrapper = lazy(() => import("./editor"));

export function EditorPreview({ className }: { className: string }) {
  const [inputData, setInputData] = useState("");
  const [inputEjs, setInputEjs] = useState("");
  const [htmlString, setHtmlString] = useState("");
  const [inputDataError, setInputDataError] = useState<unknown>(null);
  const [inputEjsError, setInputEjsError] = useState<unknown>(null);

  useEffect(() => {
    const renderEjs = async () => {
      let data: unknown = null;
      if (inputData) {
        const jsonResult = tryParseJson(inputData);
        data = jsonResult.data;
        setInputDataError(jsonResult.error);
        if (jsonResult.error) {
          return;
        }
      } else {
        setInputDataError(null);
      }
      const { html, error } = await tryRender(inputEjs, data);
      setInputEjsError(error);
      setHtmlString(html ?? "");
    };
    renderEjs();
  }, [inputData, inputEjs]);

  const printHtmlString = (htmlString: string) => {
    const printWindow = window.open("", "_blank")!!;
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          ${htmlString}
          <script>
            window.onload = function() { window.print(); window.close(); };
          </script>
        </body>
      </html>
    `);
    // printWindow.print();
    // printWindow.document.close();
  };

  return (
    <div className={className}>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] rounded-lg md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full min-h-full flex-col pr-1">
            <ResizablePanelGroup
              direction="vertical"
              className="min-h-[200px] rounded-lg md:min-w-[450px]"
            >
              <ResizablePanel defaultSize={1}>
                <div className="flex h-full flex-col rounded-lg bg-primary/20">
                  <div className="flex flex-row items-center gap-2 px-2 py-1">
                    <label className="text-sm">Input Data</label>
                    {inputDataError != null && (
                      <p className="text-[0.8em] text-error">{`${inputDataError}`}</p>
                    )}
                  </div>
                  <Suspense fallback={<EditorLoading />}>
                    <MonacoEditorWrapper
                      language="json"
                      className="resize-none rounded-lg transition-all"
                      value={inputData}
                      onChange={(value) => setInputData(value ?? "")}
                    />
                  </Suspense>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={2}>
                <div className="flex h-full flex-col rounded-lg bg-primary/20">
                  <div className="flex flex-row items-center gap-2 px-2 py-1">
                    <label className="text-sm">Input EJS</label>
                    {inputEjsError != null && (
                      <p className="text-[0.8em] font-light text-error">
                        {inputEjsError.toString()}
                      </p>
                    )}
                  </div>
                  <Suspense fallback={<EditorLoading />}>
                    <MonacoEditorWrapper
                      language="html"
                      className="resize-none rounded-lg transition-all"
                      value={inputEjs}
                      onChange={(value) => setInputEjs(value ?? "")}
                    ></MonacoEditorWrapper>
                  </Suspense>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={1}>
          <div className="flex flex-col">
            <button
              onClick={() => printHtmlString(inputEjs)}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              PRINT
            </button>
            <div className="flex h-full items-center justify-center overflow-auto rounded-lg bg-secondary/10 p-2">
              <HtmlPreview htmlContent={htmlString} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

function tryParseJson(jsonString: string): { data: unknown; error: unknown } {
  try {
    const data = JSON.parse(jsonString);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}

async function tryRender(
  template: string,
  data: unknown,
  options: unknown = null,
): Promise<{ html: string | undefined; error: unknown }> {
  try {
    const html = await render(template, data, options);
    return { html: html, error: null };
  } catch (e) {
    return { html: undefined, error: e };
  }
}
