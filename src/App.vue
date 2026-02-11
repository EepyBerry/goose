<template>
  <header>please watch over my pet goose while it sleeps, thank u &lt;3</header>
  <main>
    <img
      id="goose"
      :src="watchDuration.seconds % 2 === 0 ? '/jose.png' : '/jose2.png'"
      width="256"
      alt="Jose the Goose sleeping"
    />
    <template v-if="watchDuration.seconds > 0">
      <p>
        <span>you have watched over {{ gooseName }} for:</span>
        <br />
        <span id="time">{{
          watchDuration.normalize().toHuman({ listStyle: "short", showZeros: false })
        }}</span>
      </p>
    </template>
    <p v-else>
      <span>you have watched over {{ gooseName }} for:</span>
      <br />
      <span id="time">0 seconds</span>
    </p>
  </main>
  <footer>
    <a href="https://eepyberry.me">
      <img id="eepyberry" src="/eepyberry.png" alt="EepyBerry logo in pixel art" />
    </a>
  </footer>
</template>

<script setup lang="ts">
import { Duration } from "luxon";
import { onMounted, ref, type Ref } from "vue";

const gooseName = ref("Jose the Goose");
const watchDuration: Ref<Duration> = ref(Duration.fromObject({ seconds: 0 }).normalize());

onMounted(() => {
  setInterval(tick, 1000);
});

function tick() {
  watchDuration.value = Duration.fromObject({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: watchDuration.value.seconds + 1,
  });
}
</script>

<style lang="css">
header,
footer {
  padding: 1rem;
  text-align: center;
}
main {
  height: 100%;

  padding: 1rem;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
}
footer {
  display: flex;
  justify-content: flex-end;
}

img#goose {
  width: clamp(8rem, 50%, 16rem);
}
img#eepyberry {
  width: 4rem;
}
img#eepyberry:hover {
  transform: scale(1.05);
}
img#eepyberry:active {
  transform: scale(0.95);
}

span#time {
  color: var(--goose-highlight);
}
</style>
