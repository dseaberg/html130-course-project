<template>
  <div class="featuredItemContainer">
    <div class="featuredItem__image">
      <img v-bind:src="itemImageUrl" v-bind:alt="itemImageAlt">
    </div>
    <div class="featuredItem__details">
      <h3>{{ itemName }}</h3>
      <p>
        <span class="bold">{{ tidbitTitle }}:</span> {{ tidbitContent }}
      </p>
      <p>
        <span class="bold">{{ aboutTitle }}:</span> {{ aboutContent }}
      </p>
      <p>
        <a href="#">More Details</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedItem',
  props: {
    itemName: String,
    tidbitTitle: String,
    tidbitContent: String,
    aboutTitle: String,
    aboutContent: String,
    itemImageUrl: String,
    itemImageAlt: String
  }
}
</script>

<style scoped lang="scss">
  $highlightColor: #371BB1;

  .featuredItemContainer {
    display: flex;
    flex-flow: row nowrap;
    border: 2px $highlightColor solid;

    .featuredItem__image {
      width: 20%;
      padding: 0.5rem;
    }
    .featuredItem__image img {
      width: 100%;
    }
    .featuredItem__details {
      width: 80%;
      padding: 0.5rem;
    }
  }
  .bold {
    font-weight: bold;
  }
</style>
