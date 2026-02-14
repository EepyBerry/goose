<template>
  <header>please watch over my pet goose while it sleeps, thank u &lt;3</header>
  <main>
    <!-- the goose :3 -->
    <button id="pet-button" type="button" @click="petGoose($event)" aria-label="Pet the goose">
      <img
        id="goose"
        :src="watchDuration.seconds % 2 === 0 ? '/jose.png' : '/jose2.png'"
        width="256"
        alt="Jose the Goose sleeping"
      />
    </button>

    <!-- watch time -->
    <p v-if="watchDuration.seconds > 0">
      <span>you have watched over {{ gooseName }} for:</span>
      <br />
      <span id="time">{{
        watchDuration.normalize().toHuman({ listStyle: "short", showZeros: false })
      }}</span>
    </p>
    <p v-else>
      <span>you have watched over {{ gooseName }} for:</span>
      <br />
      <span id="time">0 seconds</span>
    </p>

    <!-- watch rank -->
    <p id="watch-rank" :class="{ 'hide-rank': !watchRank() }" :aria-hidden="!watchRank()">
      <span>current rank:</span>
      <span :class="watchRank()?.rankClass">
        <span v-if="watchDuration.as('seconds') >= 3600" class="noto--goose"></span>
        {{ watchRank()?.text || "none" }}
      </span>
    </p>

    <!-- petting rank -->
    <p id="pet-rank" :class="{ 'hide-rank': !pettingRank() }" :aria-hidden="!pettingRank()">
      <span>petting rank:</span>
      <span :class="pettingRank()?.rankClass">
        <span v-if="petCount >= 250" class="noto--goose"></span>
        {{ pettingRank()?.text || "none" }}
      </span>
    </p>
  </main>
  <footer>
    <a href="https://eepyberry.me" target="_blank">
      <img id="eepyberry" src="/eepyberry.png" alt="EepyBerry logo in pixel art" />
    </a>
  </footer>
</template>

<script setup lang="ts">
import { Duration } from "luxon";
import { onMounted, ref, type Ref } from "vue";
import { Howl } from "howler";
import gooseSfx1 from "@/assets/sounds/goose1.ogg";
import gooseSfx2 from "@/assets/sounds/goose2.ogg";
import gooseSfx3 from "@/assets/sounds/goose3.ogg";
import { createParticles } from "./utils";

const gooseAudio = [
  new Howl({ src: gooseSfx1 }),
  new Howl({ src: gooseSfx2 }),
  new Howl({ src: gooseSfx3 }),
];

const gooseName = ref("Jose the Goose");
const watchDuration: Ref<Duration> = ref(Duration.fromObject({ seconds: 0 }).normalize());
const petCount: Ref<number> = ref(0);

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

function petGoose(evt: PointerEvent) {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(3);
  const trackId = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  gooseAudio[trackId]!.play();
  createParticles(evt);
  petCount.value++;
}

type Rank = { text: string; rankClass: string };
// prettier-ignore
function watchRank(debugSeconds?: number): Rank|undefined {
  const totalWatchTimeSeconds = debugSeconds ?? watchDuration.value.shiftTo('seconds').seconds
  if (totalWatchTimeSeconds >= 3600) return { text: 'jose herald!!!!! :3',   rankClass: 'rank-herald' }
  if (totalWatchTimeSeconds >= 2400) return { text: 'jose guardian!!!! :3',  rankClass: 'rank-guardian' }
  if (totalWatchTimeSeconds >= 1200) return { text: 'jose protector!!! :3',  rankClass: 'rank-protector' }
  if (totalWatchTimeSeconds >= 900)  return { text: 'jose sidekick!! :3',    rankClass: 'rank-sidekick' }
  if (totalWatchTimeSeconds >= 600)  return { text: 'jose bestie!! :3',      rankClass: 'rank-bestie' }
  if (totalWatchTimeSeconds >= 300)  return { text: 'jose great friend! :3', rankClass: 'rank-greatfriend' }
  if (totalWatchTimeSeconds >= 180)  return { text: 'jose friend! :3',       rankClass: 'rank-friend' }
  if (totalWatchTimeSeconds >= 120)  return { text: 'jose vip fan :3',       rankClass: 'rank-vipfan' }
  if (totalWatchTimeSeconds >= 90)   return { text: 'jose super-fan :3',     rankClass: 'rank-superfan' }
  if (totalWatchTimeSeconds >= 60)   return { text: 'jose fan :3',           rankClass: 'rank-fan' }
  if (totalWatchTimeSeconds >= 45)   return { text: 'jose admirer :3',       rankClass: 'rank-admirer' }
  if (totalWatchTimeSeconds >= 30)   return { text: 'jose enthusiast :3',    rankClass: 'rank-enthusiast' }
  if (totalWatchTimeSeconds >= 15)   return { text: 'jose observer :3',      rankClass: 'rank-observer' }
  return undefined
}

function pettingRank(debugCount?: number): Rank | undefined {
  const totalPets = debugCount ?? petCount.value;
  if (totalPets >= 250) return { text: "prodigy!!!!!", rankClass: "rank-prodigypets" };
  if (totalPets >= 140) return { text: "expert!!!", rankClass: "rank-expertpets" };
  if (totalPets >= 80) return { text: "dedicated!!", rankClass: "rank-dedicatedpets" };
  if (totalPets >= 40) return { text: "regular!", rankClass: "rank-regularpets" };
  if (totalPets >= 20) return { text: "beginner", rankClass: "rank-beginnerpets" };
  if (totalPets >= 5) return { text: "smol", rankClass: "rank-smolpets" };
  return undefined;
}
</script>

<style lang="scss">
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

button#pet-button {
  background: none;
  color: transparent;
  border: none;
  padding: 0;
  margin-top: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 50ms ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.975);
  }
}

img#goose {
  flex: 1;
  pointer-events: none;
  width: clamp(8rem, 33vw, 16rem);
}
img#eepyberry {
  width: 3.5rem;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
}

p#watch-rank,
p#pet-rank {
  margin-top: 1rem;
  border: 1px solid #fff8;
  border-radius: 8px;
  padding: 0 8px;

  display: flex;
  gap: 1rem;

  &.hide-rank {
    opacity: 0;
    visibility: hidden;
    user-select: none;
    pointer-events: none;
  }
}
p#pet-rank {
  margin-top: 4px;
}
span#time {
  color: var(--goose-highlight);
  font-weight: 600;
}

/*-------------------------------------------*/
/*              RESPONSIVENESS               */
/*-------------------------------------------*/
@media screen and (max-width: 399px) {
  p#rank {
    flex-direction: column;
    gap: 0;
  }
}
@media screen and (max-height: 600px) {
  header,
  footer {
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
