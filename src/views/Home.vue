<template>
  <div class="home">
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
      return `/week/${user.region}/${user.city}/${user.college}/${user.complex}/${user.group}`
    }
  },
}
</script>
