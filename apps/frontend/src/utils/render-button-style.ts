export function renderButtonStyle(type: string) {
  const defaultString =  "px-8 py-3 text-lg font-semibold rounded bg-accentBright text-dark hover:bg-accentBright/70 border-accentBright border border-2 hover:text-dark hover:no-underline";

  switch (type) {
    case "primary":
      return defaultString;
    case "secondary":
      return "px-8 py-3 text-lg font-semibold border border-2 bg-light hover:no-underline rounded border-accentDark/50";
    default:
      return defaultString;
  }
}
