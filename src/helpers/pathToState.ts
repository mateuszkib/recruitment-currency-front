export function pathToState(path: string): string {
  if (path === "/") return "home";
  return path.replace(/^\//, "");
}
