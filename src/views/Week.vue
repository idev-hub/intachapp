<template>
  <div class="app-error" v-if="error">{{ error.message }}</div>
  <p>Расписание на неделю для {{ group }}</p>

  <div class="lessons">
    <div v-for="lesson in lessons" :key="lesson['date']" :class="{ current: isCurrent(lesson['date']) }">
      <p class="date">Расписание на: <span>{{ getDate(lesson['date']) }}</span></p>
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
      return DateTime.fromISO(date, {
        locale: 'ru-RU'
      }).toFormat('d MMMM, EEEE')
    }
  },
  async mounted() {
    try {
      this.lessons = await this.$store.dispatch('getWeekLessons', this.$props)
    } catch (e) {
      this.error = e
    }
  }
}
</script>

<style lang="scss" scoped>
.lessons {
  & > div {
    background: #aaaaaa;
    margin-bottom: 150px;

    &.current {
      background: green;
    }

    .date {
      & > span {
        text-transform: capitalize;
      }
    }

    .lesson {
      margin-bottom: 50px;
    }
  }
}
</style>
