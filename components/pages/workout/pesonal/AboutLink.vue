<template>
  <nuxt-link to="/workout/personal/about">
    <div class="workout__top2">
      <VP>О персональной программе</VP>
      <svg width="28" height="27" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24.5 11.833H7.483l6.175-6.175-1.65-1.65L3.018 13l8.992 8.991 1.65-1.65-6.176-6.174H24.5v-2.334z"
        />
      </svg>
    </div>
  </nuxt-link>
</template>

<style scoped>
.workout__top2 {
  display: flex;
  margin-top: var(--space-half);
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: var(--space-third);
  border-radius: var(--radius);
  box-sizing: border-box;
  background: var(--grey-light1);
}

.workout__top2 svg {
  transform: rotate(180deg);
}

.workout__top2 svg path {
  fill: var(--grey-light3);
}

.workout__top2 p {
  line-height: 0.9;
  font-size: 19px;
  color: var(--grey-light3);
  font-weight: 300;
}
</style>
