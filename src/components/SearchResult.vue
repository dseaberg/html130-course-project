<template>
  <div class="searchResultContainer">
    <div class="searchResult__image">
      <img v-bind:src="itemImageUrl" v-bind:alt="itemImageAlt">
    </div>
    <div class="searchResult__details">
      <h3>{{ itemName }}</h3>
      <a v-bind:href="'#/details?itemType=' + itemType + '&itemId=' + itemId">More Details</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  props: {
    id: String,
    type: String,
    name: String,
    imageUrl: String,
    imageAlt: String
  },
}
</script>

<style scoped lang="scss">
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
