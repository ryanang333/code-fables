<template>
    <div class="replit-iframe">
      <iframe :src="replitUrl" width="100%" height="500" frameborder="0"></iframe>
    </div>
</template>
  
  <script>
  export default {
    props: {
      replitUrl: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        hasError: false,
      };
    },
    methods: {
      onError() {
        // Handle iframe load errors
        this.hasError = true;
      },
    },
  };
  </script>
  
  <style scoped>
  .replit-iframe {
    position: relative;
    overflow: hidden;
    padding-top: 56.25%; 
  }
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  
  </style>
  
  


