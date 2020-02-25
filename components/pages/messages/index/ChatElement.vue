<template>
  <div class="message-wrapper" :style="{ background: bgColor }">
    <AdminMark
      @bgColor="color => (bgColor = color)"
      class="admin-mark--all"
      :user="chat.user"
      v-if="chat && chat.user && typeof chat.user.admin_role_id === 'number'"
    ></AdminMark>
    <div class="contact">
      <VAvatarSmall
        :admin_role_id="chat.user.admin_role_id"
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
    <VDivider class="contact__divider"></VDivider>
  </div>
</template>

<script>
import { VAvatarSmall, VDivider } from '../../../'
import DoneIcon from '../DoneIcon'
import AdminMark from '../AdminMark'
import convertDate from '../../../../mixins/convertDate'

export default {
  mixins: [convertDate],
  props: {
    chat: {
      type: Object,
      required: true
    },
    dateToday: String
  },
  data() {
    return {
      bgColor: null
    }
  },
  components: { VDivider, AdminMark, VAvatarSmall, DoneIcon },
  methods: {
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
.message-wrapper {
  margin: 0 calc(-1 * var(--space));
  padding: 0 var(--space);
}
.contact__divider {
  margin: var(--space-half) 0;
  margin-left: calc(var(--avatar-size) + 5px);
  margin-right: calc(-1 * (var(--space)));
  margin-top: 0;
  margin-bottom: 0;
  border-color: var(--white-trans4) !important;
}
.admin-mark--all {
  padding-bottom: 0;
  padding-left: 0;
}
.contact {
  padding: var(--space-half) 0;
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
