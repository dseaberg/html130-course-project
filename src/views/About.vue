<template>
  <main class="homeContainer container">
    <header class="header">
      <LogoBanner />
    </header>

    <nav class="nav">
      <Navigation />
    </nav>

    <section class="main">
      <h1>A Little About the Website</h1>
      <p>This website was built as a course project for part of the UW Frontend Development program. It's purpose is to be a website built using Vue.js and utilizes an API of some sort.</p>
      <p>
        APIs used:
        <ul>
          <li>
            <a href="https://www.themoviedb.org/documentation/api">The Movie DB (TMDB)</a>
          </li>
        </ul>
      </p>
    </section>

    <footer class="footer">
      <CommonFooter />
    </footer>

  </main>
</template>

<script>
  import CommonFooter from '../components/CommonFooter.vue';
  import LogoBanner from '../components/LogoBanner.vue';
  import Navigation from '../components/Navigation.vue';

  export default {
    name: 'Home',
    components: {
      CommonFooter,
      LogoBanner,
      Navigation
    }
  }
</script>

<style scoped lang="scss">
  .homeContainer {
    display: grid;
    grid-template-areas: "header header"
                         "nav main"
                         "footer footer";
    grid-template-columns: 1fr 3fr;
  }
  .header {
    grid-area: header;
    padding-top: 1rem;
    padding-bottom: 3rem;
  }
  .nav {
    grid-area: nav;
  }
  .main {
    grid-area: main;
  }
  .footer {
    grid-area: footer;
  }
</style>
