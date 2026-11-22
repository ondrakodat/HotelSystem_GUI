<script setup lang="ts">
import { computed, ref } from 'vue'

const restaurantSlide = ref(0)
const wellnessSlide = ref(0)

const restaurants = [
  {
    name: 'Horizont',
    eyebrow: 'Lokální kuchyně · večerní menu',
    description:
      'Otevřená kuchyně, suroviny od regionálních dodavatelů a menu, které se mění s ročním obdobím. Horizont je neformální přes den a intimní po setmění.',
    image: '/images/Restaurace_Horizont/Horizont_Pozadi.jpg',
  },
  {
    name: 'Panorama',
    eyebrow: 'Výhled · snídaně · signature bar',
    description:
      'Ráno začíná dlouhou snídaní a výhledem do krajiny. Večer prostor patří degustačnímu menu, vybraným vínům a klidné atmosféře hotelového baru.',
    image: '/images/Restaurace_Panorama/Panorama_pozadi.jpg',
  },
]

const rooms = [
  {
    name: 'Jednolůžkový pokoj',
    meta: 'Pro klidný sólo pobyt',
    description: 'Promyšlený prostor s pracovním místem a výhledem do okolní krajiny.',
    image: '/images/Jednoluzkovy/Jednoluzkovy.jpg',
    price: 'od 2 490 Kč',
    facts: ['18 m²', 'Queen bed', 'Snídaně v ceně'],
  },
  {
    name: 'Dvoulůžkový pokoj',
    meta: 'Pro dva',
    description: 'Měkké textilie, velká postel a dostatek soukromí pro společný odpočinek.',
    image: '/images/Dvouluzkovy/Dvouluzkovy.jpg',
  },
  {
    name: 'Studio',
    meta: 'Pro delší zastavení',
    description: 'Vzdušný pokoj s obytnou částí pro páry i malé rodiny.',
    image: '/images/Studio/Studio.jpg',
  },
  {
    name: 'Apartmá',
    meta: 'Nejvíce prostoru',
    description: 'Oddělená ložnice, obývací část a soukromí pro pomalé dny.',
    image: '/images/Apartma/Apartma.jpg',
  },
]

const wellness = [
  {
    name: 'Vodní svět',
    shortName: 'Bazény',
    description: 'Vnitřní bazén, dětské brouzdaliště a venkovní voda obklopená zelení.',
    image: '/images/Bazen/Bazen_Vnitrni.jpg',
  },
  {
    name: 'Saunový rituál',
    shortName: 'Sauny',
    description: 'Prohřátí, ochlazení a ticho. Několik typů saun pro váš vlastní rytmus.',
    image: '/images/Sauny/Sauna.jpg',
  },
  {
    name: 'Dotek a regenerace',
    shortName: 'Masáže',
    description: 'Individuální masáže a rituály sestavené podle toho, co právě potřebujete.',
    image: '/images/Maserna/Maserna.jpg',
  },
  {
    name: 'Pohyb s výhledem',
    shortName: 'Fitness',
    description: 'Moderní vybavení, dostatek denního světla a prostor pro soustředěný pohyb.',
    image: '/images/Fitness/Fitness_Pohled.jpg',
  },
]

const currentRestaurant = computed(() => restaurants[restaurantSlide.value] ?? restaurants[0]!)
const currentWellness = computed(() => wellness[wellnessSlide.value] ?? wellness[0]!)

function previousRestaurant() {
  restaurantSlide.value = (restaurantSlide.value - 1 + restaurants.length) % restaurants.length
}

function nextRestaurant() {
  restaurantSlide.value = (restaurantSlide.value + 1) % restaurants.length
}
</script>

