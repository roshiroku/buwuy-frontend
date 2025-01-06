export function remoteAsset(url) {
  if (url?.startsWith('/') && !url?.startsWith('/src/assets/')) {
    return `${import.meta.env.VITE_ROOT_URI}${url}`;
  }

  return url;
}
