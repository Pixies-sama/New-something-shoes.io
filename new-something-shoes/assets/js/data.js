import { CONFIG } from "./config.js";
let cache;
export async function loadProducts() {
  if (cache) return cache;
  const res = await fetch(CONFIG.paths.products);
  if (!res.ok) throw new Error("Could not load products.json");
  cache = (await res.json()).products;
  return cache;
}
