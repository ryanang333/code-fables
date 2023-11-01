<template>
<div class="container">
    <div id="game-world"  :style="{ animationPlayState: isGamePaused ? 'paused' : 'running' }">
        <div v-for="(enemy, index) in enemies" :key="index" :style="{ backgroundImage: `url(${enemy.imageUrl})`, left: enemy.positionX, bottom: enemy.positionY }" :ref="`enemyElement-${index}`" class="enemy"></div>
    </div>
    <div class="player" ref="playerElement" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
</div>
</template>

<script>
export default {
    name: 'Game',
    components: {

    },
    data() {
        return {
            player: null,
            enemy: null,
            playerRect: null,
            checkedEnemies: [],
            
        }
    },
    props: {
        imageUrl: {
            type: String,
            default: ''
        },
        enemies: {
            type: Array,
            default: () => []
        },
        isGamePaused:{
            type: Boolean,
            default: false
        }
    },
    methods: {
        checkCollisions() {
            this.$nextTick(() =>{
            this.player = this.$refs.playerElement;
            if (this.player){
            this.playerRect = this.player.getBoundingClientRect();}
            this.enemies.forEach((enemy, index) => {
                if(!this.checkedEnemies.includes(enemy.imageUrl)){
                var enemyRef = this.$refs[`enemyElement-${index}`];
                if (Array.isArray(enemyRef)){
                    enemyRef = enemyRef[0]
                }
                if (enemyRef){
                var enemyRect = enemyRef.getBoundingClientRect();
                if (this.playerRect.x < enemyRect.x + enemyRect.width && this.playerRect.x + this.playerRect.width > enemyRect.x 
                && this.playerRect.y < enemyRect.y + enemyRect.height &&
                this.playerRect.y + this.playerRect.height > enemyRect.y){
                    this.checkedEnemies.push(enemy.imageUrl)
                    this.$emit("collisionDetected")
                }}
            }});
    })},
    },
    mounted(){
        this.interval = setInterval(() => {
            this.checkCollisions()
        }, 1000);
    },
    beforeDestroy(){
        clearInterval(this.interval)
    }
}
</script>

<style>
.container {
    overflow: hidden;
    position: relative;
}

#game-world {
    background: url(src/assets/images/forestbackground.png) repeat-x;
    height: 480px;
    width: 5076px;
    animation: slide 15s linear infinite;
    animation-fill-mode: forwards;
    animation-delay: 1s;
    z-index: 1;
    transform: translate3d(0, 0, 0)
}

.player {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 15vw;
    height: 20vh;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left;
    opacity: 1;
    z-index: 2;
}

.enemy {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 15vw;
    height: 20vh;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 2;
}


@media (min-width: 577px) and (max-width: 768px) {
    .player {
        width: 15vw;
        height: 20vh;
    }
}

@media (min-width:769px) {
    .player {
        width: 15vw;
        height: 20vh;
    }
}

@media(max-width:576px) {
    .player {
        width: 15vw;
        height: 20vh;
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
