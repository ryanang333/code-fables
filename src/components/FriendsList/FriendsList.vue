<template>
<FriendListTab @tab-updated="updateTab"/>
<Friends v-if="isFriend"/>
<Requests v-else/>
</template>

<script>
    import FriendListTab from "./FriendListTab.vue";
    import Friends from './Friends.vue';
    import Requests from './Requests.vue';
    export default {
        name: "FriendsList",
        components: {
            FriendListTab,
            Friends,
            Requests
        },
        data() {
            return {
                isFriend: true
            }
        },
        methods: {
            updateTab(update){
                this.isFriend = update;
            }
        }
    };
</script>

<style scoped></style>
