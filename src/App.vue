<template>
  <div id="nav" v-if="this.$store.state.user">
    <div class="container">
      <div class="navs">
        <div class="icon">
          <router-link to="/">
            <span class="icon-home"></span>
          </router-link>
        </div>

        <div class="icon">
          <router-link to="/lessons">
            <span class="icon-calendar"></span>
          </router-link>
        </div>

        <div class="icon">
          <router-link to="/settings">
            <span class="icon-cog"></span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>


<style lang="scss">
@import "./assets/style.css";
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');

$nav-height: 50px;

* {
  box-sizing: border-box;
}

html, body {
  font-family: 'Nunito', sans-serif;
  color: #ffffff;
  margin: 0 0 $nav-height 0;
  background: #2f3640;
  padding: 40px 0 0 0;
}

#nav {
  position: fixed;
  width: 100%;
  background: #2f3640;
  box-shadow: 0 -3px 3px rgba(0, 0, 0, .2);
  bottom: 0;
  left: 0;
  z-index: 100;

  .navs {
    height: $nav-height;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    align-items: center;
    justify-content: center;
    text-align: center;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 21px;

      a {
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }

  a {
    color: #ffffff;
    text-decoration: none;
  }
}

.app-error {
  display: block;
  background: red;
  color: white;
  padding: 1em;
  font-weight: bold;
  text-transform: uppercase;
}

.container {
  padding-left: 20px;
  padding-right: 20px;
  display: block;
  margin: auto;
  max-width: 600px;
  width: 100%;
}

.title-page{
  position: absolute;
  left: 20px;
  top: 5px;
  color: #728193;
  font-size: 14px;
  font-weight: 500;
  user-select: none;
  letter-spacing: .07em;
}

</style>
