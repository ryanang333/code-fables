<template>
    <ProfileInfo></ProfileInfo>
    <SkinSelect></SkinSelect>
</template>

<script>
import ProfileInfo from "./ProfileInfo.vue";
import SkinSelect from "./SkinSelect.vue";

    export default {
        name: 'Account',
        components: {
            ProfileInfo,
            SkinSelect
        }
    }
</script>

<style>

</style>
