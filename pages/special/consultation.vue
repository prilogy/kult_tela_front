<template>
  <div class="consultation">
    <VPageHeading>
      Онлайн консультация
      <template v-slot:info>
        Заполните форму ниже и оплатите участие, укажите дату, когда у вас будет
        свободное время. Беседа проходит в онлайн формате (видео).
        <br />
        Это просто. Мы всё объясним. Длительность - 1 час.
      </template>
    </VPageHeading>

    <div v-if="info" class="consultation__price">
      <VH3 v-if="info.price.price > 0" style="width: 100%;">
        Стоимость консультации - {{ info.price.price }}&#8381;/час
      </VH3>
      <div v-else-if="info.price.price === 0">
        <VH3>
          У вас {{ info.price.free_times_left }} бесплатных консультации
        </VH3>
      </div>
    </div>
    <VDivider mt="var(--space-half)" mb="var(--space-half)"></VDivider>

    <form v-if="info" id="consultation__form" @submit.prevent="proceedToPay">
      <VH3 mb="var(--space-half)">Выберите консультанта</VH3>
      <div
        :class="{
          tutor: true,
          'tutor--selected': tutor && tutor.id === item.id
        }"
        v-for="item in info.tutors"
      >
        <img class="tutor__avatar" alt="Аватар" :src="item.img_src" />
        <div class="tutor__info">
          <div>
            <VH3 class="tutor__info__name">{{ item.name }}</VH3>
            <VP class="tutor__info__desc">{{ item.description }}</VP>
          </div>
          <VButton
            :class="{ 'tutor__btn--selected': tutor && item.id === tutor.id }"
            form="none"
            value="none"
            w100
            @click="tutor = item"
          >
            {{ tutor && item.id === tutor.id ? 'Выбрано' : 'Выбрать' }}
          </VButton>
        </div>
      </div>
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

      <VButton
        w100
        type="submit"
        form="consultation__form"
        value="submit"
        :disabled="!validateForm"
      >
        Записаться
      </VButton>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { VInput } from '../../components/'
import VDivider from '../../components/ui/VDivider'
export default {
  middleware: 'requireSub',
  components: { VDivider, VInput },
  data() {
    return {
      tutor: null,
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
        tutor: this.tutor.name,
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
.consultation__price {
  display: flex;
  align-items: center;
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

.tutor {
  padding: var(--space-half);
  border-radius: var(--radius);
  border: solid 2px var(--yellow-trans4);
  cursor: pointer;
  background: var(--yellow-trans4);
  margin-bottom: var(--space-half);
  display: flex;
}

.tutor--selected {
  border-color: var(--yellow-base);
}

.tutor__info__desc {
  white-space: pre-line;
  margin: var(--space-third) 0;
  font-weight: 300;
}

.tutor__btn--selected {
  background: none;
  border: none;
}

.tutor__btn--selected:active,
.tutor__btn--selected:hover,
.tutor__btn--selected:focus {
  box-shadow: none !important;
}

.tutor__btn--selected >>> h3 {
  color: var(--white-base) !important;
}

.tutor__info {
  width: 100%;
  margin-left: var(--space-half);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tutor__avatar {
  max-width: 30%;
  border: 2px solid var(--yellow-base);
  border-radius: 4px;
}

#consultation__form {
}
#consultation__form > div {
  margin-bottom: var(--space-half);
}
</style>
