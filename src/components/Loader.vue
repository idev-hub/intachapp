<template>
  <div v-if="active" class="loader">
    <div class="loadingio-spinner-ripple-3zo152wkxnr">
      <div class="ldio-t3cww35auem">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: ['active']
}
</script>

<style scoped>
@keyframes ldio-t3cww35auem {
  0% {
    top: 93.84px;
    left: 93.84px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 42.84px;
    left: 42.84px;
    width: 102px;
    height: 102px;
    opacity: 0;
  }
}

.loader{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 90;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}


.ldio-t3cww35auem div {
  position: absolute;
  border-width: 8.16px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ldio-t3cww35auem 1.075268817204301s cubic-bezier(0,0.2,0.8,1) infinite;
}

.ldio-t3cww35auem div:nth-child(1) {
  border-color: #ffffff
}

.ldio-t3cww35auem div:nth-child(2) {
  border-color: #d4d4d4;
  animation-delay: -0.5376344086021505s;
}

.loadingio-spinner-ripple-3zo152wkxnr {
  width: 204px;
  height: 204px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-t3cww35auem {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.ldio-t3cww35auem div { box-sizing: content-box; }
</style>
