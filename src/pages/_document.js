import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <style dangerouslySetInnerHTML={{ __html: `
          .nighty-night-shell { background-color: #17181c; }
          .nighty-night-content { display: flex; flex-direction: column; }
          @media (min-width: 1024px) {
            .nighty-night-content { flex-direction: row; }
            .nighty-night-content > aside { width: 20rem; flex-shrink: 0; }
          }
          @media (min-width: 1280px) {
            .nighty-night-content > aside { width: 24rem; }
          }
        `}} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
