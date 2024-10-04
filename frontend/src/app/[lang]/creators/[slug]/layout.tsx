export default async function LayoutRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div>{children}</div>
    </section>
  );
}
