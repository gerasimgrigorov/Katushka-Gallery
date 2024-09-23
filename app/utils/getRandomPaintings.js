export function getRandomPaintings(imageGallery, num) {
  const shuffled = [...imageGallery].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}