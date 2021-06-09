<template>
  <main class="homeContainer container">
    <header class="header">
      <LogoBanner />
    </header>

    <nav class="nav">
      <Navigation />
    </nav>

    <section class="main">
      <h1>Today's Featured Items</h1>
      <p>Some content should probably go here.</p>
      <FeaturedItem class="pb-3"
                    itemName="Knives Out"
                    tidbitTitle="Staring"
                    tidbitContent="Daniel Craig, Chris Evans, Ana de Armas"
                    aboutTitle="About"
                    aboutContent="A wealthy author is found murdered, and each member of his shady has their own potential motive."
                    itemImageUrl="../assets/knives-out.png"
                    itemImageAlt="Movie poster for Knives Out" />
      <FeaturedItem class="pb-3"
                    itemName="Denzel Washington"
                    tidbitTitle="Stars in"
                    tidbitContent="Training Day, The Book of Eli"
                    aboutTitle="About"
                    aboutContent="Has starred in many movies, and often portrays very intense personas."
                    itemImageUrl="https://m.media-amazon.com/images/M/MV5BMjE5NDU2Mzc3MV5BMl5BanBnXkFtZTcwNjAwNTE5OQ@@._V1_UY317_CR12,0,214,317_AL_.jpg"
                    itemImageAlt="Facial shot of Denzel Washington" />
      <FeaturedItem class="pb-3"
                    itemName="Charlize Theron"
                    tidbitTitle="Stars in"
                    tidbitContent="Atomic Blonde, Bombshell"
                    aboutTitle="About"
                    aboutContent="Known for roles in action movies, but also plays other roles as well."
                    itemImageUrl="https://m.media-amazon.com/images/M/MV5BMTk5Mzc4ODU0Ml5BMl5BanBnXkFtZTcwNjU1NTI0Mw@@._V1_UY317_CR12,0,214,317_AL_.jpg"
                    itemImageAlt="Facial shot of Charlize Theron" />
    </section>

    <footer class="footer">
      <CommonFooter />
    </footer>

  </main>
</template>

<script>
  import CommonFooter from '../components/CommonFooter.vue';
  import FeaturedItem from '../components/FeaturedItem.vue';
  import LogoBanner from '../components/LogoBanner.vue';
  import Navigation from '../components/Navigation.vue';

  export default {
    name: 'Home',
    components: {
      CommonFooter,
      FeaturedItem,
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
