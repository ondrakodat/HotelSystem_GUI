
<script setup>
import { ref } from 'vue'

// Aktuální slide restaurací
const restaurantSlide = ref(0)

// Aktuální slide wellness
const wellnessSlide = ref(0)

// Restaurace
const restaurants = [
  {
    name: 'Restaurace Horizont',
    description:
      'Restaurace Horizont zve k dokonalému kulinářskému zážitku v moderním prostředí s jedinečnou atmosférou. Nabízí pestrý výběr pokrmů inspirovaných mezinárodní i českou kuchyní, připravovaných z čerstvých lokálních surovin.',
    image: '/images/Restaurace_Horizont/Horizont_Pozadi.jpg',
    link: '#kontakt'
  },
  {
    name: 'Restaurace Panorama',
    description:
      'Restaurace Panorama nabízí jedinečný gastronomický zážitek s výhledem na malebnou krajinu. Naši kuchaři připravují pokrmy z čerstvých lokálních surovin, inspirované moderní i tradiční kuchyní.',
    image: '/images/Restaurace_Panorama/Panorama_pozadi.jpg',
    link: '#kontakt'
  }
]

// Pokoje
const rooms = [
  {
    name: 'Jednolůžkový pokoj',
    description:
      'Kompaktní pokoj pro jednu osobu s jednolůžkem, pracovním stolem a základním vybavením.',
    image: '/images/Jednoluzkovy/Jednoluzkovy.jpg'
  },
  {
    name: 'Dvoulůžkový pokoj',
    description:
      'Pokoj s manželskou postelí nebo dvěma oddělenými postelemi. Ideální pro páry nebo dvojice.',
    image: '/images/Dvouluzkovy/Dvouluzkovy.jpg'
  },
  {
    name: 'Studio',
    description:
      'Otevřený prostor kombinující ložnici a obývací část. Vhodné pro páry nebo malé rodiny.',
    image: '/images/Studio/Studio.jpg'
  },
  {
    name: 'Apartmá',
    description:
      'Prostorný pokoj s oddělenou ložnicí a obývací částí. Ideální pro rodiny a delší pobyty.',
    image: '/images/Apartma/Apartma.jpg'
  }
]

// Wellness
const wellness = [
  {
    name: 'Bazén',
    description:
      'Krytý bazén s průzračně čistou vodou, brouzdalištěm pro děti a odpočinkovou zónou.',
    image: '/images/Bazen/Bazen_Vnitrni.jpg'
  },
  {
    name: 'Masáže',
    description:
      'Dopřejte si okamžik klidu a uvolnění. Zkušené ruce masérů vás přenesou do světa relaxace.',
    image: '/images/Maserna/Maserna.jpg'
  },
  {
    name: 'Sauna',
    description:
      'Nechte své tělo prohřát v jemném teple sauny a vychutnejte si pocit naprostého klidu.',
    image: '/images/Sauny/Sauna.jpg'
  },
  {
    name: 'Fitness',
    description:
      'Moderně vybavené fitness centrum pro udržení kondice i aktivní odpočinek.',
    image: '/images/Fitness/Fitness_Pohled.jpg'
  },
  {
    name: 'Venkovní bazén',
    description:
      'Sluneční terasa s lehátky, osvěžující voda a ideální prostor pro letní relaxaci.',
    image: '/images/Bazen/Bazen_Venkovni.jpg'
  }
]

// Přechod na další restauraci
const nextRestaurant = () => {
  restaurantSlide.value =
    (restaurantSlide.value + 1) % restaurants.length
}

// Přechod na předchozí restauraci
const previousRestaurant = () => {
  restaurantSlide.value =
    (restaurantSlide.value - 1 + restaurants.length) % restaurants.length
}

// Přechod na další wellness
const nextWellness = () => {
  wellnessSlide.value =
    (wellnessSlide.value + 1) % wellness.length
}

