<template>
  <header>please watch over my pet goose while it sleeps, thank u &lt;3</header>
  <main>
    <img :src="watchDuration.seconds % 2 === 0 ? '/jose.png' : '/jose2.png'" width="256" />
    <p v-if="watchDuration.seconds > 0">
      you have watched over {{ gooseName }} for
      <span id="time">{{
        watchDuration.normalize().toHuman({ listStyle: "short", showZeros: false })
      }}</span>
    </p>
    <p v-else>you have watched over {{ gooseName }} for <span id="time">0 seconds</span></p>
  </main>
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
header {
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

span#time {
  color: var(--goose-highlight);
}
</style>
