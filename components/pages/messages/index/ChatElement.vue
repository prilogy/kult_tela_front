<template>
  <div>
    <AdminMark
      class="admin-mark--all"
      :user="chat.user"
      v-if="chat && chat.user && typeof chat.user.admin_role_id === 'number'"
    ></AdminMark>
    <div class="contact">
      <VAvatarSmall
        :mark="chat.user_status ? { borderColor: 'var(--grey-base)' } : null"
        class="contact__avatar"
        :src="chat.user.avatar_src"
      />
      <div class="contact__aside">
        <div class="contact__aside__top">
          <VP class="contact__aside__top__name">
            {{ chat.user.name }}
          </VP>
          <VP class="contact__aside__top__time">
            {{ getDate(chat.messages[chat.messages.length - 1].date) }}
          </VP>
        </div>
        <div class="contact__aside__bottom">
          <VP class="contact__aside__bottom__text">
            {{
              (chat.messages[chat.messages.length - 1].user_id ===
              $store.state.user.user.id
                ? 'Вы: '
                : '') + chat.messages[chat.messages.length - 1].text
            }}
          </VP>
          <span
            v-if="showUnreadMessages(chat)"
            class="contact__aside__bottom__mark"
          ></span>
          <div
            v-else-if="
              chat.last_seen_message_id !==
                chat.messages[chat.messages.length - 1].id
            "
          >
            <DoneIcon
              :fill="
                chat.last_seen_message_id !==
                chat.messages[chat.messages.length - 1].id
                  ? 'var(--grey-light2)'
                  : 'var(--yellow-base)'
              "
            />
          </div>

          <div
            v-else-if="
              chat.last_seen_message_id ===
                chat.messages[chat.messages.length - 1].id &&
                chat.messages[chat.messages.length - 1].user_id ===
                  $store.state.user.user.id
            "
          >
            <DoneIcon double fill="var(--yellow-base)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VAvatarSmall } from '../../../'
import DoneIcon from '../DoneIcon'
import AdminMark from '../AdminMark'

export default {
  props: {
    chat: {
      type: Object,
      required: true
    },
    dateToday: String
  },
  components: { AdminMark, VAvatarSmall, DoneIcon },
  methods: {
    getDate(date) {
      const dt = date.split('.')
      const tdt = this.dateToday.split('.')
      console.log(tdt)
      if (dt[0] === tdt[0] && dt[1] === tdt[1] && dt[2] === tdt[2])
        return 'Сегодня'
      else if (
        parseInt(tdt[0]) - 1 === parseInt(dt[0]) &&
        dt[1] === tdt[1] &&
        dt[2] === tdt[2]
      )
        return 'Вчера'
      else if (
        parseInt(tdt[0]) - 2 === parseInt(dt[0]) &&
        dt[1] === tdt[1] &&
        dt[2] === tdt[2]
      )
        return 'Позавчера'
      else if (
        parseInt(tdt[0]) - 3 === parseInt(dt[0]) &&
        dt[1] === tdt[1] &&
        dt[2] === tdt[2]
      )
        return '3 дня назад'
      else if (
        parseInt(tdt[0]) - 4 === parseInt(dt[0]) &&
        dt[1] === tdt[1] &&
        dt[2] === tdt[2]
      )
        return '4 дня назад'
      else return date
    },
    showUnreadMessages(chat) {
      return (
        chat.messages[chat.messages.length - 1].user_id !==
          this.$store.state.user.user.id &&
        chat.last_seen_message_id !== chat.messages[chat.messages.length - 1].id
      )
    }
  }
}
</script>

<style scoped>
.admin-mark--all {
  margin-bottom: var(--space-third);
  margin-left: 25px;
  border-radius: var(--radius) var(--radius) var(--radius) 0;
}
.contact {
  display: flex;
  align-items: center;
  width: 100%;
}

.contact .contact__avatar {
  margin-right: var(--space-half);
}

.contact__aside {
  width: 100%;
}

.contact__aside__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.contact__aside__bottom__mark {
  border-radius: 100px;
  background: var(--yellow-trans1);
  width: 14px;
  height: 14px;
}

.contact__aside__bottom__mark p {
  color: var(--grey-base);
  font-weight: 500;
}

.messages .contact__aside__bottom__text {
  color: var(--white-trans1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: var(--msg-max-width);
}

.contact__aside__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}
.contact__aside__top__time {
  font-weight: 300;
  color: var(--white-trans1);
}
</style>
