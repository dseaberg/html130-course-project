<template>
  <div class="trendingItemsContainer">
    <h2>{{ sectionHeading }}</h2>
    <div class="accordion" v-bind:id="'itemAccordion' + sectionId">

      <!-- start v-for -->
      <div class="accordion-item" v-for="item in trendingItems">
        <h3 class="accordion-header" v-bind:id="'item' + item.id">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#itemCollapse' + item.id">
            {{ item.name }}
          </button>
        </h3>
        <div v-bind:id="'itemCollapse' + item.id" class="accordion-collapse collapse" v-bind:data-bs-parent="'#itemAccordion' + sectionId">
          <div class="accordion-body">
            <img v-bind:src="item.imageUrl" v-bind:alt="'A photo of ' + item.name">
            <p>{{ item.info }}</p>
          </div>
        </div>
      </div>
      <!-- end v-for -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'TrendingItems',
  props: {
    sectionHeading: String,
    sectionId: String,
    trendingItems: Object
  }
}
</script>
