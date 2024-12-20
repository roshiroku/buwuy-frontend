export function resolveUrl(url) {
  return url.startsWith('/') ? `${import.meta.env.VITE_ROOT_URI}${url}` : url;
}
