import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

export async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stdin) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function tokenizeCoordinates(raw: string): string[] {
  return raw
    .trim()
    .split(/[\s,]+/)
    .filter((part) => part.length > 0);
}

function tryFormatValidRectangleLine(raw: string): string | null {
  const parts = tokenizeCoordinates(raw);
  if (parts.length !== 4) {
    return null;
  }
  const values = parts.map(Number);
  for (const value of values) {
    if (!Number.isFinite(value)) {
      return null;
    }
  }
  return values.join(" ");
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
    console.error("Error: N must be a positive integer.");
  }

  const lines: string[] = [String(lineCount)];
  let validRectangleLines = 0;

  while (validRectangleLines < lineCount) {
    console.log("add the diaglnal corner cordinates with spaces:example '1 2 3 4'");
    const cornerLine = await readline.question("");
    const formatted = tryFormatValidRectangleLine(cornerLine);
    if (formatted === null) {
      console.error(
        "Error: need exactly four numeric coordinate values (x1 y1 x2 y2). Non-numeric or wrong count.",
      );
      continue;
    }
    lines.push(formatted);
    validRectangleLines += 1;
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
