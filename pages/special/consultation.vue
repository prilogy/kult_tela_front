<template>
  <div class="consultation">
    <VH2 class="consultation__title">Онлайн консультация</VH2>
    <VP class="consultation__description">
      Онлайн консультация ыы. Текст
      <br />
      Заполните форму ниже и оплатите участие, укажите удобный диапазон дат
      когда вам будет удобно
    </VP>
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
import { VH2, VButton, VInput, VP } from '../../components/'
export default {
  components: { VH2, VButton, VInput, VP },
  data() {
    return {
      tutor: '',
      date_from: '',
      date_to: ''
    }
  },
  methods: {
    proceedToPay() {
      this.SUCCESS('Ваша заявка успешно отправлена')
      this.$router.push('/')
    },
    ...mapActions({
      SUCCESS: 'popup/SET_SUCCESS'
    })
  }
}
</script>

<style scoped>
.consultation {
}
.consultation__title {
  margin-bottom: var(--space-half);
}
.consultation__description {
  margin-bottom: var(--space-half);
}

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
