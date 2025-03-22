import Body from "../../components/Body";

export function NotFound({ params}: {params: { lang: string }}) {
    return  <html lang={params.lang}>
    <Body>
      <main className="min-h-screen text-dark">Oh no!</main>
    </Body>
  </html>
}