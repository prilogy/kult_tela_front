<template>
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
          {{ chat.messages[chat.messages.length - 1].date }}
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
          <DoneIcon fill="var(--yellow-base)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VAvatarSmall } from '../../../'
import DoneIcon from '../DoneIcon'

// inline component with JSX

export default {
  props: {
    chat: {
      type: Object,
      required: true
    }
  },
  components: { VAvatarSmall, DoneIcon },
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
  background: var(--yellow-dark1);
  width: 12px;
  height: 12px;
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
