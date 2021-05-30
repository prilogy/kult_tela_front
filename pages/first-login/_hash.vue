<template>
  <div>
    <div v-if="result.success === true">
      <div class="popup" v-if="popup">
        <VH3 weight="regular" mb="var(--space)">
          Регистрация прошла успешно, теперь вы можете войти в свой аккаунт
          через форму входа
        </VH3>
        <VButton w100 weight="regular" @click="$router.push('/login')">
          К форме входа
        </VButton>
      </div>
      <div v-if="!popup">
        <VPageHeading>
          Заполните данные
          <template v-slot:info>
            <VTipSmall>
              Для оптимального подбора меню и комплекса упражнений укажите
              данные достоверно!
            </VTipSmall>
          </template>
        </VPageHeading>
        <form id="form" autocomplete="off" @submit.prevent="sendForm">
          <VH3 mb="var(--space-half)">Ваш телефонный номер: {{ phone_number }}</VH3>
          <VInput
            maxlength="30"
            minlength="2"
            required
            caption="Фамилия"
            v-model="last_name"
          ></VInput>
          <VInput
            minlength="2"
            maxlength="30"
            required
            caption="Имя"
            v-model="first_name"
          ></VInput>
<!--          <VInput-->
<!--            maxlength="30"-->
<!--            minlength="2"-->
<!--            caption="Отчество(если есть)"-->
<!--            v-model="patronymic"-->
<!--          ></VInput>-->
          <VInput
            required
            step="0.01"
            type="number"
            max="270"
            min="40"
            caption="Текущий вес"
            v-model="weight_start"
          ></VInput>
          <VInput
            required
            step="0.01"
            type="number"
            min="50"
            max="250"
            caption="Рост(в см)"
            v-model="height"
          ></VInput>
<!--          <VInput-->
<!--            required-->
<!--            type="number"-->
<!--            max="100"-->
<!--            min="1"-->
<!--            caption="Возраст"-->
<!--            v-model="age"-->
<!--          ></VInput>-->
          <VInput
            required
            minlength="6"
            type="text"
            caption="Пароль"
            v-model="password"
          ></VInput>
          <VP
            mb="var(--space-half)"
            :color="passwordLength ? 'var(--green-base)' : 'var(--red-base)'"
          >
            Минимум 6 символов
          </VP>
          <VInput
            type="password"
            required
            autocomplete="false"
            readonly
            onfocus="this.removeAttribute('readonly');"
            caption="Повторите пароль"
            v-model="password_verify"
          ></VInput>
          <VP :color="passwordsValidate.color">
            {{ passwordsValidate.title }}
          </VP>
          <div>
            <VH3 weight="regular" mb="var(--space-half)" mt="var(--space-half)">
              Аватар
            </VH3>
            <VTipSmall mb="var(--space-half)" mt="var(--space-third)">
              <VP color="var(--grey-light3)">
                Фото желательно анфас и по грудь/пояс
              </VP>
            </VTipSmall>
            <VImageUpload
              w100
              class="report__list__input"
              @imageUploaded="avatarHandle"
            ></VImageUpload>
          </div>

          <VTipSmall mt="var(--space-half)" mb="0">
            <VP color="var(--grey-light3)">
              Вы сможете изменить фото в любой момент
            </VP>
          </VTipSmall>
        </form>
        <VDivider></VDivider>

        <VButton
          w100
          type="submit"
          form="form"
          weight="regular"
          mt="var(--space)"
          value="submit"
          :disabled="formValidate"
        >
          Сохранить и продолжить
        </VButton>
        <VP
          v-if="formValidate"
          style="margin-top: var(--space-half) ;text-align: center; color: var(--red-base)"
        >
          Форма заполнена неправильно
        </VP>
      </div>
    </div>
    <div
      class="popup"
      v-else-if="result.success === false && result.status === 'pending'"
    >
      <VP>
        Платеж не был завершен или находится в обработке.
        <br />
        Если вы не совершили платеж - нажмите кнопку ниже
      </VP>
      <VButton @click="openPayment" mt="var(--space-half)" w100>
        Оплатить
      </VButton>
      <VP mt="var(--space-half)" color="var(--grey-light2)">
        Если вы совершили платеж - обновите страницу
      </VP>
    </div>
    <div
      class="popup"
      v-else-if="result.success === false && result.status === 'canceled'"
    >
      <VP>
        Ваш платеж не был совершен или закончился неудачно.
        <br />
        Попробуйте снова
      </VP>
      <VButton @click="$router.push('/login')" w100 mt="var(--space-half)">
        К странице входа
      </VButton>
    </div>
  </div>
</template>

<script>
import { VInput, VTipSmall } from '../../components/'
import VDivider from '../../components/ui/VDivider'
import VImageUpload from '../../components/ui/VImageUpload'
import { mapActions } from 'vuex'

export default {
  layout: 'noNav',
  components: {
    VImageUpload,
    VDivider,
    VInput,
    VTipSmall
  },
  data() {
    return {
      hash: null,
      // email: '',
      phone_number: null,
      first_name: '',
      last_name: '',
      //patronymic: '',
      weight_start: null,
      avatar_src: null,
      password: '',
      password_verify: '',
      image_preview: null,
      popup: false,
      height: '',
      //age: '',
      names: [
        'hash',
        'first_name',
        'last_name',
        //'patronymic',
        'weight_start',
        'height',
        'avatar_src',
        //'age',
        'password'
      ],
      result: null
    }
  },
  methods: {
    openPayment() {
      if (this.result.url) window.open(this.result.url)
    },
    async sendForm() {
      if (!this.formValidate) {
        const form = new FormData()

        this.names.forEach(name => {
          form.append(name, this[name])
        })

        try {
          const result = await this.$api.Auth.fillInfo(form)
          if (result.success === true) await this.LOGIN({
            login: this.phone_number,
            password: this.password
          })
        } catch (error) {
          this.$router.push('/login')
        }
      }
    },
    avatarHandle(img) {
      this.avatar_src = img
    },
    ...mapActions({
      LOGIN: 'auth/LOGIN'
    })
  },
  computed: {
    formValidate() {
      return (
        !this.first_name ||
        !this.last_name ||
        !this.weight_start ||
        !this.password ||
        !this.password_verify ||
        this.password !== this.password_verify ||
        !this.avatar_src ||
        !this.passwordLength
      )
    },
    passwordLength() {
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
  async asyncData(ctx) {
    const hash = ctx.params.hash
    try {
      const { data: result } = await ctx.app.$api.Auth.isFillAllowed({ hash })
      if (result.success === true) return { phone_number: result.phone_number, hash, result }
      else return { result }
    } catch (error) {
      return ctx.redirect('/login')
    }
  }
}
</script>

<style scoped>
form {
  margin-top: var(--space-half);
  margin-bottom: var(--space);
}
form > div {
  margin-bottom: var(--space-half);
}

.popup {
  max-width: var(--body-max-width);
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

.popup p {
  text-align: center;
}
</style>
