<template>
<div class="container">
    <div class="sliding-background"></div>
    <div class="overlay" :style="{ backgroundImage: `url(${imageUrl})` }">
</div>
</div>
</template>

  
  
<script>
export default {
    name: 'Game',
    components: {

    },
    props: {
        imageUrl: {
            type: String,
            default: ''
        }
    }
}
</script>
  
  
<style>
.container {
    overflow: hidden;
    position: relative;
}

.sliding-background {
    background: url(src/assets/images/forestbackground.png) repeat-x;
    height: 560px;
    width: 5076px;
    animation: slide 60s linear infinite;
    z-index: 1;
    transform: translate3d(0,0,0)
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 20%;
    height: 50%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left;
    opacity: 1;
    z-index: 2;
}
@media (min-width: 577px) and (max-width: 768px )
{
    .overlay{
        width: 100%;
        height: 50vh;
    }
}
@media (min-width:769px){
    .overlay{
        width:50%;
        height: 40vh;
    }
} 
@media(max-width:576px){
    .overlay{
        width: 50%;
        height: 40vh;
    }
}



    @keyframes slide {
    0% {
        transform: translate3d(0, 0, 0);
    }

    100% {
        transform: translate3d(-1692px, 0, 0);
    }
}
</style>
