<template>
  <div class="body">
    <VPageHeading btn-color="var(--green-base)" button>День отдыха</VPageHeading>
    <div>
      <svg
        class="body__svg"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M462 44h-48V30a30 30 0 00-60 0v14H186V30a30 30 0 00-60 0v14H84c-28 0-50 22-50 50v170a10 10 0 0020 0V147h360a10 10 0 000-20H54V94c0-17 13-30 30-30h42v13a30 30 0 0060 0V64h168v13a30 30 0 0060 0V64h48c17 0 30 13 30 30v380a18 18 0 01-36 0v-26c0-5-4-10-10-10H330a10 10 0 000 20h106v16c0 7 2 13 5 18H38c-10 0-18-8-18-18v-16h224a10 10 0 000-20H144a82 82 0 10-107 0H10c-6 0-10 5-10 10v26c0 21 17 38 38 38h436c21 0 38-17 38-38V94c0-28-22-50-50-50zM166 77a10 10 0 01-20 0V30a10 10 0 0120 0v47zm228 0a10 10 0 01-20 0V30a10 10 0 0120 0v47zM28 376a62 62 0 11125 0 62 62 0 01-125 0z"
          fill="#FDBF00"
        />
        <path
          d="M468 130a10 10 0 00-14 0 10 10 0 000 14 10 10 0 0014 0 10 10 0 000-14zM299 441a10 10 0 00-14 0 10 10 0 000 14 10 10 0 0014 0c2-2 3-4 3-7s-1-5-3-7zM226 304a38 38 0 100 76 38 38 0 000-76zM320 304a38 38 0 100 76 38 38 0 000-76zm0 56a18 18 0 110-36 18 18 0 010 36zM413 304a38 38 0 100 76 38 38 0 000-76zm0 56a18 18 0 110-36 18 18 0 010 36zM133 200a38 38 0 100 76 38 38 0 000-76zM320 200a38 38 0 100 76 38 38 0 000-76zM413 200a38 38 0 100 76 38 38 0 000-76zm0 56a18 18 0 110-36 18 18 0 010 36zM226 200a38 38 0 100 76 38 38 0 000-76zm0 56a18 18 0 110-36 18 18 0 010 36zM126 352c-4-4-10-4-14 0l-33 32-11-11a10 10 0 00-14 14l18 18a10 10 0 0014 0l40-39c4-4 4-10 0-14z"
          fill="#FDBF00"
        />
      </svg>
      <VP>
        Сегодня день отдыха!
      </VP>

      <VP class="body__caption">
        Похудение – очень бережный процесс.
        <br/>
        Поэтому одним из главных факторов успешного похудения является отдых
        вашего тела.
      </VP>


      <VP class="body__caption">Возвращайтесь в следующий день тренировки!</VP>

      <VP class="body__caption">
        Понедельник, среда, пятница - тренировки, воскресенье - вольно!
      </VP>

      <div class="actions-wrapper">
        <nuxt-link to="/workout">
          <VButton w100>Понятно!</VButton>
        </nuxt-link>
        <div v-if="WORKOUT.day_number > 1">
          <nuxt-link
            to="/workout/personal/previous"
          >
            <VP class="previous-btn">
              Посмотреть предыдущий день
            </VP>
          </nuxt-link>
        </div>

        <VTipSmall mb="var(--space-half)" style="border-color: var(--green-base)">
          <VP class="body__caption body__caption-tip"> Можно тренироваться во вторник,
            четверг,
            субботу, нажав на
            "посмотреть предыдущий
            день".
          </VP>
        </VTipSmall>
      </div>

    </div>
  </div>
</template>

<script>
  import VTipSmall from "../../../ui/VTipSmall"

  export default {
    components: { VTipSmall },
    computed: {
      WORKOUT() {
        return this.$store.getters['workout/GET_WORKOUT']
      }
    }
  }
</script>

<style scoped>
  .actions-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }


  .body > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
  }

  .body >>> h2 {
    color: var(--green-base) !important;
  }

  .body p {
    text-align: left;
    font-size: 20px;
    font-weight: 300;
    margin-bottom: var(--space-half);
  }

  .previous-btn {
    margin-top: var(--space-third);
    padding: var(--space-third) 0;
    border-radius: var(--radius-half);
    background: var(--white-trans4);
    width: 100%;
    color: var(--grey-light3);
    text-align: center !important;
  }


  .body__caption {
    font-size: 18px !important;
    color: var(--grey-light3);
  }

  .body button {
    background: var(--green-base) !important;
  }

  .body__svg {
    align-self: center;
    max-width: 200px;
    max-height: 200px;
    margin-bottom: var(--space);
  }

  .body__svg path {
    fill: var(--green-base);
  }


  .body__caption-tip {
    margin: 0 !important;
    text-align: left !important;
  }

</style>
