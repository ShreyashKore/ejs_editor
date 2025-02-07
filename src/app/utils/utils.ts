import { render } from "./ejs";

export function tryParseJson(jsonString: string): {
  data?: string;
  error?: unknown;
} {
  try {
    const data = JSON.parse(jsonString);
    return { data };
  } catch (error) {
    return { error: error };
  }
}

export async function tryRender(
  template: string,
  data: unknown,
  options: unknown = null,
): Promise<{ html?: string; error?: unknown }> {
  try {
    const html = await render(template, data, options);
    return { html: html };
  } catch (e) {
    return { error: e };
  }
}
