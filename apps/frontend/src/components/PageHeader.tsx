interface PageHeaderProps {
  heading: string;
  text?: string;
}

export const PageHeader = ({ heading, text }: PageHeaderProps) => {
  return (
    <div className="my-16 w-full text-center">
      {text && <span className="text-dark font-bold">{text}</span>}
      <h2 className="text-4xl my-4 lg:text-5xl font-bold font-heading">
        {heading}
      </h2>
    </div>
  );
};
