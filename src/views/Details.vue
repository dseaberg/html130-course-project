<template>
  <main class="homeContainer container">
    <header class="header">
      <LogoBanner />
    </header>

    <nav class="nav">
      <Navigation currentPage="details" />
    </nav>

    <section class="main">
      <h1>The Details</h1>
      <div v-if="showError">
        <p>Oh oh! Looks like we couldn't load anything!</p>
      </div>
      <div v-else>
        <div class="imageAndTitle">
          <img v-bind:src="item.imageUrl" v-bind:alt="'A photo of ' + item.name">
          <div class="titleContainer">
            <h2>{{ item.name }}</h2>
            <p><span class="fw-bold">{{ item.dateLabel }}:</span> {{ item.date }}</p>
            <p><span class="fw-bold">{{ item.tidbitLabel }}:</span> {{ item.tidbit }}</p>
          </div>
        </div>
        <div class="itemDetails">
          <p><span class="fw-bold">{{ item.infoLabel }}:</span> {{ item.info }}</p>
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
  import Navigation from '../components/Navigation.vue';

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
        // TODO: itemId and itemType can probably come from query parameters
        //itemId: '337404', // cruella
        itemId: '54693', // emma stone
        //itemType: 'movie',
        itemType: 'person',
        imageBaseUrl: '',
        imageWidth: '',
        item: {},
        showError: false
      }
    },
    mounted() {
      this.getApiConfig();
      if (this.itemType === 'movie') {
        this.getMovieDetails();
      } else if (this.itemType === 'person') {
        this.getPersonDetails();
      } else {
        this.showError = true;
      }
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
          this.imageWidthMovie = json.images.poster_sizes[2];
          this.imageWidthPerson = json.images.profile_sizes[1];
        })
        .catch(err => {
          console.log('ERROR', err);
        })
      },
      getMovieDetails() {
        console.log(API_BASE_URL + '/movie/' + this.itemId + '?api_key=' + API_KEY);
        fetch(API_BASE_URL + '/movie/' + this.itemId + '?api_key=' + API_KEY)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          else {
            throw new Error('Request failed');
          }
        })
        .then((json) => {
          this.item = {
            id: json.id,
            name: json.title,
            dateLabel: 'Release Date',
            date: json.release_date,
            tidbitLabel: 'Produced By',
            tidbit: json.production_companies[0].name,
            infoLabel: 'Overview',
            info: json.overview,
            imageUrl: this.imageBaseUrl + this.imageWidthMovie + '/' + json.poster_path
          }
          console.log('item', this.item);
        })
        .catch(err => {
          console.log('ERROR', err);
          this.item = {};
        })
      },
      getPersonDetails() {
        console.log(API_BASE_URL + '/person/' + this.itemId + '?api_key=' + API_KEY);
        fetch(API_BASE_URL + '/person/' + this.itemId + '?api_key=' + API_KEY)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          else {
            throw new Error('Request failed');
          }
        })
        .then((json) => {
          this.item = {
            id: json.id,
            name: json.name,
            dateLabel: 'Birthday',
            date: json.birthday,
            tidbitLabel: 'Place of Birth',
            tidbit: json.place_of_birth,
            infoLabel: 'About',
            info: json.biography,
            imageUrl: this.imageBaseUrl + this.imageWidthPerson + '/' + json.profile_path
          }
          console.log('item', this.item);
        })
        .catch(err => {
          console.log('ERROR', err);
          this.item = {};
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
  h1 {
    margin-bottom: 1rem;
  }
  .imageAndTitle {
    display: flex;
    flex-direction: row;
    padding-bottom: 2rem;

    img {
      padding-right: 1rem;
    }
  }
</style>
