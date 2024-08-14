interface RichTextModule {
  type: "string";
  children: RichTextElement[];
}
interface RichTextElement {
  type: "string";
  text: "string";
}

export { RichTextModule, RichTextElement };
