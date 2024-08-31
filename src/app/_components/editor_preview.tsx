"use client";
import { render } from "../utils/ejs";

import { useEffect, useState } from "react";
import Spacer from "./spacer";
import HtmlPreview from "./html_preview";

export function EditorPreview({ className }: { className: string }) {
  const [inputData, setInputData] = useState("");
  const [inputEjs, setInputEjs] = useState("");
  const [htmlString, setHtmlString] = useState("");
  const [inputDataError, setInputDataError] = useState<Error | null>(null);
  const [inputEjsError, setInputEjsError] = useState<Error | null>(null);

  useEffect(() => {
    const renderEjs = async () => {
      let data = {};
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
        {inputDataError && (
          <span className="text-error">{inputDataError?.toString()}</span>
        )}

        <textarea
          className="bg-primary/15 text-onPrimary focus:ring-primary placeholder-onPrimary/50 h-1/4 w-full resize-none rounded-lg p-2 transition-all focus:outline-none focus:ring-2"
          placeholder="Enter input data here..."
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        ></textarea>
        {/* <Spacer /> */}
        {inputEjsError && (
          <span className="text-error">{inputEjsError?.toString()}</span>
        )}

        <Spacer height={16} />

        <textarea
          className="bg-primary/15 text-onPrimary focus:ring-primary h-3/4 w-full resize-none rounded-lg p-2 placeholder-[#091E05]/50 transition-all focus:outline-none focus:ring-2"
          placeholder="Enter EJS format here..."
          value={inputEjs}
          onChange={(e) => setInputEjs(e.target.value)}
        ></textarea>
      </div>

      <div className="bg-secondary/10 min-h-full w-1/2 overflow-auto rounded-lg p-2">
        {/* <div dangerouslySetInnerHTML={{ __html: htmlString }} /> */}
        <HtmlPreview htmlContent={htmlString} />
      </div>
    </div>
  );
}

function tryParseJson(jsonString: string): { data: any; error: Error | null } {
  try {
    const data = JSON.parse(jsonString);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Failed to parse JSON"),
    };
  }
}

async function tryRender(
  template: string,
  data: any,
  options: any = null,
): Promise<{ html: string | undefined; error: any }> {
  try {
    const html = await render(template, data, options);
    return { html: html, error: null };
  } catch (e) {
    return { html: undefined, error: e };
  }
}
