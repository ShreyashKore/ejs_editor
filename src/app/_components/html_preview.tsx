"use-client";

import { useEffect, useRef } from "react";

const HtmlPreview = ({ htmlContent }: { htmlContent: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const shadowRoot =
        containerRef.current.shadowRoot ||
        containerRef.current.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = htmlContent;
    }
  }, [htmlContent]);

  return <div ref={containerRef}></div>;
};

export default HtmlPreview;
