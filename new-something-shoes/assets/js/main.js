import { loadProducts } from "./data.js";
import { renderGrid, galleryItemHTML } from "./render.js";
import { initFilters } from "./filters.js";
import { initModal } from "./modal.js";
import { initNav } from "./nav.js";
import { buildWhatsAppLink } from "./whatsapp.js";

const $ = (id) => document.getElementById(id);

(async function init() {
  initNav();
  const pid = document.body.dataset.productId; // product detail page
  if (pid) {
    try {
      const p = (await loadProducts()).find((x) => x.id === pid);
      document.querySelectorAll("[data-wa-product]").forEach((a) => (a.href = buildWhatsAppLink(p)));
    } catch {}
    return;
  }
  const grid = $("product-grid"), featured = $("featured-grid"), gallery = $("gallery-grid");
  const target = grid || featured || gallery;
  if (!target) return; // About / Contact need no product logic

  let products;
  try { products = await loadProducts(); }
  catch { target.innerHTML = '<p class="empty">Products could not load. If you opened the file directly, run a local server (see README).</p>'; return; }

  initModal(products, { compact: !!gallery });

  if (featured) {
    renderGrid(featured, featured.dataset.ids.split(",").map((id) => products.find((p) => p.id === id)).filter(Boolean));
    return;
  }

  const params = new URLSearchParams(location.search);
  const input = $("search");
  if (input) {
    if (params.get("q")) input.value = params.get("q");
    if (params.get("focus") === "search") input.focus();
  }

  let limit = 8;
  const more = $("show-more");
  const draw = (list) => {
    if (!gallery) return renderGrid(grid, list);
    renderGrid(gallery, list.slice(0, limit), galleryItemHTML);
    more.hidden = list.length <= limit;
    more.onclick = () => { limit += 8; draw(list); };
  };
  initFilters(products, {
    base: { category: document.body.dataset.category || "all" },
    onChange: (list) => { limit = 8; draw(list); }
  });

  const key = params.get("f");
  const chip = key && document.querySelector(`.chip[data-key="${CSS.escape(key)}"]`);
  if (chip) chip.click();
})();
