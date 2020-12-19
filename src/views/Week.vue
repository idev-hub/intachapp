<template>
  <div class="app-error" v-if="error">{{ error.message }}</div>
  <p>Расписание на неделю для {{ group }}</p>

  <div class="lessons">
    <div v-for="lesson in lessons" :key="lesson['date']" :class="{ current: isCurrent(lesson['date']) }">
      <p v-if="isCurrent(lesson['date'])" class="current-notification">Сегодня</p>
      <p class="date-lesson">Расписание на: <span>{{ getDate(lesson['date']) }}</span></p>
      <div class="items">
        <Lesson v-for="item in lesson.data" :key="item.number" v-bind="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import {DateTime} from 'luxon';
import Lesson from "@/components/Lesson";

export default {
  name: 'Week',
  components: {Lesson},
  props: ['region', 'city', 'college', 'complex', 'group'],
  data: () => ({
    lessons: [],
    error: undefined
  }),
  methods: {
    isCurrent(date) {
      const _date = DateTime.fromISO(date).toFormat('dd MM')
      const _local = DateTime.local().toFormat('dd MM')
      return _date === _local
    },
    getDate(date) {
      console.log(date)
      return DateTime.fromISO(date, {
        locale: 'ru-RU'
      }).toFormat('d MMMM, EEEE')
    }
  },
  mounted() {
    this.$store.dispatch('getWeekLessons', this.$props).then(res => {
      this.lessons = res
    }).catch(e => {
      this.error = e
    })
  },
  updated() {
    const curr = document.querySelector('.current')
    if (curr) curr.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style lang="scss" scoped>
.lessons {
  & > div {
    margin-bottom: 150px;

    .current-notification {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 40px;
      color: #fff;
      margin: -20px -20px 20px -20px;
      background: #58a758;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
    }

    &.current {
      background: #3a424c;
      padding: 20px;
      margin: 0 -20px;
    }

    .date-lesson {
      font-size: 18px;
      margin: 0 0 20px 0;

      & > span {
        text-transform: capitalize;
      }
    }

    .lesson {
      margin-bottom: 20px;
    }
  }
}
</style>
