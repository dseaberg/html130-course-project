<template>
  <main class="homeContainer container">

    <header class="header">
      <LogoBanner />
    </header>

    <nav class="nav">
      <Navigation currentPage="trending" />
    </nav>

    <section class="main">
      <h1>Today's Trends</h1>

      <TrendingItems sectionHeading="Trending Movies"
                     sectionId="1"
                     v-bind:trendingItems="trendingMovies" />
      <TrendingItems sectionHeading="Trending People"
                     sectionId="2"
                     v-bind:trendingItems="trendingPeople" />

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
  import TrendingItems from '../components/TrendingItems.vue';

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '5a354f2c083741d15560d4c00e1b9885';

  export default {
    name: 'Home',
    components: {
      CommonFooter,
      LogoBanner,
      Navigation,
      TrendingItems
    },
    data() {
      return {
        baseImageUrl: '',
        imageWidth: '',
        trendingMovies: [],
        trendingPeople: []
      }
    },
    mounted() {
      this.getApiConfig();
      this.getTrendingMovies();
      this.getTrendingPeople();
    },
    methods: {
      getApiConfig() {
        fetch(API_BASE_URL + '/configuration?api_key=' + API_KEY)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Request failed');
          }
        })
        .then((json) => {
          this.imageBaseUrl = json.images.base_url;
          this.imageWidth = json.images.poster_sizes[0];
        })
        .catch(err => {
          console.log('ERROR', err);
        })
      },
      getTrendingMovies() {
        fetch(API_BASE_URL + '/trending/movie/day?api_key=' + API_KEY)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          else {
            throw new Error('Request failed');
          }
        })
        .then((json) => {
          const movieList = [];
          json.results.forEach((movie, i) => {
            const movieData = {
              id: movie.id,
              name: movie.title,
              info: movie.overview,
              imageUrl: this.imageBaseUrl + this.imageWidth + '/' + movie.poster_path
            }
            movieList.push(movieData);
          });

          this.trendingMovies = movieList.slice(0, 5);
        })
        .catch(err => {
          console.log('ERROR', err);
          this.trendingMovies = [];
        })
      },
      getTrendingPeople() {
        fetch(API_BASE_URL + '/trending/person/day?api_key=' + API_KEY)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          else {
            throw new Error('Request failed');
          }
        })
        .then((json) => {
          const personList = [];
          json.results.forEach((person, i) => {
            const knownFilms = [];
            person.known_for.forEach((knownFilm) => {
              knownFilms.push(knownFilm.title);
            });

            const knownFor = 'Known for: ' + knownFilms.slice(0, 3).join(', ');
            const personData = {
              id: person.id,
              name: person.name,
              info: knownFor,
              imageUrl: this.imageBaseUrl + this.imageWidth + '/' + person.profile_path
            }
            personList.push(personData);
          });

          this.trendingPeople = personList.slice(0, 5);
        })
        .catch(err => {
          console.log('ERROR', err);
          this.trendingPeople = [];
        })
      }
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
