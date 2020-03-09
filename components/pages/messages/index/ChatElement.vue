<template>
  <nuxt-link :to="link">
    <div
      v-if="chat && user"
      class="message-wrapper"
      :style="{ background: bgColor }"
    >
      <!-- TODO: REFACTOR! -->
      <AdminMark
        @bgColor="color => (bgColor = color)"
        class="admin-mark--all"
        :user="user"
        v-if="chatf.adminMark"
      ></AdminMark>
      <div class="contact">
        <VAvatarSmall
          :admin_role_id="chatf.avatar.admin_role_id"
          :mark="user.status ? { borderColor: 'var(--grey-base)' } : null"
          class="contact__avatar"
          :src="chatf.avatar.src"
        />
        <div class="contact__aside">
          <div class="contact__aside__top">
            <VP class="contact__aside__top__name">
              {{ chatf.name }}
            </VP>
            <VP class="contact__aside__top__time">
              {{ chatf.date }}
            </VP>
          </div>
          <div class="contact__aside__bottom">
            <VP class="contact__aside__bottom__text">
              {{ chatf.lastMessageText }}
            </VP>
            <span
              v-if="chatf.showUnreadMessages"
              class="contact__aside__bottom__mark"
            ></span>
            <div
              v-else-if="
                chatf.lastMessage &&
                  chat.last_seen_message_id !== chatf.lastMessage.id
              "
            >
              <DoneIcon
                :fill="
                  chatf.lastMessage &&
                  chat.last_seen_message_id !== chatf.lastMessage.id
                    ? 'var(--grey-light2)'
                    : 'var(--yellow-base)'
                "
              />
            </div>

            <div
              v-else-if="
                chatf.lastMessage &&
                  chat.last_seen_message_id === chatf.lastMessage.id &&
                  chatf.lastMessage.user_id === chatf.currentUserId
              "
            >
              <DoneIcon double fill="var(--yellow-base)" />
            </div>
          </div>
        </div>
      </div>
      <VDivider class="contact__divider"></VDivider>
    </div>
  </nuxt-link>
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
  computed: {
    link() {
      if (this.chat.conversation) return '/messages/c' + this.chat.id
      else {
        return '/messages/' + this.user.id
      }
    },
    chatf() {
      const chat = this.chat
      const user =
        chat &&
        chat.users.filter(
          e => e.id !== this.$store.getters['user/GET_USER'].id
        )[0]

      const currentUserId = this.$store.getters['user/GET_USER'].id

      const lastMessage =
        chat.messages && chat.messages.length > 0
          ? chat.messages[chat.messages.length - 1]
          : null

      const adminMark =
        user && typeof user.admin_role_id === 'number' ? true : null

      return {
        adminMark,
        avatar: {
          admin_role_id:
            !chat.conversation &&
            typeof user.admin_role_id === 'number' &&
            user.admin_role_id,
          src: chat.conversation ? null : user.avatar_src
        },
        name: chat.name || user.name,
        date: lastMessage ? this.getDate(lastMessage.date) : null,
        lastMessageText:
          (lastMessage &&
            (lastMessage.user_id === currentUserId ? 'Вы: ' : '') +
              lastMessage.text) ||
          'Нет сообщений',
        lastMessage,
        currentUserId,
        showUnreadMessages:
          (user &&
            lastMessage &&
            lastMessage.user_id !== currentUserId &&
            chat.last_seen_message_id !== lastMessage.id) ||
          null
      }
    },
    user() {
      return this.chat.users.filter(
        e => e.id !== this.$store.getters['user/GET_USER'].id
      )[0]
    }
  },
  components: { VDivider, AdminMark, VAvatarSmall, DoneIcon }
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
