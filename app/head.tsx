// app/head.tsx
export default function Head() {
  return (
    <>
      <title>Your App Title</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      {/* Add other PWA-related tags if needed */}
    </>
  );
}
