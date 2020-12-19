<template>
  <div class="app-error" v-if="error">{{ error.message }}</div>
  <Loader :active="loading"></Loader>

  <p class="title-page">Расписание для группы {{ group }}.</p>

  <div class="lessons">
    <div v-for="lesson in lessons" :key="lesson['date']" :class="{ current: isCurrent(lesson['date']) }">
      <p class="notification"><span>{{ getDate(lesson['date']) }}</span></p>
      <div class="items" v-if="lesson.data.length > 0">
        <Lesson v-for="item in lesson.data" :key="item.number" v-bind="item"/>
      </div>
      <div v-else class="undefined">Ничего не найдено</div>
    </div>
  </div>


  <div class="contol">
    <button class="btn" @click="prevWeek()"><span class="icon-chevron-left"></span></button>
    <p class="currWeek" v-if="currWeek !== undefined">{{ currWeek.toString() }}</p>
    <button class="btn" @click="nextWeek()"><span class="icon-chevron-right"></span></button>
  </div>
</template>

<script>
import {DateTime} from 'luxon';
import Lesson from "@/components/Lesson";
import Loader from "@/components/Loader";

export default {
  name: 'Week',
  components: {Loader, Lesson},
  props: ['region', 'city', 'college', 'complex', 'group', 'week'],
  data: () => ({
    lessons: [],
    error: undefined,
    loading: true,
    currWeek: undefined
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
    },
    nextWeek() {
      this.currWeek++
      console.log(this.currWeek)
      this.loading = true
      this.getLessons()
    },
    prevWeek() {
      this.currWeek--
      console.log(this.currWeek)
      this.loading = true
      this.getLessons()
    },
    getLessons() {
      const params = {
        college: this.college,
        complex: this.complex,
        group: this.group
      }
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

.undefined{
  color: #728193;
}

.lessons {
  margin-top: 20px;

  & > div {
    &:not(:last-child) {
      margin-bottom: 100px;
    }

    .notification {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 60px;
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
          height: 60px;
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
