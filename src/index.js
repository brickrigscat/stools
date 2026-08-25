export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Main SuperTranslate route — exact URL requested by the user.
    if (url.pathname === "/SuperTranslate" || url.pathname === "/SuperTranslate/") {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = "/SuperTranslate/index.html";

      const response = await env.ASSETS.fetch(new Request(assetUrl, request));
      return withNoCache(response);
    }

    // Let Cloudflare Static Assets serve files beneath /SuperTranslate/.
    // This also makes future files like /SuperTranslate/curl.txt work automatically.
    if (url.pathname.startsWith("/SuperTranslate/")) {
      return env.ASSETS.fetch(request);
    }

    // Small root page so the Worker has a useful landing page.
    if (url.pathname === "/") {
      return new Response(
        `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>stools</title>
  <style>
    body{font-family:system-ui,sans-serif;background:#0b1020;color:#edf2ff;padding:32px}
    a{color:#7c9cff}
  </style>
</head>
<body>
  <h1>stools</h1>
  <p><a href="/SuperTranslate">Open SuperTranslate</a></p>
</body>
</html>`,
        {
          headers: {
            "Content-Type": "text/html; charset=UTF-8",
            "Cache-Control": "no-store"
          }
        }
      );
    }

    return new Response("404 Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=UTF-8" }
    });
  }
};

function withNoCache(response) {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
