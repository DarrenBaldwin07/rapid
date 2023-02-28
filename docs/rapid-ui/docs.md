# Documentation for Rapid UI

# Initializing Rapid UI in an existing application

## Vite
Begin by installing the tailwindCSS depedencies:
```bash
npm install -D tailwindcss postcss autoprefixer
```

Initialize rapid-ui using the rapid cli:
```bash
rapid-cli init --vite
```

Locate your vite.config.ts file and add the following to the config object:
> Before doing this make sure you import postcss config at the top: `import postcss from './postcss.config'`
```bash
css: {
    postcss
}
```

Finally be sure to import your css file inside the vite entrypoint: `import index.css`

## Remix
