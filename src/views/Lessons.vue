<template>
  <p class="title">Расписание по дате.</p>
  <div class="calendar-container">
    <Loader :active="loading" :localy="true"></Loader>
    <Calendar v-on:select="selected"/>
  </div>
  <div class="lessons">
    <LessonItem v-if="lesson" v-bind="lesson"/>
  </div>

  <p class="title">Прочее</p>
  <div class="splashes">
    <Splash text="Поделится расписанием" icon="message"></Splash>
    <Splash text="Сообщить об ошибке" icon="warning" background="#bf4a4a"></Splash>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar";
import LessonItem from "@/components/LessonItem";
import Loader from "@/components/Loader";
import Splash from "@/components/Splash";

export default {
  name: "Lessons",
  components: {Splash, Loader, LessonItem, Calendar},
  data: () => ({
    date: undefined,
    error: undefined,
    lesson: undefined,
    loading: false,
  }),
  methods: {
    selected(date) {
      this.loading = true
      this.lesson = undefined
      this.getLessons(date.toFormat('dd.MM.yyyy'))
    },
    getLessons(date) {
      this.$store.dispatch('getLessonsDate', {
        college: this.$store.state.user.college,
        complex: this.$store.state.user.complex,
        group: this.$store.state.user.group,
        date: date
      }).then(res => {
        this.lesson = res
        this.loading = false
      }).catch(e => {
        this.error = e
      })
    }
  },
  updated() {
    const curr = document.querySelector('.item')
    if (curr) {
      curr.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-container{
  position: relative;
}
.lessons{
  margin-top: 50px;
}
</style>
