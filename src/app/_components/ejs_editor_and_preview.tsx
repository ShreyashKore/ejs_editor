"use client";
import { render } from "../utils/ejs";

import { useEffect, useState, lazy, Suspense } from "react";
import HtmlPreview from "./html_preview";
import EditorLoading from "./editor_loading";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";
import { tryParseJson, tryRender } from "../utils/utils";

const MonacoEditorWrapper = lazy(() => import("./editor"));

export function EjsEditorAndPreview({ className }: { className: string }) {
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
    renderEjs().catch((e) => console.log(e));
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
        className="min-h-[200px] gap-1 rounded-lg"
      >
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full min-h-full flex-col pr-1">
            <ResizablePanelGroup
              direction="vertical"
              className="min-h-[200px] gap-1 rounded-lg"
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
        <ResizablePanel defaultSize={1} className="rounded-lg bg-secondary/10">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row-reverse gap-2 p-1">
              <button
                onClick={() => printHtmlString(htmlString)}
                className="rounded-md bg-primary px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                PRINT
              </button>
              <button
                onClick={() => void navigator.clipboard.writeText(htmlString)}
                className="rounded-md bg-primary px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Copy
              </button>
            </div>

            <div className="flex h-full items-center justify-center overflow-auto p-2">
              {htmlString.trim().length === 0 ? (
                <div className="flex flex-col items-center gap-2 text-onSurface/50">
                  <p>Add your EJS template and input data to see the preview</p>
                  <p className="text-sm">The preview will appear here</p>
                </div>
              ) : (
                <HtmlPreview htmlContent={htmlString} />
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
