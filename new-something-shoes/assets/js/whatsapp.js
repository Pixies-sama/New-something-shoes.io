import { CONFIG } from "./config.js";
export const WA_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z"/></svg>';
/** Absolute URL of the product's shareable page (WhatsApp turns it into a photo preview card). */
export const productUrl = (p) => new URL(`products/${p.id}.html`, document.baseURI).href;
const productMessage = (p) => [
  `Hello ${CONFIG.brandName}, I'm interested in this product:`, "",
  `*${p.name}* - ${CONFIG.currency}${p.price.toLocaleString("en-NG")}`,
  p.description,
  `Sizes: ${p.sizes[0]}-${p.sizes[p.sizes.length - 1]} | Colours: ${p.colours.join(", ")}`, "",
  `Photo & details: ${productUrl(p)}`, "",
  "Is it available?"
].join("\n");

/** Builds a wa.me URL with a pre-filled message. Pass a product, or nothing for a general enquiry. */
export function buildWhatsAppLink(product = null) {
  const message = product
    ? productMessage(product)
    : `Hello ${CONFIG.brandName}, I'd like to make an enquiry.`;
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}
