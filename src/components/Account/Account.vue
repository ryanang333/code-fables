<template>
    <ModelRender :modelUrl = "modelUrl"></ModelRender>
    <ProfileInfo></ProfileInfo>
    <SkinSelect></SkinSelect>
</template>

<script>
import ProfileInfo from "./ProfileInfo.vue";
import SkinSelect from "./SkinSelect.vue";
import ModelRender from '../ModelRender/ModelRender.vue';

    export default {
        name: 'Account',
        components: {
            ProfileInfo,
            SkinSelect,
            ModelRender
        },
        data() {
            return {
                modelUrl : "/3DModels/knight.glb"
            }
        }
    }
</script>

<style>

</style>
