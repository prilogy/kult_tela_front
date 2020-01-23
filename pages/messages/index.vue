<template>
  <div :style="'--msg-max-width:' + maxWidth + 'px'" class="messages">
    <VPageHeading>Сообщения</VPageHeading>
    <div>
      <ul v-for="chat in CHATS" :key="chat.id" class="messages__contacts">
        <li class="messages__contacts__item">
          <nuxt-link :to="'/messages/' + chat.user_id">
            <div class="contact">
              <VAvatarSmall
                :mark="
                  chat.user_status ? { borderColor: 'var(--grey-base)' } : null
                "
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
                    {{ chat.messages[chat.messages.length - 1].text }}
                  </VP>
                  <div
                    v-if="showUnreadMessages(chat)"
                    class="contact__aside__bottom__mark"
                  >
                    <VCaption>
                      {{
                        chat.messages[chat.messages.length - 1].id -
                          chat.last_seen_message_id
                      }}
                    </VCaption>
                  </div>
                  <div
                    v-else-if="
                      chat.last_seen_message_id !==
                        chat.messages[chat.messages.length - 1].id
                    "
                  >
                    <svg
                      width="18"
                      height="14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 2L6 14 .5 8.5l1.41-1.41L6 11.17 16.59.59 18 2z"
                        :fill="
                          chat.last_seen_message_id !==
                          chat.messages[chat.messages.length - 1].id
                            ? 'var(--grey-light2)'
                            : 'var(--yellow-base)'
                        "
                      />
                    </svg>
                  </div>
                  <div
                    v-else-if="
                      chat.last_seen_message_id ===
                        chat.messages[chat.messages.length - 1].id &&
                        chat.messages[chat.messages.length - 1].user_id ===
                          $store.state.user.user.id
                    "
                  >
                    <svg
                      width="18"
                      height="14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 2L6 14 .5 8.5l1.41-1.41L6 11.17 16.59.59 18 2z"
                        fill="var(--yellow-base)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
          <VDivider class="contact__divider"></VDivider>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VDivider, VAvatarSmall } from '../../components/'

export default {
  components: { VAvatarSmall, VDivider },
  data() {
    return {
      maxWidth: null
    }
  },
  computed: {
    ...mapGetters({
      CHATS: 'chat/GET_CHATS'
    })
  },
  methods: {
    showUnreadMessages(chat) {
      return (
        chat.messages[chat.messages.length - 1].user_id !==
          this.$store.state.user.user.id &&
        chat.last_seen_message_id !== chat.messages[chat.messages.length - 1].id
      )
    }
  },
  mounted() {
    const cssMaxWidth = Number(
      getComputedStyle(document.body)
        .getPropertyValue('--body-max-width')
        .replace('px', '')
    )
    this.maxWidth =
      (document.body.clientWidth > cssMaxWidth
        ? cssMaxWidth
        : document.body.clientWidth) * 0.6
  },
  fetch({ store }) {
    if ([0, 1].includes(store.getters['chat/GET_CHATS'].length)) {
      store.dispatch('chat/FEED_CHATS')
    }
  }
}
</script>

<style scoped>
.messages {
}

.messages__title {
  margin-bottom: var(--space-half);
}

.messages__contacts__item {
  --avatar-size: 50px;
  margin-left: calc(-1 * var(--space-third));
}

.messages__contacts__item .contact {
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
  background: var(--grey-light2);
  padding: 4px 8px;
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

.messages__contacts__item .contact__divider {
  margin: var(--space-half) 0;
  margin-left: calc(var(--avatar-size) + 5px);
  margin-right: calc(-1 * (var(--space)));
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

.phantom-char {
  position: fixed;
  bottom: 0;
  right: 0;
  opacity: 0;
}
</style>
