<template>
  <div class="lesson" :class="{ canceled: canceled }">
    <p v-if="time" class="time">
      <span class="_start">Начало: {{ time['start'] }}</span>
      <span class="_end">Конец: {{ time['end'] }}</span>
    </p>
    <p v-if="number" class="number">Номер: <span>{{ number.toString() }}</span></p>
    <p v-if="discipline" class="discipline">Дисциплина: <span>{{ discipline }}</span></p>
    <p v-if="teacher" class="teacher">Преподователь: <span>{{ teacher }}</span></p>
    <p v-if="cabinet" class="cabinet">Кабинет: <span>{{ cabinet }}</span></p>
  </div>
</template>

<script>
export default {
  name: "Lesson",
  props: {
    canceled: Boolean,
    time: Object,
    number: Number,
    discipline: String,
    teacher: String,
    cabinet: String
  },
  created() {
    console.log(this.$props)
  }
}
</script>

<style lang="scss" scoped>
.lesson {
  background: #eeeeee;

  &.canceled {
    background: red;
  }

  & > p {
    margin-bottom: 10px;

    &.time {
      & > span {
        margin-right: 20px;
      }
    }

    & > span {
      text-transform: uppercase;
    }
  }
}
</style>
