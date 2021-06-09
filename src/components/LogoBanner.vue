<template>
  <div class="bannerContainer">
    <img src="../assets/movie-theater.jpg" alt="Photo of a movie theather entrance">
    <h1>Movies and More!!</h1>
  </div>
</template>

<style scoped lang="scss">
  .bannerContainer {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
  img {
    width: 25%;
    padding-right: 2rem;
  }
  h1 {
    width: 70%;
    margin: 0.5rem;
    font-size: 4rem;
    font-family: "Lucidia Handwriting", cursive;
  }
</style>
