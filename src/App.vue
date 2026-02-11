<template>
  <header>please watch over my pet goose while it sleeps, thank u &lt;3</header>
  <main>
    <!-- the goose :3 -->
    <img
      id="goose"
      :src="watchDuration.seconds % 2 === 0 ? '/jose.png' : '/jose2.png'"
      width="256"
      alt="Jose the Goose sleeping"
    />

    <!-- watch time tracker -->
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

    <!-- watch rank -->
    <p id="rank" :class="{ 'hide-rank': !rank() }" :aria-hidden="!rank()">
      <span>current rank:</span>
      <span :class="rank()?.rankClass">{{ rank()?.text || "none" }}</span>
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

type WatchRank = { text: string; rankClass: string };
// prettier-ignore
function rank(): WatchRank|undefined {
  const totalWatchTimeSeconds = watchDuration.value.shiftTo('seconds').seconds
  if (totalWatchTimeSeconds >= 600)  return { text: 'jose guardian!!!! :3',  rankClass: 'rank-guardian' }
  if (totalWatchTimeSeconds >= 300)  return { text: 'jose protector!!! :3',  rankClass: 'rank-protector' }
  if (totalWatchTimeSeconds >= 180)  return { text: 'jose bestie!! :3',      rankClass: 'rank-bestie' }
  if (totalWatchTimeSeconds >= 90)   return { text: 'jose friend! :3',       rankClass: 'rank-friend' }
  if (totalWatchTimeSeconds >= 60)   return { text: 'jose super-fan :3',    rankClass: 'rank-superfan' }
  if (totalWatchTimeSeconds >= 45)   return { text: 'jose fan :3',           rankClass: 'rank-fan' }
  if (totalWatchTimeSeconds >= 30)   return { text: 'jose admirer :3',       rankClass: 'rank-admirer' }
  if (totalWatchTimeSeconds >= 15)   return { text: 'jose enthusiast :3',    rankClass: 'rank-enthusiast' }
  return undefined
}
</script>

<style lang="css">
/*-------------------------------------------*/
/*               PAGE LAYOUT                 */
/*-------------------------------------------*/
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
  margin-top: 3rem;
  width: clamp(8rem, 60%, 16rem);
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

p#rank {
  margin-top: 1rem;
  border: 1px solid #fff8;
  border-radius: 8px;
  padding: 0 8px;

  display: flex;
  gap: 1rem;
}
p#rank.hide-rank {
  opacity: 0;
  visibility: hidden;
  user-select: none;
  pointer-events: none;
}
span#time {
  color: var(--goose-highlight);
  font-weight: 600;
}

/*-------------------------------------------*/
/*               WATCH RANKS                 */
/*-------------------------------------------*/
.rank-enthusiast {
  color: var(--rank-enthusiast);
  font-weight: 300;
}
.rank-admirer {
  color: var(--rank-admirer);
  font-weight: 450;
}
.rank-fan {
  color: var(--rank-fan);
  font-weight: 500;
  text-shadow: 0 0 2px var(--rank-fan);
}
.rank-superfan {
  color: var(--rank-superfan);
  font-weight: 500;
  text-shadow: 0 0 2px var(--rank-superfan);
}
.rank-friend {
  color: var(--rank-friend);
  font-weight: 700;
  animation: rank-blinkglow 4s linear infinite forwards;
}
.rank-bestie {
  color: var(--rank-bestie);
  font-weight: 700;
  text-shadow: 0 0 2px var(--rank-bestie);
  animation: rank-blinkglow 2s linear infinite forwards;
}

.rank-protector::before {
  z-index: -1;
  content: "jose protector!!! :3";
  position: absolute;
  inset: 0;
  color: transparent;
  text-shadow: 0 0 1px #fff8;
}
.rank-protector {
  position: relative;

  background: var(--rank-protector);
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 400% 100%;

  color: transparent;
  font-weight: 800;
  animation: rank-gradientloop 2s linear infinite forwards;
}

.rank-guardian::before {
  z-index: -1;
  content: "jose guardian!!!! :3";
  position: absolute;
  inset: 0;
  color: transparent;
  text-shadow: 0 0 2px #fff8;
}
.rank-guardian {
  position: relative;

  background: var(--rank-guardian);
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 450% 100%;

  color: transparent;
  font-weight: 900;
  animation: rank-gradientloop 2s linear infinite forwards;
}

/*-------------------------------------------*/
/*              RESPONSIVENESS               */
/*-------------------------------------------*/
@media screen and (max-width: 399px) {
  p#rank {
    flex-direction: column;
    gap: 0
  }
}
@media screen and (max-height: 600px) {
  header, footer {
    padding: 0.5rem;
  }
  main {
    padding: 0.5rem;
  }
  img#goose {
    margin-top: 0;
    width: unset;
    min-width: 8rem;
    height: clamp(8rem, 60%, 16rem);
  }
  footer {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
