<template>
  <p class="title-page">Ввод данных</p>
  <Loader :active="loading"/>

  <div class="start">
    <div class="form-control">
      <div v-if="optionRegions.length">
        <label for="select-region">Выберите регион: </label>
        <select @change="onChangeRegion($event)" v-model.number="region" id="select-region">
          <option v-for="option in optionRegions" :key="option.id" :value="option.id">{{ option.name }}</option>
        </select>
      </div>
      <p v-else>Регионов не найдено.</p>
    </div>

    <div v-if="isStepFirst" class="form-control">
      <div v-if="optionCities.length">
        <label for="select-city">Выберите город: </label>
        <select @change="onChangeCity($event)" v-model.number="city" id="select-city">
          <option v-for="option in optionCities" :key="option.id" :value="option.id">{{ option.name }}</option>
        </select>
      </div>
      <p v-else>Городов не найдено.</p>
    </div>

    <div v-if="isStepSecond" class="form-control">
      <div v-if="optionColleges.length">
        <label for="select-college">Выберите колледж: </label>
        <select @change="onChangeCollege($event)" v-model.number="college"
                id="select-college">
          <option v-for="option in optionColleges" :key="option.id" :value="option.id">{{ option.name }}</option>
        </select>
      </div>
      <p v-else>Колледжей не найдено.</p>
    </div>

    <div v-if="isStepThird" class="form-control">
      <div v-if="optionComplexes.length">
        <label for="select-complex">Выберите корпус: </label>
        <select @change="onChangeComplex($event)" v-model.number="complex"
                id="select-complex">
          <option v-for="option in optionComplexes" :key="option.id" :value="option.id">{{ option.name }}</option>
        </select>
      </div>
    </div>

    <div v-if="isStepFourth" class="form-control">
      <div v-if="optionGroups.length">
        <label for="select-group">Выберите группу: </label>
        <select @change="onChangeGroups($event)" v-model="group" id="select-group">
          <option v-for="option in optionGroups" :key="option.id" :value="option.id">{{ option.name }}</option>
        </select>
      </div>
      <p v-else>
        <label for="input-group">Введите вашу группу: </label>
        <input id="input-group" type="text" v-model="group"/>
      </p>
    </div>

    <button v-if="isStepFifth" @click="start()" class="btn">Получить расписание</button>

  </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  name: 'Start',
  components: {Loader},
  data: () => ({
    loading: true,
    error: undefined,
    region: undefined,
    city: undefined,
    college: undefined,
    complex: undefined,
    group: undefined,
    optionRegions: [],
    optionCities: [],
    optionColleges: [],
    optionComplexes: [],
    optionGroups: []
  }),
  mounted() {
    this.getRegions().then(() => {
      this.loading = false
    })
  },
  methods: {
    async start() {
      try {
        await this.$store.dispatch('setUser', {
          peerId: 1,
          college: this.college,
          city: this.city,
          complex: this.complex,
          group: this.group,
          region: this.region
        })

        return this.$router.push({
          path: "/"
        })
      } catch (e) {
        console.log(e)
      }
    },
    onChangeRegion(event) {
      this.getCities(event.target.value)
      this.city = undefined
      this.college = undefined
      this.complex = undefined
      this.group = undefined

      this.optionCities = []
      this.optionColleges = []
      this.optionComplexes = []
      this.optionGroups = []
      this.loading = true
    },
    onChangeCity(event) {
      this.getColleges(event.target.value)
      this.college = undefined
      this.complex = undefined
      this.group = undefined

      this.optionColleges = []
      this.optionComplexes = []
      this.optionGroups = []
      this.loading = true
    },
    onChangeCollege(event) {
      this.getComplexes(event.target.value)
      this.complex = undefined
      this.group = undefined

      this.optionComplexes = []
      this.optionGroups = []
      this.loading = false
    },
    onChangeComplex(event) {
      this.getGroups(this.college, event.target.value)

      this.group = undefined
      this.optionGroups = []
      this.loading = true
    },
    onChangeGroups(event) {
      this.loading = false
      console.log(event)
    },

    async getGroups(collegeId, complexId) {
      this.optionGroups = await this.$store.dispatch('getGroups', {
        college: collegeId,
        complex: complexId
      })
      this.loading = false
    },
    async getComplexes(collegeId) {
      try {
        this.optionComplexes = await this.$store.dispatch('getComplexes', {
          college: collegeId
        })
        this.loading = false
      } catch (e) {
        this.optionComplexes = []
        this.complex = 1
      }
    },
    async getColleges(cityId) {
      this.optionColleges = await this.$store.dispatch('getColleges', {
        city: cityId
      })
      this.loading = false
    },
    async getCities(regionId) {
      this.optionCities = await this.$store.dispatch('getCities', {
        region: regionId
      })
      this.loading = false
    },
    async getRegions() {
      this.optionRegions = await this.$store.dispatch('getRegions')
    }
  },
  computed: {
    isStepFirst: function () {
      return this.region !== undefined
    },
    isStepSecond: function () {
      return this.city !== undefined
    },
    isStepThird: function () {
      return this.college !== undefined
    },
    isStepFourth: function () {
      return this.complex !== undefined
    },
    isStepFifth: function () {
      return this.group !== undefined
    }
  }
}
</script>

<style lang="scss" scoped>

.start {
  margin-top: 40px;
  margin-bottom: 60px;
}

.form-control {
  &:not(:last-child) {
    margin-bottom: 2em;
  }


  label {
    color: #728193;
    display: block;
    margin-bottom: .5em;
  }

  select, input {
    width: 100%;
    height: 40px;
    background: #3a424c;
    border: none;
    color: #ffffff;
    border-radius: 4px;
    padding: 0 10px;
    font-family: "Nunito", sans-serif;
  }

  input {

  }
}

.btn {
  width: 100%;
  height: 50px;
  background: #181b1f;
  border: none;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Nunito", sans-serif;
}
</style>
