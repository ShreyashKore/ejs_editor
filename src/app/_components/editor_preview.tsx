"use client";
import { render } from "../utils/ejs";

import { useEffect, useState, lazy, Suspense } from "react";
import Spacer from "./spacer";
import HtmlPreview from "./html_preview";
import dynamic from "next/dynamic";
import EditorLoading from "./editor_loading";
import { unknown } from "zod";

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

  return (
    <div className={className}>
      <div className="flex min-h-full w-1/2 flex-col">
        <div className="bg-primary/20 flex h-1/4 flex-col rounded-lg">
          <div className="flex flex-row items-center gap-2 px-2 py-1">
            <label className="text-sm">Input Data</label>
            {inputDataError != null && (
              <p className="text-error text-[0.8em]">{`${inputDataError}`}</p>
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

        <Spacer height={16} />

        <div className="bg-primary/20 flex h-3/4 flex-col rounded-lg">
          <div className="flex flex-row items-center gap-2 px-2 py-1">
            <label className="text-sm">Input EJS</label>
            {inputEjsError != null && (
              <p className="text-error text-[0.8em] font-light">
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
      </div>

      <div className="bg-secondary/10 min-h-full w-1/2 overflow-auto rounded-lg p-2">
        <HtmlPreview htmlContent={htmlString} />
      </div>
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
