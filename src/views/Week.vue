<template>
  <div class="app-error" v-if="error">{{ error.message }}</div>
  <Loader :active="loading"></Loader>

  <p class="title" v-if="groupText">Расписание для группы {{ groupText }}.</p>

  <div class="lessons">
    <LessonItem v-for="lesson in lessons" :key="lesson['date']" v-bind="lesson"></LessonItem>
  </div>

  <div class="contol" v-if="!loading">
    <button class="btn" @click="prevWeek()"><span class="icon-chevron-left"></span></button>
    <p class="currWeek" v-if="currWeek !== undefined">{{ currWeek.toString() }}</p>
    <button class="btn" @click="nextWeek()"><span class="icon-chevron-right"></span></button>
  </div>


  <p class="title">Прочее</p>
  <div class="splashes">
    <Splash text="Поделится расписанием" icon="message"></Splash>
    <Splash text="Сообщить об ошибке" icon="warning" background="#bf4a4a"></Splash>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import LessonItem from "@/components/LessonItem";
import Splash from "@/components/Splash";

export default {
  name: 'Week',
  components: {Splash, LessonItem, Loader},
  props: ['region', 'city', 'college', 'complex', 'group', 'week'],
  data: () => ({
    lessons: [],
    error: undefined,
    loading: true,
    currWeek: undefined,
    groupText: undefined
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
        this.groupText = res[0].group
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

.splashes {
  .splash {
    &:not(:last-child){
      margin-bottom: 20px;
    }
  }
}

.undefined {
  color: #728193;
}

.lessons {
  margin-top: 40px;
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
  margin-bottom: 50px;
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
