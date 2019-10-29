<template>
  <div>
    <div class="popup" v-if="popup">
      <VH3 weight="regular" mb="var(--space)"
        >Регистрация прошла успешно, теперь вы можете войти в свой аккаунт через
        форму входа</VH3
      >
      <VButton w100 weight="regular" @click="redirectToLogin"
        >К форме входа</VButton
      >
    </div>
    <div v-if="!popup">
      <VH2 mb="var(--space-third)">Заполните данные</VH2>
      <form id="form" autocomplete="off" @submit.prevent="sendForm">
        <VH3 mb="var(--space)">Ваш email: {{ email }}</VH3>
        <VInput required caption="Имя" v-model="first_name"></VInput>
        <VInput required caption="Фамилия" v-model="last_name"></VInput>
        <VInput required caption="Отчество" v-model="patronymic"></VInput>
        <VInput
          required
          type="number"
          caption="Текущий вес"
          v-model="weight_start"
        ></VInput>

        <VInput
          required
          minlength="6"
          type="text"
          caption="Пароль"
          v-model="password"
        ></VInput>
        <VP
          mb="var(--space-half)"
          :color="passwordLenght ? 'var(--green-base)' : 'var(--red-base)'"
          >Минимум 6 символов</VP
        >
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
          accept="image/*"
          required
          ref="avatarInput"
          style="display: none;"
          type="file"
          @change="handleFile"
        />
        <img
          class="image_preview"
          v-if="image_preview"
          alt="Image preview"
          :src="image_preview"
        />
        <VButton
          mt="var(--space-half)"
          w100
          @click="$refs.avatarInput.click()"
          >{{
            !avatar_src ? 'Загрузить фото' : 'Загрузить другое фото'
          }}</VButton
        >
      </form>
      <VButton
        w100
        type="submit"
        form="form"
        weight="regular"
        mt="var(--space)"
        value="submit"
        :disabled="formValidate"
      >
        Сохранить
      </VButton>
      <VP
        v-if="formValidate"
        style="margin-top: var(--space-half) ;text-align: center; color: var(--red-base)"
        >Форма заполнена неправильно</VP
      >
    </div>
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
      email: '',
      first_name: '',
      last_name: '',
      patronymic: '',
      weight_start: null,
      avatar_src: null,
      password: '',
      password_verify: '',
      image_preview: null,
      popup: false
    }
  },
  methods: {
    async sendForm() {
      if (!this.formValidate) {
        const form = new FormData()
        form.append('hash', this.$route.params.hash)
        form.append('first_name', this.first_name)
        form.append('last_name', this.last_name)
        form.append('patronymic', this.patronymic)
        form.append('weight_start', this.weight_start)
        form.append('password', this.password)
        form.append('avatar_src', this.avatar_src)

        try {
          const result = await this.$api.Auth.fillInfo(form)
          if (result.success === true) {
            this.popup = true
          }
        } catch (error) {
          this.redirectToLogin()
        }
      }
    },
    redirectToLogin() {
      this.$router.push('/login')
    },
    handleFile(e) {
      this.avatar_src = e.target.files[0]
      this.createImage(e.target.files[0])
    },
    createImage(file) {
      let image = new Image()
      const reader = new FileReader()
      let vm = this

      reader.onload = e => {
        vm.image_preview = e.target.result
      }
      reader.readAsDataURL(file)
    }
  },
  computed: {
    formValidate() {
      return (
        !this.first_name ||
        !this.last_name ||
        !this.patronymic ||
        !this.weight_start ||
        !this.password ||
        !this.password_verify ||
        this.password !== this.password_verify ||
        !this.avatar_src ||
        !this.passwordLenght
      )
    },
    passwordLenght() {
      return this.password.length >= 6
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
  async created() {
    const hash = this.$route.params.hash
    try {
      const result = await this.$api.Auth.isFillAllowed({ hash })
      this.email = result.data.email
    } catch (error) {
      this.redirectToLogin()
    }
  }
}
</script>

<style scoped>
form div {
  margin-bottom: var(--space-half);
}
.image_preview {
  margin-top: var(--space);
  width: 100%;
}
.popup {
  background: var(--grey-base);
  position: fixed;
  padding: var(--space);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: fit-content;
  margin: auto;
}
</style>
