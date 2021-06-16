<template>
  <div id="nav">
    <ul class="nav nav-fill nav-pills flex-column">
      <li class="nav-item">
        <router-link v-if="currentPage === 'home'" class="nav-link active" to="/">Home</router-link>
        <router-link v-else class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="currentPage === 'trending'" class="nav-link active" to="/trending">Trending</router-link>
        <router-link v-else class="nav-link" to="/trending">Trending</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="currentPage === 'explore'" class="nav-link active" to="/explore">Explore</router-link>
        <router-link v-else class="nav-link" to="/explore">Explore</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="currentPage === 'details'" class="nav-link active" to="/details">Details</router-link>
        <router-link v-else class="nav-link" to="/details">Details</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="currentPage === 'about'" class="nav-link active" to="/about">About</router-link>
        <router-link v-else class="nav-link" to="/about">About</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    currentPage: String
  }
}
</script>
