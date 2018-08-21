export const makeId = spot => spot && `${spot.citySlug}-${spot.stateSlug}-${spot.countrySlug}`
export const slugify = text => text && 
  text.toLowerCase().replace(/\//ig, ' ').replace(/[^\w -]+/g, '').replace(/ +/g, '-').replace(/-+/ig, '-')
