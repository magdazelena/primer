interface HighlightedTextProps {
  text: string;
  tag: string;
  className?: string;
  color?: string;
}

export const HighlightedText = ({
  text,
  tag,
  className,
  color,
}: HighlightedTextProps) => {
  const tempText = text.split(" ");
  const result = [];

  result.push(`<${tag} class="${className ? className : ""}">`);

  tempText.forEach((word: string, index: number) => {
    if (word.includes("[")) {
      const highlight = word.replace("[", "").replace("]", "");
      result.push(
        `<span key=${index} class="${color ? color : ""}">${highlight}</span> `,
      );
    } else result.push(word + " ");
  });

  result.push(`</${tag}>`);

  return <div dangerouslySetInnerHTML={{ __html: result.join("") }} />;
};
