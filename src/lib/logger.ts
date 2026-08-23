const RED = "\x1b[31m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

export function logError(context: string, error: unknown, extra?: Record<string, unknown>) {
  const timestamp = new Date().toISOString().slice(11, 23);

  console.error("");
  console.error(`${RED}${BOLD}━━━ [ERROR] ${context} ━━━${RESET}`);
  console.error(`${DIM}${timestamp}${RESET}`);

  if (error && typeof error === "object") {
    const e = error as Record<string, unknown>;
    if (e.message) console.error(`${RED}Message:${RESET} ${e.message}`);
    if (e.code) console.error(`${YELLOW}Code:${RESET}    ${e.code}`);
    if (e.details) console.error(`${CYAN}Details:${RESET} ${e.details}`);
    if (e.hint) console.error(`${CYAN}Hint:${RESET}    ${e.hint}`);
    if (e.status) console.error(`${YELLOW}Status:${RESET}  ${e.status}`);
  } else if (typeof error === "string") {
    console.error(`${RED}Error:${RESET} ${error}`);
  } else {
    console.error(`${RED}Error:${RESET}`, error);
  }

  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      console.error(`${DIM}${k}:${RESET} ${JSON.stringify(v)}`);
    }
  }

  console.error(`${RED}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
  console.error("");
}
