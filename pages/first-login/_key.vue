<template>
  <div>
    <VH2 mb="var(--space)">Первичная информация</VH2>
    <form id="form" autocomplete="off" @submit.prevent="sendForm">
      <VInput disabled caption="Ваш email" v-model="email"></VInput>
      <VInput required caption="Имя" v-model="first_name"></VInput>
      <VInput required caption="Фамилия" v-model="last_name"></VInput>
      <VInput required caption="Отчество" v-model="patronymic"></VInput>
      <VInput
        required
        type="number"
        caption="Текущий вес"
        v-model="weight"
      ></VInput>

      <VInput required type="text" caption="Пароль" v-model="password"></VInput>
      <VInput
        type="password"
        required
        autocomplete="false"
        readonly
        onfocus="this.removeAttribute('readonly');"
        caption="Повторите пароль"
        v-model="password_verify"
      ></VInput>
      <VP :color="passwordsValidate.color">{{ passwordsValidate.title }}</VP>
      <input
        required
        ref="avatarInput"
        style="display: none;"
        type="file"
        @change="handleFile"
      />
      <VButton mt="var(--space-half)" w100 @click="$refs.avatarInput.click()">{{
        !avatar ? 'Загрузить фото' : 'Загрузить другое фото'
      }}</VButton>
    </form>
    <VButton
      w100
      type="submit"
      form="form"
      weight="regular"
      mt="var(--space)"
      value="submit"
      :disabled="buttonDisabled"
    >
      Сохранить
    </VButton>
    <VP
      v-if="buttonDisabled"
      style="margin-top: var(--space-half) ;text-align: center; color: var(--red-base)"
      >Форма заполнена неправильно</VP
    >
  </div>
</template>

<script>
import { VInput } from '../../components/'
import VH3 from '../../components/typography/VH3'
import VH2 from '../../components/typography/VH2'
import VP from '../../components/typography/VP'
import VButton from '../../components/ui/VButton'
import VCaption from '../../components/typography/VCaption'

export default {
  layout: 'noNav',
  components: { VCaption, VButton, VP, VH2, VH3, VInput },
  data() {
    return {
      email: 'asds@sda.mdi',
      first_name: 'sds',
      last_name: 'sdsd',
      patronymic: 'sdsd',
      weight: '23',
      avatar: null,
      password: 'asd',
      password_verify: 'asd'
    }
  },
  methods: {
    sendForm() {},
    handleFile(e) {
      this.avatar = e.target.files[0] || e.dataTransfer.files[0] || null
    }
  },
  computed: {
    key() {
      return this.$route.params.key
    },
    buttonDisabled() {
      return (
        !this.first_name ||
        !this.last_name ||
        !this.patronymic ||
        !this.weight ||
        !this.password ||
        !this.password_verify ||
        this.password !== this.password_verify ||
        !this.avatar
      )
    },
    passwordsValidate() {
      if (this.password === '' && this.password_verify === '')
        return {
          title: '',
          color: 'transparent'
        }
      return this.password === this.password_verify
        ? {
            title: 'Пароли совпадают',
            color: 'var(--green-base)'
          }
        : {
            title: 'Пароли должны совпадать!',
            color: 'var(--red-base)'
          }
    }
  },
  created() {
    console.log(this.key)
  }
}
</script>

<style scoped>
form div {
  margin-bottom: var(--space-half);
}
</style>
