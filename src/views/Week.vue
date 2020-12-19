<template>
  <div class="app-error" v-if="error">{{ error.message }}</div>
  <Loader :active="loading"></Loader>

  <p class="title-page">Расписание для группы {{ group }}.</p>

  <div class="lessons">
    <LessonItem v-for="lesson in lessons" :key="lesson['date']" v-bind="lesson"></LessonItem>
  </div>

  <div class="contol" v-if="!loading">
    <button class="btn" @click="prevWeek()"><span class="icon-chevron-left"></span></button>
    <p class="currWeek" v-if="currWeek !== undefined">{{ currWeek.toString() }}</p>
    <button class="btn" @click="nextWeek()"><span class="icon-chevron-right"></span></button>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import LessonItem from "@/components/LessonItem";

export default {
  name: 'Week',
  components: {LessonItem, Loader},
  props: ['region', 'city', 'college', 'complex', 'group', 'week'],
  data: () => ({
    lessons: [],
    error: undefined,
    loading: true,
    currWeek: undefined
  }),
  methods: {
    nextWeek() {
      this.currWeek++
      this.loading = true
      this.getLessons()
    },
    prevWeek() {
      this.currWeek--
      this.loading = true
      this.getLessons()
    },
    getLessons() {
      const params = {
        college: this.college,
        complex: this.complex,
        group: this.group,
      }

      if (this.week !== 'undefined') params.week = this.week
      if (this.currWeek !== undefined) params.week = this.currWeek

      this.$store.dispatch('getWeekLessons', params).then(res => {
        this.lessons = res
        this.currWeek = res[0].week
        this.loading = false
      }).catch(e => {
        this.error = e
      })
    },
  },
  mounted() {
    this.getLessons()
  },
  updated() {
    const curr = document.querySelector('.current')
    if (curr) {
      curr.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    } else {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.undefined {
  color: #728193;
}

.lessons {
  margin-top: 20px;
}

.contol {
  position: sticky;
  z-index: 101;
  bottom: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2f3640;
  margin: 0 -20px;
  padding: 0 20px;
  box-shadow: 0 -3px 12px rgba(0, 0, 0, .1);
  margin-bottom: 100px;
  margin-top: 50px;

  .currWeek {
    text-shadow: 0 0 12px rgba(0, 0, 0, .5);
  }

  .btn {
    border: none;
    width: 35px;
    height: 35px;
    background: #4c5561;
    color: #ffffff;
    cursor: pointer;
    border-radius: 4px;
  }
}
</style>
