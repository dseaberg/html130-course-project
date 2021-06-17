<template>
  <main class="homeContainer container">
    <header class="header">
      <LogoBanner />
    </header>

    <nav class="nav">
      <Navigation currentPage="explore" />
    </nav>

    <section class="main">
      <h1>Searching for things</h1>

      <form class="row row-cols-lg-auto g-3 align-items-center">
        <div class="col-12">
          <label for="searchQueryInput" class="visually-hidden">Seach Query</label>
          <input type="text" id="searchQueryInput" class="form-control" name="seachValue" v-model="inputSearchQuery" placeholder="Enter search here...">
        </div>
        <div class="col-12">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="movie" value="movie" id="searchQueryType1" v-model="inputQueryType">
            <label class="form-check-label" for="searchQueryType1">
              Movies
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="person" value="person" id="searchQueryType2" v-model="inputQueryType">
            <label class="form-check-label" for="searchQueryType2">
              People
            </label>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary" v-on:click.prevent="getSearchResults">Search</button>
        </div>
      </form>

      <div class="searchResultsContainer">
        <div class="searchResultItem" v-for="result in searchResults">
          <!-- TODO: Figure out why Vue couln't find the SeachResult component -->
          <!--SearchResult v-bind:id="result.id"
                        v-bind:type="result.type"
                        v-bind:name="result.name"
                        v-bind:imageUrl="result.imageUrl"
                        v-bind:imageAlt="result.imageAlt" /-->

          <div class="searchResultContainer">
            <div class="searchResult__image">
              <img v-bind:src="result.imageUrl" v-bind:alt="result.imageAlt">
            </div>
            <div class="searchResult__details">
              <h3>{{ result.name }}</h3>
              <a v-bind:href="'#/details?itemType=' + result.type + '&itemId=' + result.id">More Details</a>
            </div>
          </div>
        </div>
      </div>

    </section>

    <footer class="footer">
      <CommonFooter />
    </footer>

  </main>
</template>

<script>
  import CommonFooter from '../components/CommonFooter.vue';
  import LogoBanner from '../components/LogoBanner.vue';
  import SearchResult from '../components/SearchResult.vue';
  import Navigation from '../components/Navigation.vue';

  import defaultMovieImageUrl from '../assets/movie-default.jpg';
  import defaultPersonImageUrl from '../assets/person-default.png';

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '5a354f2c083741d15560d4c00e1b9885';

  export default {
    name: 'Home',
    components: {
      CommonFooter,
      LogoBanner,
      Navigation
    },
    data() {
      return {
        searchResults: [],
        searchItemType: 'movies',
        imageBaseUrl: '',
        imageWidthMovie: '',
        imageWidthPerson: '',
        defaultMovieImageUrl: defaultMovieImageUrl,
        defaultPersonImageUrl: defaultPersonImageUrl,
        inputSearchQuery: '',
        inputQueryType: 'movie'
      }
    },
    mounted() {
      this.getApiConfig();
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
          console.log(json);
          this.imageBaseUrl = json.images.base_url;
          this.imageWidthMovie = json.images.poster_sizes[0];
          this.imageWidthPerson = json.images.profile_sizes[0];
        })
        .catch(err => {
          console.log('ERROR', err);
        })
      },
      getSearchResults() {
        const searchQuery = this.inputSearchQuery;
        const queryType = this.inputQueryType;

        console.log('query type', queryType);
        if (searchQuery === '') {
          this.searchResults = [];
        }
        else {
          console.log(API_BASE_URL + '/search/' + queryType + '?api_key=' + API_KEY + '&query=' + searchQuery);
          fetch(API_BASE_URL + '/search/' + queryType + '?api_key=' + API_KEY + '&query=' + searchQuery)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            else {
              throw new Error('Request failed');
            }
          })
          .then((json) => {
            let results = [];

            if (queryType === 'movie') {
              json.results.forEach((movie, i) => {
                console.log('here');
                let posterUrl = this.defaultMovieImageUrl;
                if (movie.poster_path !== null) {
                  posterUrl = this.imageBaseUrl + this.imageWidthMovie + '/' + movie.poster_path;
                }
                const movieData = {
                  id: movie.id,
                  type: 'movie',
                  name: movie.title,
                  imageUrl: posterUrl,
                  imageAlt: 'The movie poster of ' + movie.title
                }
                results.push(movieData);
              });
            }
            else if (queryType === 'person') {
              json.results.forEach((person, i) => {
                let personUrl = this.defaultPersonImageUrl;
                if (person.profile_path !== null) {
                  personUrl = this.imageBaseUrl + this.imageWidthPerson + '/' + person.profile_path;
                }
                const personData = {
                  id: person.id,
                  type: 'person',
                  name: person.name,
                  imageUrl: personUrl,
                  imageAlt: 'The photo of ' + person.name
                }
                results.push(personData);
              });
            }

            this.searchResults = results.slice(0, 10);
          })
          .catch(err => {
            console.log('ERROR', err);
            this.item = {};
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $highlightColor: #371BB1;

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
  .searchResultItem {
    border: 2px $highlightColor solid;
  }
  form {
    padding: 2rem;
  }

  .searchResultContainer {
    display: flex;
    flex-direction: row;
    padding: 1rem;

    .searchResult__image {
      margin-right: 1rem;
      img {
        max-width: 50px;
      }
    }
  }
</style>
