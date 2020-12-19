<template>
  <div class="home">
    <p class="title">Данные</p>
    <Splash text="Изменить свой данные" icon="edit" link="/start"></Splash>

    <p class="title">Уведомления</p>
    <Splash text="Разрешить уведомления" icon="light-bulb"></Splash>
    <Splash text="Разрешить сообщения" icon="message"></Splash>

    <p class="title">Оформление</p>
    <Splash text="Включить светлую тему" icon="light-up" background="#3a424c"></Splash>

    <p class="title">Прочее</p>
    <Splash text="Сообщить об ошибке" icon="warning" background="#bf4a4a"></Splash>
    <Splash text="О приложений" icon="info-with-circle"></Splash>
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
