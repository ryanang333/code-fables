<template>
    <h1>Homepage</h1>
</template>

<script>
    import { getAuth } from 'firebase/auth';
    export default {
        name: 'Homepage',
        components: {

        },
        mounted(){
            console.log(getAuth().currentUser)
        }
    }
</script>

<style>

</style>