// Přechod na předchozí wellness
const previousWellness = () => {
  wellnessSlide.value =
    (wellnessSlide.value - 1 + wellness.length) % wellness.length
}
</script>

<template>
  <main class="home-page">

    <!-- HERO -->
    <section id="domu" class="hero">

      <video
        class="hero-video"
        autoplay
        muted
        loop
        playsinline
        poster="/images/Hotel_pozadi.jpg"
      >
        <source
          src="/videos/Pozadi_Stranky.mp4"
          type="video/mp4"
        />
      </video>

      <div class="hero-overlay"></div>

      <div class="hero-content">
        <span class="hero-subtitle">WELLNESS HOTEL ELEMENT</span>

        <h1>
          Vítejte v místě,<br />
          kde se čas zpomalí.
        </h1>

        <p>
          Dopřejte si klid, pohodlí a výjimečné zážitky
          v srdci přírody.
        </p>

        <a href="#pokoje" class="hotel-button">
          Objevte náš hotel
        </a>
      </div>

      <a href="#restaurace" class="hero-scroll">
        <span>Objevte více</span>
        <span class="scroll-arrow">↓</span>
      </a>

    </section>


    <!-- RESTAURACE -->
    <section id="restaurace" class="home-section">

      <div class="section-heading">
        <span>GASTRONOMIE</span>
        <h2>Naše restaurace</h2>
        <p>
          Vychutnejte si jedinečné gastronomické zážitky
          v příjemném prostředí našeho hotelu.
        </p>
      </div>

      <div class="showcase">

        <button
          class="slide-arrow left"
          @click="previousRestaurant"
          aria-label="Předchozí restaurace"
        >
          ‹
        </button>

        <div class="showcase-image">

          <Transition name="image-transition" mode="out-in">
            <img
              :key="restaurants[restaurantSlide].image"
              :src="restaurants[restaurantSlide].image"
              :alt="restaurants[restaurantSlide].name"
            />
          </Transition>

        </div>

        <div class="showcase-content">

          <Transition name="content-transition" mode="out-in">
            <div :key="restaurantSlide">

              <span class="content-number">
                0{{ restaurantSlide + 1 }} / 02
              </span>

              <h3>{{ restaurants[restaurantSlide].name }}</h3>

              <p>
                {{ restaurants[restaurantSlide].description }}
              </p>

              <a
                :href="restaurants[restaurantSlide].link"
                class="hotel-button"
              >
                Více informací
              </a>

            </div>
          </Transition>

          <div class="slide-dots">
            <button
              v-for="(_, index) in restaurants"
              :key="index"
              :class="{ active: restaurantSlide === index }"
              @click="restaurantSlide = index"
              :aria-label="`Restaurace ${index + 1}`"
            ></button>
          </div>

        </div>

        <button
          class="slide-arrow right"
          @click="nextRestaurant"
          aria-label="Další restaurace"
        >
          ›
        </button>

      </div>
    </section>


    <!-- POKOJE -->
    <section id="pokoje" class="home-section rooms-section">

      <div class="section-heading">
        <span>UBYTOVÁNÍ</span>
        <h2>Naše pokoje</h2>
        <p>
          Vyberte si ubytování, které bude odpovídat
          vašim představám o dokonalém odpočinku.
        </p>
      </div>

      <div class="rooms-grid">

        <article
          v-for="(room, index) in rooms"
          :key="room.name"
          class="room-card"
        >

          <div class="room-image">
            <img :src="room.image" :alt="room.name" />
          </div>

          <div class="room-content">

            <span class="room-number">
              0{{ index + 1 }}
            </span>

            <h3>{{ room.name }}</h3>

            <p>{{ room.description }}</p>

            <a href="#kontakt" class="text-link">
              Více informací →
            </a>

          </div>
        </article>

      </div>
    </section>


    <!-- WELLNESS -->
    <section id="wellness" class="home-section wellness-section">

      <div class="section-heading">
        <span>RELAXACE A ODPOČINEK</span>
        <h2>Wellness & Relax</h2>
        <p>
          Dopřejte svému tělu i mysli zasloužený odpočinek.
        </p>
      </div>

      <div class="showcase wellness-showcase">

        <button
          class="slide-arrow left"
          @click="previousWellness"
          aria-label="Předchozí wellness"
        >
          ‹
        </button>

        <div class="showcase-image">

          <Transition name="image-transition" mode="out-in">
            <img
              :key="wellness[wellnessSlide].image"
              :src="wellness[wellnessSlide].image"
              :alt="wellness[wellnessSlide].name"
            />
          </Transition>

        </div>

        <div class="showcase-content">

          <Transition name="content-transition" mode="out-in">
            <div :key="wellnessSlide">

              <span class="content-number">
                0{{ wellnessSlide + 1 }} / 05
              </span>

              <h3>{{ wellness[wellnessSlide].name }}</h3>

              <p>
                {{ wellness[wellnessSlide].description }}
              </p>

              <a href="#kontakt" class="hotel-button">
                Více informací
              </a>

            </div>
          </Transition>

          <div class="slide-dots">
            <button
              v-for="(_, index) in wellness"
              :key="index"
              :class="{ active: wellnessSlide === index }"
              @click="wellnessSlide = index"
              :aria-label="`Wellness ${index + 1}`"
            ></button>
          </div>

        </div>

        <button
          class="slide-arrow right"
          @click="nextWellness"
          aria-label="Další wellness"
        >
          ›
        </button>

      </div>
    </section>


    <!-- RECENZE -->
    <section id="recenze" class="home-section reviews-section">

      <div class="section-heading">
        <span>NAŠI HOSTÉ</span>
        <h2>Co o nás říkají</h2>
        <p>
          Spokojenost našich hostů je pro nás na prvním místě.
        </p>
      </div>

      <div class="reviews-placeholder">

        <span>★★★★★</span>

        <p>
          Vaše hodnocení nám pomáhají neustále zlepšovat
          kvalitu našich služeb.
        </p>

        <small>Recenze hostů budou brzy k dispozici.</small>

      </div>
    </section>


    <!-- O HOTELU -->
    <section id="o-hotelu" class="home-section about-section">

      <div class="about-image">
        <img
          src="/images/Hotel_pozadi.jpg"
          alt="Hotel Element"
        />
      </div>

      <div class="about-content">

        <span>HOTEL ELEMENT</span>

        <h2>
          Místo, kde se komfort setkává s harmonií přírody.
        </h2>

        <p>
          Hotel Element je zasazen do klidného prostředí,
          kde se moderní design snoubí s atmosférou pohodlí
          a nerušeného odpočinku.
        </p>

        <p>
          Našim hostům nabízíme prostor, který spojuje
          kvalitní služby, příjemné prostředí a výjimečné
          zážitky.
        </p>

        <a href="#kontakt" class="hotel-button">
          Kontaktujte nás
        </a>

      </div>
    </section>


    <!-- KONTAKT -->
    <section id="kontakt" class="contact-section">

      <div class="section-heading">
        <span>JSME TU PRO VÁS</span>
        <h2>Kontakt</h2>
      </div>

      <div class="contact-grid">

        <div>
          <span class="contact-icon">⌖</span>
          <h3>Adresa</h3>
          <p>Pardubice, Sladkovického 1882</p>
        </div>

        <div>
          <span class="contact-icon">☎</span>
          <h3>Telefon</h3>
          <p>721 576 003</p>
        </div>

        <div>
          <span class="contact-icon">✉</span>
          <h3>E-mail</h3>
          <p>ondrej.kodat@seznam.cz</p>
        </div>

      </div>
    </section>


    <!-- PATIČKA -->
    <footer class="home-footer">

      <div>
        <h3>HOTEL ELEMENT</h3>
        <p>Vaše místo pro dokonalý odpočinek.</p>
      </div>

      <div class="footer-links">
        <a href="#domu">Domů</a>
        <a href="#pokoje">Pokoje</a>
        <a href="#restaurace">Restaurace</a>
        <a href="#wellness">Wellness</a>
        <a href="#kontakt">Kontakt</a>
      </div>

      <small>
        © 2026 Hotel Element. Všechna práva vyhrazena.
      </small>

    </footer>

  </main>
