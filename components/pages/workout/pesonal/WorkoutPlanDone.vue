<template>
  <div class="body">
    <VPageHeading headerCenter>Поздравляем!</VPageHeading>
    <div>
      <svg
        viewBox="0 0 671 563"
        class="body__svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d)">
          <g clip-path="url(#clip0)">
            <path
              d="M457 175l-85-12-37-74-38 74-85 12 61 59-14 82 76-39 75 39-14-82 61-59z"
              fill="#FDBF00"
            />
            <path
              d="M392 420c19 12 34 30 41 52l-28 10a75 75 0 00-141 0l-28-10c7-22 22-40 41-52-69-30-118-113-118-212h30c0 54 16 103 43 138 26 35 62 56 103 56 81 0 145-85 145-194h30c0 99-49 182-118 212z"
              fill="#FF9F00"
            />
            <path
              d="M392 420c19 12 34 30 41 52l-28 10a75 75 0 00-70-50v-30c81 0 145-85 145-194h30c0 99-49 182-118 212z"
              fill="#FF7816"
            />
            <path
              d="M475 433c-11 0-40 0-80-45 28-30 52-45 80-45 12 0 40 1 80 45-27 30-51 45-80 45zM459 320c5-40 17-66 40-82 10-7 33-23 91-9-5 40-16 66-39 82-28 20-61 17-92 9zM486 226c-16-37-19-66-7-92 5-10 18-36 75-53 16 37 19 66 7 91-5 11-18 36-75 54z"
              fill="#FF9F00"
            />
            <path
              d="M194 433c-12 0-40 0-80-45 27-30 51-45 80-45 11 0 39 1 79 45-27 30-51 45-79 45zM117 311c-9-6-31-23-38-82 39-9 68-7 91 9 9 7 32 23 40 82-4 1-54 18-93-9zM183 226c-39-12-63-28-75-54-5-10-16-36 7-91 39 12 63 28 75 53 5 11 16 37-7 92z"
              fill="#FDBF00"
            />
            <path
              d="M396 234l14 82-75-39V89l37 74 85 12-61 59z"
              fill="#FF9F00"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0">
            <path fill="#fff" d="M80 26h511v511H80z" />
          </clipPath>
          <filter
            id="filter0_d"
            x="0"
            y="-54"
            width="671"
            height="671"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="40" />
            <feColorMatrix
              values="0 0 0 0 1 0 0 0 0 0.623529 0 0 0 0 0 0 0 0 0.32 0"
            />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <VP>
        Персональная программа этого месяца подошла к концу. Вы хорошо
        постарались, и надеемся, прогресс уже виден!
      </VP>
      <VP class="body__caption">
        Продолжить тренировки вы сможете после начала нового месяца
      </VP>
      <nuxt-link to="/"><VButton w100>Понятно!</VButton></nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.body >>> h2 {
  color: #fdbf00 !important;
}

.body > * {
  text-align: center;
}

.body p {
  font-size: 20px;
  font-weight: 300;
  margin-bottom: var(--space-half);
}

.body__caption {
  font-size: 18px !important;
  color: var(--grey-light3);
}

.body button {
  background: #fdbf00 !important;
}

.body__svg {
  max-width: 270px;
  max-height: 270px;
}
.body__svg g {
  fill: var(--yellow-base);
  box-shadow: 0 0 10px red;
}
</style>
