<template>
  <div class="item" :class="{ current: isCurrent(date) }">
    <p class="notification"><span>{{ getDate(date) }}</span></p>
    <div class="items" v-if="data.length > 0">
      <Lesson v-for="item in data" :key="item.number" v-bind="item"/>
    </div>
    <div v-else class="undefined">Ничего не найдено</div>
  </div>
</template>

<script>
import {DateTime} from "luxon";
import Lesson from "@/components/Lesson";

export default {
  name: "LessonItem",
  components: {Lesson},
  props: {
    date: String,
    data: Array
  },
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
  }
}
</script>

<style lang="scss" scoped>
.item {
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
</style>
