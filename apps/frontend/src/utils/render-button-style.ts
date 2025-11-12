export function renderButtonStyle(type: string) {
  switch (type) {
    case "primary":
      return "button primary";
    case "secondary":
      return "button secondary";
    default:
      return "button";
  }
}
