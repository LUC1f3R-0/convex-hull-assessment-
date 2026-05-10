import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

export async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stdin) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function readInteractiveMultiline(): Promise<string> {
  const readline = createInterface({ input: stdin, output: stdout });
  try {
    const countLine = await readline.question("");
    const rectangleCount = Number(countLine.trim());
    if (!Number.isFinite(rectangleCount) || !Number.isInteger(rectangleCount) || rectangleCount < 1) {
      throw new Error("N must be a positive integer.");
    }

    const expectedTokens = rectangleCount * 4;
    const storedLines: string[] = [countLine.trimEnd()];
    const tokens: string[] = [];

    while (tokens.length < expectedTokens) {
      const line = await readline.question("");
      storedLines.push(line);
      const lineTokens = line.trim().split(/\s+/).filter((part) => part.length > 0);
      for (const token of lineTokens) {
        tokens.push(token);
      }
      if (tokens.length > expectedTokens) {
        throw new Error(
          `Expected ${expectedTokens} coordinate values for ${rectangleCount} rectangles, but received ${tokens.length}.`,
        );
      }
    }

    return storedLines.join("\n");
  } finally {
    await readline.close();
  }
}

export async function readProgramInput(): Promise<string> {
  if (!stdin.isTTY) {
    return readStdin();
  }
  return readInteractiveMultiline();
}
