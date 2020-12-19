<template>
  <div class="home">
    <p class="title-page">Настройки</p>
    <Splash text="Изменить данные" icon="edit" link="/start"></Splash>
  </div>
</template>

<script>
import Splash from "@/components/Splash";
export default {
  name: "Settings",
  components: {Splash}
}
</script>

<style scoped>

</style>
