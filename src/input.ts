import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

export async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stdin) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function normalizeRectangleLine(raw: string): string {
  return raw
    .trim()
    .split(/[\s,]+/)
    .filter((part) => part.length > 0)
    .join(" ");
}

export async function readInteractiveInput(): Promise<string> {
  const readline = createInterface({ input: stdin, output: stdout });

  let lineCount = 0;
  for (;;) {
    console.log("enter the count of rectangles:");
    const countLine = await readline.question("");
    const parsed = Number(countLine.trim());
    if (Number.isFinite(parsed) && Number.isInteger(parsed) && parsed >= 1) {
      lineCount = parsed;
      break;
    }
  }

  const lines: string[] = [String(lineCount)];

  for (let index = 0; index < lineCount; index++) {
    console.log("add the diaglnal corner cordinates with spaces:example 1 2 3 4");
    const cornerLine = await readline.question("");
    lines.push(normalizeRectangleLine(cornerLine));
  }

  await readline.close();
  return lines.join("\n");
}

export async function readProgramInput(): Promise<string> {
  if (stdin.isTTY) {
    return readInteractiveInput();
  }
  return readStdin();
}
