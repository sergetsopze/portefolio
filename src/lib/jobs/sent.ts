import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "sent-ids.json");

async function readIds() {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as string[];
    return new Set(parsed);
  } catch {
    return new Set<string>();
  }
}

export async function takeUnsent(ids: string[]) {
  const sent = await readIds();
  const fresh = ids.filter((id) => !sent.has(id));
  return { fresh, sent };
}

export async function markSent(ids: string[]) {
  const sent = await readIds();
  for (const id of ids) sent.add(id);
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify([...sent].slice(-2000), null, 2));
}