</template>

<style scoped>
.home-page {
  --brown: #915d3f;
  --brown-dark: #6e3c21;
  --text-dark: #38190b;
  --text-light: #4a3a30;
  --cream: #f8f4f0;
  --white: #ffffff;

  color: var(--text-light);
  overflow: hidden;
  scroll-behavior: smooth;
}

/* HERO */

.hero {
  position: relative;
  min-height: 680px;
  height: 85vh;
  max-height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: heroZoom 18s ease-in-out infinite alternate;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0.35),
    rgba(0, 0, 0, 0.55)
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 25px;
  animation: heroFadeIn 1.2s ease both;
}

.hero-subtitle,
.section-heading span,
.about-content > span {
  color: #c49a6c;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 4px;
}

.hero-content h1 {
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 500;
  margin: 25px 0;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.15rem;
  margin-bottom: 35px;
}

.hero-scroll {
  position: absolute;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 0.85rem;
  z-index: 2;
}

.scroll-arrow {
  animation: scrollBounce 1.8s ease-in-out infinite;
}

/* BUTTON */

.hotel-button {
  display: inline-block;
  background: var(--brown);
  color: white;
  text-decoration: none;
  border-radius: 999px;
  padding: 13px 28px;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid var(--brown);
}

.hotel-button:hover {
  background: var(--brown-dark);
  border-color: var(--brown-dark);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(110, 60, 33, 0.2);
}

