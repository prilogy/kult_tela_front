<template>
  <div class="consultation">
    <VPageHeading>
      Онлайн консультация
      <template v-slot:info>
        Заполните форму ниже и оплатите участие, укажите дату, когда у вас будет
        свободное время. Беседа проходит в онлайн формате(видео).
        <br />
        Это просто. Мы всё объясним. Длительность - 1 час.
      </template>
    </VPageHeading>

    <form id="consultation__form" @submit.prevent="proceedToPay">
      <select
        required
        v-model="tutor"
        name="pets"
        id="consultation__form__tutor"
      >
        <option value="">Выберите желаемого консультанта</option>
        <option value="Богомолова">Генерал армии Богомолова</option>
        <option value="Развозжаева">Подполковник Развозжаева</option>
        <option value="Лимонова">Подполковник Лимонова</option>
      </select>
      <VInput
        required
        type="date"
        placeholder="Дата от"
        :min="minDate"
        :max="maxDate"
        caption="Дата от"
        v-model="date_from"
      ></VInput>
      <VInput
        required
        type="date"
        :min="minDate"
        :max="maxDate"
        placeholder="Дата до"
        caption="Дата до"
        v-model="date_to"
      ></VInput>

      <div
        v-if="info"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <VH3 v-if="info.price > 0" style="width: 100%">
          {{ info.price }}&#8381;/час
        </VH3>
        <div v-else-if="info.price === 0">
          <VH3>
            Бесплатно
          </VH3>
          <VCaption style="text-align: right; color: var(--grey-light3)">
            eщё {{ info.free_times_left }}
          </VCaption>
        </div>

        <VButton
          ml="var(--space-half)"
          w100
          type="submit"
          form="consultation__form"
          value="submit"
          :disabled="!validateForm"
        >
          Записаться
        </VButton>
      </div>
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
      tutor: '',
      date_from: '',
      date_to: '',
      info: null,
      minDate: null,
      maxDate: null
    }
  },
  computed: {
    validateForm() {
      return (
        Boolean(this.tutor) && Boolean(this.date_from) && Boolean(this.date_to)
      )
    }
  },
  methods: {
    async proceedToPay() {
      const info = {
        tutor: this.tutor,
        date_from: this.date_from,
        date_to: this.date_to,
        type: 1
      }
      try {
        const result = await this.$api.Request.add(info)
        this.SUCCESS('Ваша заявка успешно отправлена!')
        if (result.data && result.data.url) window.open(result.data.url)
        else this.$router.push('/')
      } catch (e) {}
    },
    ...mapActions({
      SUCCESS: 'popup/SET_SUCCESS'
    })
  },
  async asyncData(ctx) {
    try {
      const { data: info } = await ctx.app.$api.Request.getPrice()
      return { info }
    } catch (e) {}
  },
  created() {
    const date = new Date()
    this.minDate = date.toJSON().split('T')[0]
    date.setDate(date.getDate() + 20)
    this.maxDate = date.toJSON().split('T')[0]
  }
}
</script>

<style scoped>
select {
  background: var(--grey-light2);
  width: 100%;
  font-size: var(--h3-fs);
  color: var(--grey-light3);
  padding: var(--space-third) var(--space-half);
  box-sizing: border-box;
  margin-bottom: var(--space-half);
}

#consultation__form {
}
#consultation__form > div {
  margin-bottom: var(--space-half);
}
</style>
