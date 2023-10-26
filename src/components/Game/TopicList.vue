
<template>
    
    <div>
        <h2 class="text-center">Greetings Hero</h2>
    </div>

    <div class="row text-center">
        <div class="col-lg-4 col-md-6">
            <div class="card" style="background-image: url('/src/assets/images/image1.jpg');">
                <div class="card-body">
                    <h5 class="card-title game-font">Topic Name</h5>
                    <p class="card-text game-font">tLorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="text-success">Completed</p>
                    <p class="text-danger">Not Completed</p>
                    <a href="#" class="btn btn-game">Begin Game</a>
                </div>
            </div>
        </div> 

        <div class="col-lg-4 col-md-6">
            <div class="card" style="background-image: url('/src/assets/images/image2.jpg');">
                <div class="card-body">
                    <h5 class="card-title game-font">Topic Name</h5>
                    <p class="card-text game-font">tLorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="text-success">Completed</p>
                    <p class="text-danger">Not Completed</p>
                    <a href="#" class="btn btn-game">Begin Game</a>
                </div>
            </div>
        </div> 

        <div class="col-lg-4 col-md-6">
            <div class="card" style="background-image: url('/src/assets/images/image3.jpg');">
                <div class="card-body">
                    <h5 class="card-title game-font">Topic Name</h5>
                    <p class="card-text game-font">tLorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="text-success">Completed</p>
                    <p class="text-danger">Not Completed</p>
                    <a href="#" class="btn btn-game">Begin Game</a>
                </div>
            </div>
        </div> 

        <div class="col-lg-4 col-md-6">
            <div class="card" style="background-image: url('/src/assets/images/image4.jpg');">
                <div class="card-body">
                    <h5 class="card-title game-font">Topic Name</h5>
                    <p class="card-text game-font">tLorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="text-success">Completed</p>
                    <p class="text-danger">Not Completed</p>
                    <a href="#" class="btn btn-game">Begin Game</a>
                </div>
            </div>
        </div> 

        <div class="col-lg-4 col-md-6">
            <div class="card" style="background-image: url('/src/assets/images/image5.jpg');">
                <div class="card-body">
                    <h5 class="card-title game-font">Topic Name</h5>
                    <p class="card-text game-font">tLorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="text-success">Completed</p>
                    <p class="text-danger">Not Completed</p>
                    <a href="#" class="btn btn-game">Begin Game</a>
                </div>
            </div>
        </div> 

        <div class="col-lg-4 col-md-6">
            <div class="card" style="background-image: url('/src/assets/images/image6.jpg');">
                <div class="card-body">
                    <h5 class="card-title game-font">Topic Name</h5>
                    <p class="card-text game-font">tLorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="text-success">Completed</p>
                    <p class="text-danger">Not Completed</p>
                    <a href="#" class="btn btn-game">Begin Game</a>
                </div>
            </div>
        </div> 
        
    </div>
    
    
</template>



<script>

    /* export default{
        data(){
            return {
            topics: [],
            userObj:{},
            };
        }      
    } */  
</script> 


<style scoped>

    h2 {
        animation: glow 1s infinite alternate;
    }
    @keyframes glow {
        0% {
            text-shadow: 0 0 5px rgba(16, 69, 246, 0.5);
        }
        100% {
            text-shadow: 0 0 10px rgba(9, 22, 49, 0.7);
        }
    }
    .card {
        background-color: #000; 
        color: #fff; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border: none;
        border-radius: 10px;
        overflow: hidden; 
        position: relative; 
        margin: 3px;
        padding: 10px;
    }
    .card-body {
        padding: 1px;
    }
    .card-title {
        font-family: 'Press Start 2P', cursive; /* Gaming font */
        font-size: 1.8rem;
        margin-bottom: 10px;
    }
    .card:hover {
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    }
    .card-text {
        font-family: 'Press Start 2P', cursive; /* Gaming font */
        font-size: 1rem;
        margin-bottom: 15px;
    }
    .progress {
        height: 15px; /* Progress bar height */
        margin-bottom: 15px;
    }
    .text-success {
        color: #28a745;
        font-weight: bold;
    }
    .text-danger {
        color: #dc3545;
        font-weight: bold;
    }
    .btn-primary {
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
    }
    .btn-primary:hover {
        background-color: #0056b3;
    }
    .btn-game {
        background-color: #ff0000; /* Red button color */
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 8px 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .btn-game:hover {
        background-color: #ff4444; /* Darker red on hover */
    }
</style>