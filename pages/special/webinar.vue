<template>
  <div class="webinar">
    <VPageHeading level="3">
      Вебинар с Мариной Богомоловой
      <template v-slot:info>
        Описание. Сверх крутая штука крч! Состоится 20.11 в 19:00 через Skype
        <br />
        Заполните форму ниже и оплатите участие
      </template>
    </VPageHeading>

    <form id="webinar__form" @submit.prevent="proceedToPay">
      <VInput
        required
        type="date"
        placeholder="info"
        caption="Дата от"
        v-model="date_from"
      ></VInput>
      <VInput
        required
        type="date"
        placeholder="info"
        caption="Дата до"
        v-model="date_to"
      ></VInput>
      <VButton type="submit" form="buy-form" value="submit" w100>
        Перейти к оплате
      </VButton>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { VInput } from '../../components/'

export default {
  components: { VInput },
  data() {
    return {
      date_from: '',
      date_to: ''
    }
  },
  methods: {
    proceedToPay() {
      this.SUCCESS('Ваша заявка успешно отправлена!')
      this.$router.push('/')
    },
    ...mapActions({
      SUCCESS: 'popup/SET_SUCCESS'
    })
  }
}
</script>

<style>
#webinar__form > div > .input {
  margin-bottom: var(--space-half) !important;
}
</style>
