<template>
  <div class="profile" v-if="USER">
    <div class="profile__top">
      <VAvatar
        class="profile__avatar"
        :rank="USER.rank"
        :image_src="USER.avatar_src"
      ></VAvatar>
      <div class="profile__top__info">
        <div>
          <VH3 class="profile__top__info__name" weight="regular">
            {{ USER.first_name + ' ' + USER.last_name }}
          </VH3>
          <div v-if="info">
            <div class="profile__top__info__item" v-for="item in info">
              <VP>{{ item.title }}</VP>
              <VP>{{ item.value }}</VP>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProfileActions v-if="USER.is_subscription"></ProfileActions>
    <ExtendSubscription v-else-if="!USER.is_subscription"></ExtendSubscription>
    <VBrowserPopup
      @close="closeBrowserPopup"
      v-if="browserPopup"
    ></VBrowserPopup>
    <VTutorPopup @clicked="tutorPopup = false" v-if="tutorPopup"></VTutorPopup>
    <VChatPopup @clicked="closeChatPopup" v-if="chatPopup"></VChatPopup>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { VAvatar } from '../components/'
  import { ExtendSubscription, ProfileActions } from '../components/pages/index/'
  import VBrowserPopup from '~/components/ui/VBrowserPopup'
  import VTutorPopup from '~/components/ui/VTutorPopup'
  import VChatPopup from '~/components/ui/VChatPopup'

  export default {
    data: () => ({
      browserPopup: false,
      tutorPopup: null,
      chatPopup: false
    }),
    components: { VChatPopup, VTutorPopup, VBrowserPopup, ProfileActions, VAvatar, ExtendSubscription },
    computed: {
      info() {
        const user = this.USER
        const weight_diff = Math.ceil(user.weight_diff * 10) / 10 || 0
        return [
          { title: 'Начальный вес', value: user.weight_start + ' кг' },
          {
            title: 'Текущий вес',
            value: `${Math.ceil((user.weight_start - user.weight_diff) * 10) /
            10}${weight_diff > 0 ? '(-' + weight_diff + ')' : ''} кг`
          },
          {
            title: 'Физ. уровень',
            value: user && user.workout && user.workout.phyiscal_level_name
          },
          { title: 'Служитe с', value: user.date_signup },
          {
            title: 'Войска',
            value: user.plan_id === 3 ? 'С наставником' : user.plan_name
          },
          {
            title: 'Служитe до',
            value: user.subscription_exp
          }
        ]
      },
      ...mapGetters({
        USER: 'user/GET_USER'
      })
    },
    created() {
      if(this.$route.query['reload'] === 'true') this.$router.push('/')
      if (!localStorage.getItem('browser_popup')) this.browserPopup = true
      if (!localStorage.getItem('chat_popup')) this.chatPopup = true

      if (
        this.$store.getters['user/GET_USER'].tutor_id === null &&
        this.$store.getters['user/GET_USER'].plan_id > 2
      )
        this.tutorPopup = true
    },
    methods: {
      closeBrowserPopup() {
        this.browserPopup = false
        localStorage.setItem('browser_popup', 'used')
      },
      closeChatPopup() {
        this.chatPopup = false
        localStorage.setItem('chat_popup', 'used')
      }
    }
  }
</script>

<style scoped>
  .profile__top {
    display: flex;
    margin-bottom: var(--space);
  }

  .profile__top__info {
    margin-left: var(--space);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .profile__top__info h2 {
    margin-bottom: var(--space-third);
  }

  .profile__avatar {
    border: solid 2px var(--yellow-base);
  }

  .profile__top__info__item {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.3;
  }

  .profile__top__info__name {
    margin-bottom: var(--space-half);
  }

  .profile__top__info__item > p:first-child {
    color: var(--grey-light3);
    margin-right: var(--space-half);
  }

  .profile__top__info__item > p:last-child {
    color: var(--yellow-base);
    margin-right: var(--space-half);
  }
</style>
