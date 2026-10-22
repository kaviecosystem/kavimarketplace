// KAVI MARKETPLACE - notification helper. Upload this file next to index.html (same folder).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const view = (e.notification.data && e.notification.data.view) || "market";
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of list) {
      if ("focus" in c) { await c.focus(); c.postMessage({ kaviView: view }); return; }
    }
    if (self.clients.openWindow) await self.clients.openWindow("./#" + view);
  })());
});
