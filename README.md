Node v22.17.0

## Script for fast dev start

```bash
npm ci && npm run dev

```

## Scripts

```bash
# Start development server
npm run dev

# Build for non static production
npm run build

# Preview static site
npm run preview

# Generate static site
npm run generate
```


## Generate Static Build With Docker

```bash
docker build -t checkngo-tips-generate .
docker run --name temp-container checkngo-tips-generate
docker cp temp-container:/app/.output .
docker rm temp-container
```

## Key Libraries

- **@headlessui/vue** - Unstyled, accessible UI components for Vue 3
- **@nuxtjs/i18n** - Internationalization module for Nuxt with Vue I18n
- **@pinia/nuxt** - Official state management for Vue with Nuxt integration
- **yup** - Schema validation library for form validation and data parsing