<template>
  <main class="home-page">
    <section id="domu" class="hero" aria-labelledby="hero-title">
      <video class="hero-media" autoplay muted loop playsinline poster="/images/Hotel_pozadi.jpg">
        <source src="/videos/Pozadi_Stranky.mp4" type="video/mp4" />
      </video>
      <div class="hero-shade"></div>

      <div class="hero-copy">
        <p class="eyebrow eyebrow--light">Wellness hotel · Pardubice</p>
        <h1 id="hero-title">Prostor pro<br /><em>opravdové</em> zastavení.</h1>
        <div class="hero-bottom">
          <p>Současný hotel, živá gastronomie a wellness ukryté v klidné krajině.</p>
          <a class="outline-link outline-link--light" href="#pokoje">Objevit Element</a>
        </div>
      </div>

      <a class="scroll-cue" href="#uvod" aria-label="Pokračovat na úvod">
        <span></span>
        Posunout níž
      </a>
    </section>

    <section id="uvod" class="manifesto page-section">
      <p class="eyebrow">Náš přístup</p>
      <p class="manifesto-text">
        Nejsme hotel, kterým jen projdete. Element je místo, které si zapamatujete podle
        <em>ranního světla</em>, vůně dobrého jídla a ticha, na které doma nezbývá čas.
      </p>
      <div class="manifesto-note">
        <span>Pobyt podle vašeho tempa</span>
        <p>Od víkendového úniku po dlouhé prázdniny. Každý detail tu má nechat více prostoru vám.</p>
      </div>
    </section>

    <section id="pokoje" class="stays page-section page-section--dark" aria-labelledby="rooms-title">
      <div class="section-intro section-intro--light">
        <div>
          <p class="eyebrow eyebrow--light">Ubytování</p>
          <h2 id="rooms-title">Vyberte si svůj<br />způsob odpočinku.</h2>
        </div>
        <p>Čtyři typy pokojů. Stejný důraz na pohodlí, přirozené materiály a klid.</p>
      </div>

      <div class="room-list">
        <article
          v-for="(room, index) in rooms"
          :key="room.name"
          class="room-card"
          :class="{ 'room-card--featured': index === 0 }"
        >
          <img :src="room.image" :alt="room.name" loading="lazy" />
          <div class="room-shade"></div>
          <template v-if="index === 0">
            <div class="room-featured-top">
              <span>01</span>
              <p>Hotel Element · Pardubice</p>
            </div>
            <div class="room-featured-panel">
              <p class="room-kicker">{{ room.meta }}</p>
              <div class="room-featured-heading">
                <h3>{{ room.name }}</h3>
                <div class="room-price">
                  <strong>{{ room.price }}</strong>
                  <span>/ noc</span>
                </div>
              </div>
              <p class="room-featured-description">{{ room.description }}</p>
              <div class="room-featured-footer">
                <ul aria-label="Vybavení pokoje">
                  <li v-for="fact in room.facts" :key="fact">{{ fact }}</li>
                </ul>
                <span class="room-cta" aria-hidden="true">Prohlédnout pokoj <b>↗</b></span>
              </div>
            </div>
          </template>
          <div v-else class="room-meta">
            <p>{{ room.meta }}</p>
            <h3>{{ room.name }}</h3>
            <span>{{ room.description }}</span>
          </div>
          <a href="#kontakt" :aria-label="`Zjistit více o pokoji ${room.name}`">Zjistit více</a>
        </article>
      </div>
    </section>

    <section id="restaurace" class="dining page-section" aria-labelledby="dining-title">
      <div class="section-intro">
        <div>
          <p class="eyebrow">Gastronomie</p>
          <h2 id="dining-title">Chuť, kvůli které<br />se budete vracet.</h2>
        </div>
        <div class="section-sidecopy">
          <p>Dvě restaurace, dva odlišné pohledy na sezónní kuchyni a jeden společný základ: poctivé suroviny.</p>
          <a class="outline-link" href="#kontakt">Rezervovat stůl</a>
        </div>
      </div>

      <div class="dining-feature">
        <div class="dining-image">
          <Transition name="media-swap" mode="out-in">
            <img
              :key="currentRestaurant.image"
              :src="currentRestaurant.image"
              :alt="`Restaurace ${currentRestaurant.name}`"
              loading="lazy"
            />
          </Transition>
        </div>

        <div class="dining-copy">
          <Transition name="copy-swap" mode="out-in">
            <div :key="currentRestaurant.name">
              <p class="eyebrow">{{ currentRestaurant.eyebrow }}</p>
              <h3>{{ currentRestaurant.name }}</h3>
              <p class="body-copy">{{ currentRestaurant.description }}</p>
            </div>
          </Transition>

          <div class="slider-controls">
            <button type="button" @click="previousRestaurant">Předchozí</button>
            <div class="slider-dots" aria-label="Výběr restaurace">
              <button
                v-for="(restaurant, index) in restaurants"
                :key="restaurant.name"
                type="button"
                :class="{ active: restaurantSlide === index }"
                :aria-label="`Zobrazit restauraci ${restaurant.name}`"
                :aria-current="restaurantSlide === index ? 'true' : undefined"
                @click="restaurantSlide = index"
              ></button>
            </div>
            <button type="button" @click="nextRestaurant">Další</button>
          </div>
        </div>
      </div>
    </section>

    <section id="wellness" class="wellness page-section" aria-labelledby="wellness-title">
      <div class="wellness-heading">
        <p class="eyebrow eyebrow--light">Wellness & pohyb</p>
        <h2 id="wellness-title">Zpomalit.<br /><em>Vydechnout.</em><br />Začít znovu.</h2>
      </div>

      <div class="wellness-stage">
        <Transition name="media-swap" mode="out-in">
          <img
            :key="currentWellness.image"
            :src="currentWellness.image"
            :alt="currentWellness.name"
            loading="lazy"
          />
        </Transition>
        <div class="wellness-caption">
          <h3>{{ currentWellness.name }}</h3>
          <p>{{ currentWellness.description }}</p>
        </div>
      </div>

      <div class="wellness-tabs" role="tablist" aria-label="Wellness služby">
        <button
          v-for="(item, index) in wellness"
          :key="item.name"
          type="button"
          role="tab"
          :aria-selected="wellnessSlide === index"
          :class="{ active: wellnessSlide === index }"
          @click="wellnessSlide = index"
        >
          {{ item.shortName }}
        </button>
      </div>
    </section>

    <section id="o-hotelu" class="story page-section" aria-labelledby="story-title">
      <div class="story-image">
        <img src="/images/Lobby.jpg" alt="Lobby hotelu Element" loading="lazy" />
      </div>
      <div class="story-copy">
        <p class="eyebrow">Hotel Element</p>
        <h2 id="story-title">Pohostinnost bez zbytečných gest.</h2>
        <p>
          Vytvořili jsme hotel, kde se současný design potkává s lidským přístupem. Méně okázalosti,
          více pozornosti. Méně spěchu, více času na věci, které mají smysl.
        </p>
        <a class="outline-link" href="#kontakt">Poznat náš příběh</a>
      </div>
    </section>

    <section id="kontakt" class="contact" aria-labelledby="contact-title">
      <div class="contact-top">
        <p class="eyebrow eyebrow--light">Váš pobyt začíná tady</p>
        <h2 id="contact-title">Tak kdy přijedete?</h2>
        <a class="outline-link outline-link--light" href="mailto:ondrej.kodat@seznam.cz">Napsat hotelu</a>
      </div>

      <div class="contact-details">
        <div>
          <span>Adresa</span>
          <p>Sladkovského 1882<br />Pardubice</p>
        </div>
        <div>
          <span>Kontakt</span>
          <a href="tel:+420721576003">+420 721 576 003</a>
          <a href="mailto:ondrej.kodat@seznam.cz">ondrej.kodat@seznam.cz</a>
        </div>
        <div>
          <span>Recepce</span>
          <p>Každý den<br />nonstop</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <RouterLink to="/#domu" class="footer-brand">ELEMENT</RouterLink>
      <div class="footer-links">
        <a href="#pokoje">Pokoje</a>
        <a href="#restaurace">Gastronomie</a>
        <a href="#wellness">Wellness</a>
        <a href="#kontakt">Kontakt</a>
      </div>
      <p>© 2026 Hotel Element · Pardubice</p>
    </footer>
  </main>
