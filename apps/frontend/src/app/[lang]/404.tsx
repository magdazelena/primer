import Body from "../../components/Body";

export function NotFound({ params}: {params: { lang: string }}) {
    return  <html lang={params.lang}>
    <Body>
      <main className="text-dark min-h-screen">Oh no!</main>
    </Body>
  </html>
}