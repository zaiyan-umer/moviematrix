const plans = [
  {
    name: 'Mobile',
    resolution: '480p',
    price: 'Rs 250',
    quality: 'Fair',
    devices: ['Mobile phone', 'Tablet'],
    streams: 1,
    downloads: 1,
  },
  {
    name: 'Basic',
    resolution: '720p (HD)',
    price: 'Rs 450',
    quality: 'Good',
    devices: ['TV', 'Computer', 'Mobile phone', 'Tablet'],
    streams: 1,
    downloads: 1,
  },
  {
    name: 'Standard',
    resolution: '1080p (Full HD)',
    price: 'Rs 800',
    quality: 'Great',
    devices: ['TV', 'Computer', 'Mobile phone', 'Tablet'],
    streams: 2,
    downloads: 2,
  },
  {
    name: 'Premium',
    resolution: '4K (Ultra HD) + HDR',
    price: 'Rs 1,100',
    quality: 'Best',
    devices: ['TV', 'Computer', 'Mobile phone', 'Tablet'],
    streams: 4,
    downloads: 6,
    mostPopular: true,
  },
];

export default plans;
