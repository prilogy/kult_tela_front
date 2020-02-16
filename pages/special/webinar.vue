<template>
  <div class="webinar">
    <VPageHeading level="3">
      Вебинар с Мариной Богомоловой
      <template v-slot:info>
        Бесплатный вебинар, проводится в форме онлайн конференции.
        <br />
        В форме ниже укажите диапазон дат, в которые вам было бы удобно посетить
        вебинар.
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
      <VButton type="submit" form="webinar__form" value="submit" w100>
        Отправить
      </VButton>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { VInput } from '../../components/'

export default {
  middleware: 'requireSub',
  components: { VInput },
  data() {
    return {
      date_from: '',
      date_to: ''
    }
  },
  methods: {
    async proceedToPay() {
      console.log('sadasd')
      const info = {
        tutor: 'Богомолова',
        date_from: this.date_from,
        date_to: this.date_to,
        type: 0
      }
      try {
        console.log('trya')
        const result = await this.$api.Request.add(info)
        this.SUCCESS('Ваша заявка успешно отправлена!')
        this.$router.push('/')
      } catch (e) {}
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