/* SECTIONS */

.home-section {
  padding: 90px 7%;
}

.section-heading {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 55px;
}

.section-heading h2 {
  color: var(--text-dark);
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 15px 0;
  font-weight: 500;
}

.section-heading p {
  line-height: 1.8;
  color: #78695e;
}

/* SHOWCASE */

.showcase {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  gap: 55px;
}

.showcase-image {
  height: 440px;
  overflow: hidden;
  border-radius: 18px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  position: relative;
}

.showcase-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ANIMACE OBRÁZKŮ */

.image-transition-enter-active {
  transition:
    opacity 0.65s ease,
    transform 0.8s cubic-bezier(0.2, 0.7, 0.3, 1);
}

.image-transition-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.4s ease;
}

.image-transition-enter-from {
  opacity: 0;
  transform: scale(1.07);
}

.image-transition-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

/* ANIMACE TEXTU */

.content-transition-enter-active {
  transition:
    opacity 0.45s ease,
    transform 0.55s ease;
}

.content-transition-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.3s ease;
}

.content-transition-enter-from {
  opacity: 0;
  transform: translateY(18px);
}

.content-transition-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.showcase-content {
  padding: 20px;
}

.content-number,
.room-number {
  color: var(--brown);
  letter-spacing: 3px;
  font-size: 0.85rem;
  font-weight: 600;
}

.showcase-content h3 {
  color: var(--text-dark);
  font-size: 2.2rem;
  margin: 20px 0;
}

.showcase-content p {
  line-height: 1.9;
  margin-bottom: 30px;
}

.slide-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  background: var(--brown);
  color: white;
  font-size: 2rem;
  z-index: 3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.slide-arrow:hover {
  background: var(--brown-dark);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.slide-arrow.left {
  left: -22px;
}

.slide-arrow.right {
  right: -22px;
}

.slide-dots {
  display: flex;
  gap: 10px;
  margin-top: 35px;
}

.slide-dots button {
  width: 10px;
  height: 10px;
  border: none;
  border-radius: 50%;
  background: #d6c8bc;
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

.slide-dots button:hover {
  transform: scale(1.3);
}

.slide-dots button.active {
  background: var(--brown);
  transform: scale(1.2);
}

/* ROOMS */

.rooms-section {
  background: var(--cream);
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  max-width: 1400px;
  margin: auto;
}

.room-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;
}

.room-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.room-image {
  height: 230px;
  overflow: hidden;
}

.room-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.65s ease;
}

