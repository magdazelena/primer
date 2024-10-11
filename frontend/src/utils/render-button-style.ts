export function renderButtonStyle(type: string) {
  switch (type) {
    case "primary":
      return "px-8 py-3 text-lg font-semibold rounded bg-accentDark text-dark";
    case "secondary":
      return "px-8 py-3 text-lg font-semibold border rounded border-accentDark/50";
    default:
      return "px-8 py-3 text-lg font-semibold rounded bg-accentDark text-dark";
  }
}
