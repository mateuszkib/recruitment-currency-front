export function stateToPath(state: string): string {
  if (state === "home") return "/";
  return "/" + state;
}