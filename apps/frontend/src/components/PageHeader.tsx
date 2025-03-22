interface PageHeaderProps {
  heading: string;
  text?: string;
}

export default function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div className="my-16 w-full text-center">
      {text && <span className="font-bold text-dark">{text}</span>}
      <h2 className="font-heading my-4 text-4xl font-bold lg:text-5xl">
        {heading}
      </h2>
    </div>
  );
}
