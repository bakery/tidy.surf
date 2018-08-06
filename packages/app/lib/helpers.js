export function slugify(text) {
  return text && text.toLowerCase().replace(/\//ig, ' ').replace(/[^\w -]+/g, '').replace(/ +/g, '-')
    .replace(/-+/ig, '-');
}