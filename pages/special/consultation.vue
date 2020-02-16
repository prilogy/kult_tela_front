<template>
  <div class="consultation">
    <VPageHeading>
      Онлайн консультация
      <template v-slot:info>
        Заполните форму ниже и оплатите участие, укажите удобный диапазон дат
        когда вам будет удобно. Беседа проходит в онлайн формате через любой
        удобный для вас сервис.
      </template>
    </VPageHeading>

    <form id="consultation__form" @submit.prevent="proceedToPay">
      <select
        required
        v-model="tutor"
        name="pets"
        id="consultation__form__tutor"
      >
        <option value="">Выберите желаемого тьютора</option>
        <option value="Богомолова">Богомолова</option>
        <option value="Развозжаева">Развозжаева</option>
        <option value="Лимонова">Лимонова</option>
      </select>
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
      <VButton type="submit" form="consultation__form" value="submit" w100>
        Перейти к оплате
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
      tutor: '',
      date_from: '',
      date_to: ''
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
        window.open(result.data.url)
        this.SUCCESS('Ваша заявка успешно отправлена!')
      } catch (e) {}
    },
    ...mapActions({
      SUCCESS: 'popup/SET_SUCCESS'
    })
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
