<template>
  <div class="messages">
    <VPageHeading>Сообщения</VPageHeading>
    <div>
      <ul v-for="chat in CHATS" :key="chat.id" class="messages__contacts">
        <li class="messages__contacts__item">
          <div class="contact">
            <VAvatarSmall class="contact__avatar" :src="chat.user.avatar_src" />
            <div class="contact__aside">
              <div class="contact__aside__top">
                <VP class="contact__aside__top__name">{{ chat.user.name }}</VP>
                <VP class="contact__aside__top__time">
                  {{ chat.last_message.date }}
                </VP>
              </div>
              <div class="contact__aside__bottom">
                <VP class="contact__aside__bottom__text">
                  {{ chat.last_message.text }}
                </VP>
                <div
                  v-if="chat.messages_unread !== 0"
                  class="contact__aside__bottom__mark"
                >
                  <VCaption>{{ chat.messages_unread }}</VCaption>
                </div>
              </div>
            </div>
          </div>
          <VDivider class="contact__divider"></VDivider>
        </li>
      </ul>
    </div>
    <VButton @click="">
      emit event
    </VButton>
    <div>
      <VP ref="phantomChar" class="phantom-char">S</VP>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VDivider, VAvatarSmall } from '../../components/'
export default {
  components: { VAvatarSmall, VDivider },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      CHATS: 'chat/GET_CHATS'
    })
  },
  methods: {},
  fetch({ store }) {
    store.dispatch('chat/FEED_CHATS')
  },
  created() {},
  mounted() {
    this.$store.dispatch('chat/eventA')
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
  background: var(--yellow-trans1);
  padding: 4px 8px;
}

.contact__aside__bottom__mark p {
  color: var(--grey-base);
  font-weight: 500;
}

.contact__aside__bottom__text {
  color: var(--white-trans1);
  text-overflow: ellipsis;
  /*
  white-space: nowrap;
  overflow: hidden;
  width: 416px;*/
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
