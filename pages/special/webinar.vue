<template>
  <div class="webinar">
    <VH2 class="webinar__title">Вебинар с Мариной Богомоловой</VH2>
    <VP class="webinar__description">
      Описание. Сверх крутая штука крч! Состоится 20.11 в 19:00 через Skype
      <br />
      Заполните форму ниже и оплатите участие
    </VP>
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
import { VH2, VP, VInput, VButton } from '../../components/'

export default {
  components: { VP, VH2, VButton, VInput },
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

<style scoped>
.webinar {
}
.webinar__title {
  margin-bottom: var(--space-half);
}
.webinar__description {
  margin-bottom: var(--space-half);
}

#webinar__form {
}
#webinar__form > div {
  margin-bottom: var(--space-half);
}
</style>
