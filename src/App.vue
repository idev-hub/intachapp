<template>
  <div id="nav" v-if="this.$store.state.user">
    <router-link to="/">Home</router-link>
    <router-link :to="getWeekUrl()">Week</router-link>
  </div>
  <router-view/>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    getWeekUrl() {
      const user = this.$store.state.user
      return `/week/${user.region}/${user.city}/${user.college}/${user.complex}/${user.group}`
    }
  },
}
</script>


<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-error {
  display: block;
  background: red;
  color: white;
  padding: 1em;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