.room-card:hover img {
  transform: scale(1.07);
}

.room-content {
  padding: 25px;
}

.room-content h3 {
  color: var(--brown);
  font-size: 1.2rem;
  margin: 12px 0;
}

.room-content p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: #78695e;
}

.text-link {
  color: var(--brown);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.25s ease;
}

.text-link:hover {
  color: var(--brown-dark);
}

/* WELLNESS */

.wellness-section {
  background: white;
}

.wellness-showcase {
  grid-template-columns: 1fr 1fr;
}

/* REVIEWS */

.reviews-section {
  background: var(--cream);
}

.reviews-placeholder {
  max-width: 650px;
  margin: auto;
  padding: 45px;
  text-align: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.reviews-placeholder:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.09);
}

.reviews-placeholder span {
  color: #c49a6c;
  font-size: 2rem;
  letter-spacing: 5px;
}

.reviews-placeholder p {
  margin: 20px 0;
  line-height: 1.8;
}

.reviews-placeholder small {
  color: #998b80;
}

/* ABOUT */

.about-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 65px;
  max-width: 1400px;
  margin: auto;
}

.about-image {
  height: 420px;
  border-radius: 18px;
  overflow: hidden;
}

.about-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.about-image:hover img {
  transform: scale(1.04);
}

.about-content h2 {
  color: var(--text-dark);
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1.35;
  margin: 20px 0;
}

.about-content p {
  line-height: 1.9;
  margin-bottom: 20px;
}

/* CONTACT */

.contact-section {
  padding: 80px 7%;
  background: var(--cream);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1100px;
  margin: auto;
  gap: 30px;
  text-align: center;
}

.contact-grid h3 {
  color: var(--text-dark);
  margin: 15px 0 10px;
}

.contact-icon {
  font-size: 2rem;
  color: var(--brown);
}

.contact-grid p {
  color: #78695e;
  overflow-wrap: anywhere;
}

/* FOOTER */

.home-footer {
  background: #302017;
  color: white;
  padding: 50px 7% 25px;
  text-align: center;
}

.home-footer h3 {
  letter-spacing: 3px;
  font-weight: 500;
}

.home-footer p {
  color: #c5b6a9;
}

.footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
  margin: 30px 0;
}

.footer-links a {
  color: #e0d4ca;
  text-decoration: none;
  transition: color 0.25s ease;
}

.footer-links a:hover {
  color: #c49a6c;
}

.home-footer small {
  color: #a99b90;
}

/* KEYFRAMES */

@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroZoom {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.06);
  }
}

@keyframes scrollBounce {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(8px);
  }
}

/* RESPONSIVE */

@media (max-width: 1000px) {
  .rooms-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .showcase {
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .hero {
    height: 75vh;
    min-height: 550px;
  }

  .home-section {
    padding: 65px 6%;
  }

  .showcase,
  .wellness-showcase,
  .about-section {
    grid-template-columns: 1fr;
  }

  .showcase-image {
    height: 300px;
  }

  .showcase-content {
    padding: 15px 5px;
  }

  .slide-arrow.left {
    left: -12px;
  }

  .slide-arrow.right {
    right: -12px;
  }

  .rooms-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .room-image {
    height: 180px;
  }

  .room-content {
    padding: 17px;
  }

  .about-image {
    height: 300px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 35px;
  }
}

@media (max-width: 480px) {
  .rooms-grid {
    grid-template-columns: 1fr;
  }

  .hero-content h1 {
    font-size: 2.3rem;
  }

  .footer-links {
    gap: 15px;
  }
}

/* RESPEKTOVÁNÍ NASTAVENÍ OMEZENÍ ANIMACÍ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
