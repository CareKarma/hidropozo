/**
 * Actualiza (o crea) el <link rel="canonical"> del documento.
 * El canonical vive estático en index.html apuntando a la portada;
 * cada página con ruta propia debe fijar aquí su URL canónica.
 */
export function setCanonical(doc: Document, url: string): void {
  let link = doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    doc.head.appendChild(link);
  }
  link.setAttribute('href', url);
}
