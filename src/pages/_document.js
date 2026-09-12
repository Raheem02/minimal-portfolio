import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; img-src 'self' data: https: blob:; connect-src 'self' https:;" />
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
