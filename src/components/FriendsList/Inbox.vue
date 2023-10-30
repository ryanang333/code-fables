<template>
  <div ref="talkjs" style="width: 90%; margin: 30px; height: 500px">
    <i>Loading chat...</i>
  </div>
</template>

<script>
import Talk from "talkjs";
import config from '/config';
export default {
  name: "Inbox",
  data() {
    return {
      friend: {},
    };
  },
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
    username: String,
    friendInfo: Object,
  },
  methods: {},
  async mounted() {
    await Talk.ready;
    console.log(this.friendInfo);
    const me = new Talk.User({
      id: this.currentUser.uid,
      name: this.currentUser.profile_name,
      photoUrl: this.currentUser.profile_pic_ID,
      welcomeMessage: "Hello!",
      //The welcomeMessage is the first message any other user will see when they start a chat with this user
      role: "booker",
    });
    const talkSession = new Talk.Session({
      appId: config.talkJSappID,
      me: me,
    });
    console.log(this.friendInfo);
    const other = new Talk.User({
      id: this.friendInfo.uid,
      name: this.friendInfo.profile_name,
      photoUrl: this.friendInfo.profile_pic_ID,
      welcomeMessage: "Hello!",
      role: "default",
    });
    const conversation = talkSession.getOrCreateConversation(
      Talk.oneOnOneId(me, other)
    );
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    // const inbox = talkSession.createInbox();
    // inbox.select(conversation);

    // inbox.mount(this.$refs.talkjs);
    const chatbox = talkSession.createChatbox();
    chatbox.select(conversation);
    chatbox.mount(this.$refs.talkjs);
  },
};
</script>
