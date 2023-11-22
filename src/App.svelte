<script>
  import svelteLogo from './assets/svelte.svg'
  import Logo from '/logo.svg'
</script>

<main>
  <div>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
    <a href="http://localhost:5173" target="_blank" rel="noreferrer">
      <img src={Logo} class="logo" alt="Logo" />
    </a>
  </div>
  <h1>Svelte + Vite PWA</h1>
  <p>Made with <a href="https://vite-pwa-org.netlify.app/" target="_blank" rel="noopener noreferrer">PWA Vite Plugin</a></p>

  <p>Augmented with <a href="https://vite-pwa-org.netlify.app/assets-generator/" target="_blank" rel="noopener noreferrer">assets generator</a> and custom screenshot generator using Puppeteer with dark mode 😎</p>

  <p>Customizable by PWA config file</p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #fdc04e);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
</style>