</template>

<style scoped>
.home-page {
  --ink: #161916;
  --paper: #f3f0e8;
  --paper-deep: #e7e2d7;
  --coral: #ff704d;
  color: var(--ink);
  background: var(--paper);
  overflow: clip;
}

.page-section { padding: clamp(5.5rem, 10vw, 9.5rem) clamp(1.25rem, 5vw, 5rem); }
.page-section--dark { color: var(--paper); background: var(--ink); }
.eyebrow { margin: 0; color: #5e625b; font-size: .72rem; font-weight: 700; letter-spacing: .2em; line-height: 1.4; text-transform: uppercase; }
.eyebrow--light { color: rgba(255, 255, 255, .72); }

.hero { position: relative; min-height: 48rem; height: 100svh; color: #fff; background: #222; isolation: isolate; }
.hero-media, .hero-shade { position: absolute; inset: 0; width: 100%; height: 100%; }
.hero-media { z-index: -2; object-fit: cover; animation: slowZoom 18s ease-in-out infinite alternate; }
.hero-shade { z-index: -1; background: linear-gradient(180deg, rgba(8, 12, 9, .5) 0%, rgba(8, 12, 9, .05) 34%, rgba(8, 12, 9, .72) 100%), linear-gradient(90deg, rgba(8, 12, 9, .2), transparent 70%); }
.hero-copy { position: absolute; right: clamp(1.25rem, 5vw, 5rem); bottom: clamp(5.5rem, 11vh, 8.5rem); left: clamp(1.25rem, 5vw, 5rem); animation: copyIn 1s .15s both; }
.hero h1, .section-intro h2, .wellness-heading h2, .story-copy h2, .contact h2 { font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif; font-weight: 400; letter-spacing: -.045em; }
.hero h1 { max-width: 68rem; margin: 1.2rem 0 2rem; font-size: clamp(4rem, 8.8vw, 9rem); line-height: .84; }
.hero h1 em, .wellness-heading h2 em { font-weight: 400; }
.hero-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; }
.hero-bottom p { max-width: 31rem; margin: 0; font-size: clamp(1rem, 1.5vw, 1.25rem); line-height: 1.55; }
.outline-link { display: inline-flex; min-height: 3rem; align-items: center; justify-content: center; padding: .75rem 1.25rem; border: 1px solid currentColor; color: var(--ink); font-size: .76rem; font-weight: 700; letter-spacing: .13em; text-decoration: none; text-transform: uppercase; transition: color 220ms ease, background 220ms ease, transform 220ms ease; }
.outline-link:hover { color: var(--paper); background: var(--ink); transform: translateY(-2px); }
.outline-link--light { color: #fff; }
.outline-link--light:hover { color: var(--ink); background: #fff; }
.scroll-cue { position: absolute; right: clamp(1.25rem, 5vw, 5rem); bottom: 1.75rem; display: flex; align-items: center; gap: .75rem; color: rgba(255, 255, 255, .72); font-size: .7rem; letter-spacing: .16em; text-decoration: none; text-transform: uppercase; }
.scroll-cue span { width: 2.5rem; height: 1px; background: currentColor; transform-origin: right; animation: linePulse 1.8s ease-in-out infinite; }

.manifesto { display: grid; grid-template-columns: minmax(10rem, .5fr) minmax(18rem, 2fr); gap: 3rem; }
.manifesto-text { max-width: 70rem; margin: -.25rem 0 0; font-size: clamp(2.15rem, 4.8vw, 5.1rem); letter-spacing: -.045em; line-height: 1.06; }
.manifesto-text em { color: var(--coral); font-family: 'Iowan Old Style', Baskerville, serif; }
.manifesto-note { grid-column: 2; display: grid; grid-template-columns: 1fr 1.35fr; max-width: 44rem; gap: 2rem; margin-top: 2.5rem; margin-left: auto; padding-top: 1.5rem; border-top: 1px solid #bbb8af; }
.manifesto-note span { font-weight: 700; }
.manifesto-note p { margin: 0; color: #5e625b; line-height: 1.7; }

.section-intro { display: grid; grid-template-columns: 1.4fr .6fr; align-items: end; gap: 4rem; margin-bottom: clamp(3rem, 6vw, 6rem); }
.section-intro h2 { margin: 1rem 0 0; font-size: clamp(3rem, 6vw, 6.5rem); line-height: .95; }
.section-intro > p, .section-sidecopy > p { max-width: 29rem; margin: 0; color: #646861; line-height: 1.75; }
.section-intro--light > p { color: rgba(255, 255, 255, .58); }

.room-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1rem, 2.5vw, 2.25rem); }
.room-card { position: relative; min-height: clamp(28rem, 53vw, 43rem); overflow: hidden; color: #fff; background: #2b2d29; }
.room-card:nth-child(even) { min-height: clamp(24rem, 47vw, 38rem); margin-top: clamp(3rem, 8vw, 8rem); }
.room-card img, .room-shade { position: absolute; inset: 0; width: 100%; height: 100%; }
.room-card img { object-fit: cover; transition: transform 800ms cubic-bezier(.2, .7, .2, 1); }
.room-card:hover img { transform: scale(1.045); }
.room-shade { background: linear-gradient(180deg, rgba(0, 0, 0, .06) 30%, rgba(0, 0, 0, .76) 100%); }
.room-meta { position: absolute; right: 2rem; bottom: 2rem; left: 2rem; }
.room-meta p { margin: 0 0 .7rem; font-size: .72rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
.room-meta h3 { margin: 0; font-family: 'Iowan Old Style', Baskerville, serif; font-size: clamp(2.2rem, 4vw, 4rem); font-weight: 400; letter-spacing: -.035em; }
.room-meta span { display: block; max-width: 27rem; max-height: 0; margin-top: 0; overflow: hidden; opacity: 0; line-height: 1.6; transition: opacity 300ms ease, max-height 300ms ease, margin 300ms ease; }
.room-card:hover .room-meta span, .room-card:focus-within .room-meta span { max-height: 6rem; margin-top: .75rem; opacity: .82; }
.room-card > a { position: absolute; inset: 0; color: transparent; font-size: 0; }
.room-card--featured { isolation: isolate; }
.room-card--featured .room-shade { background: linear-gradient(180deg, rgba(10, 12, 9, .48) 0%, rgba(10, 12, 9, .03) 42%, rgba(10, 12, 9, .35) 100%); }
.room-featured-top { position: absolute; z-index: 1; top: 1.75rem; right: 1.75rem; left: 1.75rem; display: flex; align-items: center; justify-content: space-between; padding-bottom: .9rem; border-bottom: 1px solid rgba(255, 255, 255, .48); }
.room-featured-top span { display: grid; width: 2.15rem; height: 2.15rem; place-items: center; border: 1px solid rgba(255, 255, 255, .7); border-radius: 50%; font-family: 'Iowan Old Style', Baskerville, serif; font-size: .88rem; }
.room-featured-top p { margin: 0; font-size: .66rem; font-weight: 700; letter-spacing: .17em; text-transform: uppercase; }
.room-featured-panel { position: absolute; z-index: 1; right: 1.25rem; bottom: 1.25rem; left: 1.25rem; padding: clamp(1.35rem, 3vw, 2.2rem); color: var(--ink); background: rgba(243, 240, 232, .94); box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, .2); backdrop-filter: blur(18px); }
.room-kicker { margin: 0 0 1rem; color: #6a6e66; font-size: .68rem; font-weight: 700; letter-spacing: .17em; text-transform: uppercase; }
.room-featured-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; }
.room-featured-heading h3 { max-width: 27rem; margin: 0; font-family: 'Iowan Old Style', Baskerville, serif; font-size: clamp(2.3rem, 4vw, 4.15rem); font-weight: 400; letter-spacing: -.045em; line-height: .94; }
.room-price { flex: 0 0 auto; text-align: right; }
.room-price strong { display: block; color: var(--coral); font-family: 'Iowan Old Style', Baskerville, serif; font-size: clamp(1.3rem, 2vw, 1.75rem); font-weight: 400; }
.room-price span { color: #72766f; font-size: .72rem; }
.room-featured-description { max-width: 33rem; margin: 1.15rem 0 1.35rem; color: #555951; font-size: .92rem; line-height: 1.65; }
.room-featured-footer { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(22, 25, 22, .18); }
.room-featured-footer ul { display: flex; flex-wrap: wrap; gap: .55rem 1.15rem; margin: 0; padding: 0; list-style: none; }
.room-featured-footer li { position: relative; padding-left: .75rem; color: #555951; font-size: .72rem; }
.room-featured-footer li::before { position: absolute; top: .45em; left: 0; width: .28rem; height: .28rem; border-radius: 50%; background: var(--coral); content: ''; }
.room-cta { display: flex; flex: 0 0 auto; align-items: center; gap: .75rem; font-size: .68rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.room-cta b { display: grid; width: 2.2rem; height: 2.2rem; place-items: center; border-radius: 50%; color: #fff; background: var(--coral); font-size: 1rem; transition: transform 220ms ease; }
.room-card--featured:hover .room-cta b { transform: rotate(45deg); }

.dining { background: var(--paper); }
.section-sidecopy { display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem; }
.dining-feature { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(20rem, .75fr); min-height: 42rem; background: var(--paper-deep); }
.dining-image { min-height: 36rem; overflow: hidden; }
.dining-image img { width: 100%; height: 100%; object-fit: cover; }
.dining-copy { display: flex; flex-direction: column; justify-content: space-between; padding: clamp(2rem, 5vw, 4.5rem); }
.dining-copy h3 { margin: 1.2rem 0 1.6rem; color: var(--coral); font-family: 'Iowan Old Style', Baskerville, serif; font-size: clamp(3.5rem, 6vw, 6rem); font-weight: 400; letter-spacing: -.05em; }
.body-copy { max-width: 30rem; margin: 0; line-height: 1.8; }
.slider-controls { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-top: 2rem; border-top: 1px solid #bcb9af; }
.slider-controls > button, .wellness-tabs button { border: 0; color: inherit; background: transparent; font: inherit; cursor: pointer; }
.slider-controls > button { padding: .5rem 0; font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.slider-dots { display: flex; gap: .6rem; }
.slider-dots button { width: .65rem; height: .65rem; padding: 0; border: 1px solid var(--ink); border-radius: 50%; background: transparent; cursor: pointer; }
.slider-dots button.active { background: var(--ink); }

.wellness { display: grid; grid-template-columns: minmax(18rem, .7fr) minmax(24rem, 1.3fr); grid-template-rows: auto auto; gap: 3rem clamp(3rem, 7vw, 8rem); color: #fff; background: #4f5b48; }
.wellness-heading h2 { margin: 1.5rem 0 0; font-size: clamp(3.5rem, 6.8vw, 7.2rem); line-height: .9; }
.wellness-heading h2 em { color: #dce4cf; }
.wellness-stage { position: relative; min-height: 38rem; overflow: hidden; }
.wellness-stage img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.wellness-caption { position: absolute; right: 1.5rem; bottom: 1.5rem; left: 1.5rem; padding: 1.5rem; background: rgba(14, 18, 13, .76); backdrop-filter: blur(14px); }
.wellness-caption h3 { margin: 0 0 .55rem; font-family: 'Iowan Old Style', Baskerville, serif; font-size: 2rem; font-weight: 400; }
.wellness-caption p { max-width: 35rem; margin: 0; color: rgba(255, 255, 255, .72); line-height: 1.6; }
.wellness-tabs { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid rgba(255, 255, 255, .28); }
.wellness-tabs button { position: relative; padding: 1.4rem 0; border-right: 1px solid rgba(255, 255, 255, .22); color: rgba(255, 255, 255, .62); font-size: clamp(1rem, 1.5vw, 1.2rem); text-align: left; transition: color 200ms ease, padding 200ms ease; }
.wellness-tabs button:last-child { border-right: 0; }
.wellness-tabs button.active { padding-left: 1rem; color: #fff; }
.wellness-tabs button.active::before { position: absolute; top: -1px; right: 0; left: 0; height: 3px; background: #dce4cf; content: ''; }

.story { display: grid; grid-template-columns: minmax(22rem, 1.1fr) minmax(18rem, .9fr); align-items: center; gap: clamp(3rem, 8vw, 9rem); background: var(--paper); }
.story-image { min-height: 42rem; }
.story-image img { width: 100%; height: 100%; object-fit: cover; }
.story-copy h2 { margin: 1.2rem 0 2rem; font-size: clamp(3rem, 5vw, 5.4rem); line-height: .97; }
.story-copy > p:not(.eyebrow) { max-width: 32rem; margin: 0 0 2rem; color: #5e625b; line-height: 1.85; }

.contact { padding: clamp(5.5rem, 10vw, 9rem) clamp(1.25rem, 5vw, 5rem) 3rem; color: #fff; background: var(--coral); }
.contact-top { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 2rem; padding-bottom: clamp(4rem, 8vw, 8rem); }
.contact-top .eyebrow { grid-column: 1 / -1; color: rgba(255, 255, 255, .72); }
.contact h2 { margin: 0; font-size: clamp(4rem, 10vw, 10rem); line-height: .84; }
.contact-details { display: grid; grid-template-columns: 1.4fr 1fr .7fr; gap: 2rem; padding: 2rem 0; border-top: 1px solid rgba(255, 255, 255, .45); }
.contact-details span { display: block; margin-bottom: 1rem; color: rgba(255, 255, 255, .68); font-size: .7rem; font-weight: 700; letter-spacing: .17em; text-transform: uppercase; }
.contact-details p, .contact-details a { display: block; margin: 0; color: #fff; line-height: 1.65; text-decoration: none; }

.footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 2rem; padding: 2rem clamp(1.25rem, 5vw, 5rem); color: rgba(255, 255, 255, .65); background: var(--ink); }
.footer-brand { color: #fff; font-size: 1.3rem; letter-spacing: .22em; text-decoration: none; }
.footer-links { display: flex; gap: 1.5rem; }
.footer-links a { color: inherit; font-size: .85rem; text-decoration: none; }
.footer p { margin: 0; font-size: .75rem; text-align: right; }

.media-swap-enter-active, .copy-swap-enter-active { transition: opacity 450ms ease, transform 600ms cubic-bezier(.2, .7, .2, 1); }
.media-swap-leave-active, .copy-swap-leave-active { transition: opacity 220ms ease, transform 300ms ease; }
.media-swap-enter-from, .copy-swap-enter-from { opacity: 0; transform: translateY(1.25rem); }
.media-swap-leave-to, .copy-swap-leave-to { opacity: 0; transform: translateY(-.75rem); }

@keyframes copyIn { from { opacity: 0; transform: translateY(2rem); } to { opacity: 1; transform: translateY(0); } }
@keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.05); } }
@keyframes linePulse { 0%, 100% { transform: scaleX(1); opacity: 1; } 50% { transform: scaleX(.35); opacity: .45; } }

@media (max-width: 960px) {
  .manifesto, .section-intro, .story { grid-template-columns: 1fr; }
  .manifesto-note { grid-column: 1; }
  .dining-feature { grid-template-columns: 1.25fr .85fr; }
  .wellness { grid-template-columns: 1fr; }
  .wellness-stage { min-height: 34rem; }
}

@media (max-width: 720px) {
  .hero { min-height: 42rem; }
  .hero h1 { font-size: clamp(3.4rem, 16vw, 5.5rem); }
  .hero-bottom { align-items: flex-start; flex-direction: column; }
  .scroll-cue { display: none; }
  .manifesto-note, .contact-top, .contact-details, .footer { grid-template-columns: 1fr; }
  .room-list { grid-template-columns: 1fr; }
  .room-card, .room-card:nth-child(even) { min-height: 31rem; margin-top: 0; }
  .room-meta span { max-height: 6rem; margin-top: .75rem; opacity: .82; }
  .room-card--featured { min-height: 43rem; }
  .room-featured-heading { align-items: flex-start; flex-direction: column; gap: .8rem; }
  .room-price { text-align: left; }
  .room-featured-footer { align-items: flex-start; flex-direction: column; }
  .dining-feature { grid-template-columns: 1fr; }
  .dining-image { min-height: 25rem; }
  .wellness-stage, .story-image { min-height: 28rem; }
  .wellness-tabs { grid-template-columns: repeat(2, 1fr); }
  .wellness-tabs button { border-bottom: 1px solid rgba(255, 255, 255, .22); }
  .contact-top .eyebrow { grid-column: 1; }
  .contact-top .outline-link { justify-self: start; }
  .footer-links { flex-wrap: wrap; }
  .footer p { text-align: left; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
</style>
