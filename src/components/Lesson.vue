<template>
  <div class="lesson" :class="{ canceled: canceled }">
    <p v-if="number" class="number"><span>#{{ number.toString() }}</span></p>
    <p v-if="time" class="time">
      <span class="_start"> {{ time['start'] }}</span> - <span class="_end">{{ time['end'] }}</span>
    </p>
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
  background: #2f3640;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0, 0, 0, .2);
  transition: .2s;
  position: relative;
  overflow: hidden;

  &:hover{
    transform: scale(1.02);
    box-shadow: 0 0 24px rgba(0,0,0,.2);

    &:after, &:before{
      opacity: 0;
      visibility: hidden;
    }
  }

  &.canceled {
    &:after{
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      transition: .2s;
      background: rgba(red, .5);
    }
    &:before{
      content: 'Отменена';
      position: absolute;
      bottom: 30px;
      right: 20px;
      text-transform: uppercase;
      z-index: 1;
      transition: .2s;
      color: #c4c4c4;
    }
  }

  & > p {
    line-height: 150%;
    font-size: 14px;
    &:not(:last-child){
      border-bottom: 1px solid #4c5561;
    }
    padding: 10px 0;
    margin: 0;
    color: #c4c4c4;

    &.time {
      border-bottom: none;
      position: absolute;
      right: 20px;
      top: 20px;
    }

    & > span {
      color: #ffffff;
      text-transform: uppercase;
    }
  }
}
</style>
