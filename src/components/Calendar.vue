<template>
  <div class="calendar">
    <div class="month">
      <button @click="prevMonth()">
        <span class="icon-chevron-left"></span>
      </button>
      <div class="months">
        <div v-for="(month, index) in months" :key="index" :class="{current: index === currMonth}">
          <p>{{ month }}</p>
        </div>
      </div>
      <button @click="nextMonth()">
        <span class="icon-chevron-right"></span>
      </button>
    </div>
    <div class="items" v-if="days.length > 0">
      <button v-for="(weekday, index) in weekdays" :key="index" class="dayOfWeek" disabled>{{ weekday }}</button>
      <button v-for="n in days[0].dayOfWeek" :key="n" class="empty" disabled></button>
      <button v-for="(day, index) in days" :key="day.number" :disabled="day.dayOfWeek === 6"
              @click="selectDateEvent(day.date, index)" :class="{select: day.select, current: day.current}" class="day">
        {{ day.number }}
      </button>
    </div>
  </div>
</template>

<script>
import {DateTime, Info} from "luxon";

export default {
  name: "Calendar",
  data: () => ({
    local: DateTime.local().setLocale('ru-RU').setZone('Asia/Yekaterinburg'),
    months: [],
    weekdays: [],
    currMonth: 0,
    days: [],
    currYear: undefined,
    selectDate: undefined,
  }),
  methods: {
    getMonth() {
      this.months = Info.months()
      this.currMonth = this.local.toObject().month - 1
      this.currYear = this.local.toObject().year
      this.weekdays = Info.weekdays('short')

      this.setCurrDate()
    },
    prevMonth() {
      if (this.currMonth > 0) {
        this.currMonth--
      } else {
        this.currMonth = (this.months.length - 1)
        this.currYear--
      }

      this.setCurrDate()
    },
    nextMonth() {
      if (this.currMonth < (this.months.length - 1)) {
        this.currMonth++
      } else {
        this.currMonth = 0
        this.currYear++
      }

      this.setCurrDate()
    },
    setCurrDate() {
      const currDate = DateTime.fromFormat(`${this.currYear} ${this.currMonth + 1}`, 'yyyy L', {
            locale: 'ru-RU',
            zone: 'Asia/Yekaterinburg'
          }),
          array = []
      for (let i = 1; i <= currDate.daysInMonth; i++) {
        const date = DateTime.fromFormat(`${this.currYear} ${this.currMonth + 1} ${i}`, 'yyyy L d', {
          locale: 'ru-RU',
          zone: 'Asia/Yekaterinburg'
        })
        array.push({
          number: i,
          dayOfWeek: parseInt(date.toFormat('c')) - 1,
          date: date,
          select: (this.selectDate) && (this.selectDate.toISODate() === date.toISODate()),
          current: (date.toISODate() === this.local.toISODate())
        })
      }

      this.days = array
    },
    selectDateEvent(date, index) {
      if (!this.days[index].select) {
        for (let i = 0; i < this.days.length; i++)
          if (this.days[i].select)
            this.days[i].select = false
        this.days[index].select = true

        this.selectDate = date
        this.$emit('select', date)
      }
    }
  },
  created() {
    this.getMonth()
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  min-width: 240px;
  border-radius: 4px;
  overflow: hidden;

  button {
    border: none;
    background: none;
    box-shadow: none;
    outline: none;
    cursor: pointer;
    color: #ffffff;
  }

  .month {
    background: #3a424c;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    user-select: none;
    margin-bottom: 10px;

    .months {
      & > div {
        display: none;

        &.current {
          display: block;
        }

        p {
          text-transform: capitalize;
        }
      }
    }

    button {
      height: 100%;
      width: 50px;

      &:hover, &:active, &:focus {
        background: #4c5561;
      }
    }

    p {
      width: 100%;
      font-weight: 600;
    }
  }

  .items {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(7, minmax(25px, 1fr));
    grid-auto-rows: 35px;
    grid-gap: 5px;

    button {
      background: #4c5561;

      &:not(:disabled) {
        &:hover, &:active, &:focus {
          background: #3a424c;
        }
      }

      &:disabled {
        cursor: default;
        background: none;
      }

      &.select {
        background: #181b1f !important;
      }

      &.current {
        background: #58a758;
      }
    }
  }
}
</style>
