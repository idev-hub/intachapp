<template>
  <div class="splash">
    <router-link :to="link">
      <span v-if="icon" class="ico" :class="'icon-'+icon"></span>
      <span class="text">{{ text }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Splash",
  props: ['text', 'icon', 'link']
}
</script>

<style lang="scss" scoped>
.splash {

  &:not(:last-child){
    margin-bottom: 1em;
  }

  a {
    display: flex;
    height: 60px;

    align-items: center;
    text-decoration: none;
    color: inherit;

    background: #2f3640;
    padding: 0 20px;
    border-radius: 4px;
    box-shadow: 0 0 12px rgba(0,0,0,.2);
    transition: .2s;

    &:hover{
      transform: scale(1.02);
      box-shadow: 0 0 24px rgba(0,0,0,.2);
    }

    .ico{
      margin-right: 1em;
      font-size: 1.3em;
    }

    .text{
      font-size: 14px;
    }
  }
}
</style>
