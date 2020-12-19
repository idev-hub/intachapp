<template>
  <div class="app-error" v-if="error">{{ error.message }}</div>

  <Loader :active="loading"></Loader>

  <p class="title-page">Расписание для группы {{ group }}.</p>

  <div class="lessons">
    <div v-for="lesson in lessons" :key="lesson['date']" :class="{ current: isCurrent(lesson['date']) }">
      <p class="notification"><span>{{ getDate(lesson['date']) }}</span></p>
      <div class="items" v-if="lesson.data.length > 0" >
        <Lesson v-for="item in lesson.data" :key="item.number" v-bind="item"/>
      </div>
      <div v-else>Ничего не найдено</div>
    </div>
  </div>
</template>

<script>
import {DateTime} from 'luxon';
import Lesson from "@/components/Lesson";
import Loader from "@/components/Loader";

export default {
  name: 'Week',
  components: {Loader, Lesson},
  props: ['region', 'city', 'college', 'complex', 'group'],
  data: () => ({
    lessons: [],
    error: undefined,
    loading: true,
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
      this.loading = false
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
  margin-top: 20px;
  & > div {
    margin-bottom: 100px;

    .notification {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 40px;
      color: #ffffff;
      margin: -20px -20px 20px -20px;
      background: #3a424c;
      font-weight: 600;
      font-size: 13px;
      text-transform: uppercase;
    }

    &.current {
      background: #3a424c;
      padding: 20px;
      margin: 0 -20px;

      .notification {
        background: #58a758;

        &:before {
          content: "Сегодня";
          position: absolute;
          top: 0;
          height: 40px;
          display: flex;
          align-items: center;
          left: 20px;
          color: #e7e7e7;
          font-size: 12px;
        }
      }
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
