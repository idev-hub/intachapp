<template>
  <div class="home">
    <p class="title">Главная</p>
    <Splash text="Расписание на неделю" icon="calendar" :link="getWeekUrl()"></Splash>
  </div>
</template>

<script>

import Splash from "@/components/Splash";
export default {
  name: 'Home',
  components: {Splash},
  methods: {
    getWeekUrl() {
      const user = this.$store.state.user
      return `/week/${user.region}/${user.city}/${user.college}/${user.complex}/${user.group}/undefined`
    }
  },
}
</script>
