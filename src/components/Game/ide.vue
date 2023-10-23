<template>
  <div class="header">Online IDE</div>
  <div class="control-panel">
    Select Language: 
    <br/>
    <select id="languages" class="languages">
      <option value="python"> Python </option>
    </select>
  </div>
  <div class="editor" id="editor"></div>
  <div class="button-container">
    <button class="btn" @click="executeCode">Run</button>
  </div>
  <div class="output"></div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ReplitEmbed",
  data() {
    return {
      hasError: false,
      editor: null, // Define the editor here
    };
  },
  methods: {
    executeCode() {
      const code = this.editor.getSession().getValue(); // Use "this" to access data properties
      const language = 'python'; // You can change this based on your language selection
      const url = '/backend/compiler.php';

      // Make an Axios POST request
      axios.post(url, {
        language: language,
        code: code,
      })
      .then(response => {
        // Process the response data object
        console.log('Server Response:', response.data);
      })
      .catch(error => {
        // Process the error object
        console.error('An error occurred:', error);
      });
    },
  },
  mounted() {
    ace.config.set('basePath', '/backend/');
    this.editor = ace.edit('editor'); // Assign the editor to "this.editor"
    this.editor.setTheme('ace/theme/monokai');
    this.editor.session.setMode('ace/mode/python');
  },
};
</script>


<style scoped>
  *{margin: 0;}

.header {
    background: #070707;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    color: white;
    padding: 4px;
    font-family: sans-serif;
}

.control-panel {
    background: lightgray;
    text-align: right;
    padding: 4px;
    font-family: sans-serif;
}

.languages {
    background: white;
    border: 1px solid gray;
}

#editor { height: 400px; }

.button-container {
    text-align: right;
    padding: 4px;
}

.btn {
    background: #57a958;
    color: white;
    padding: 8px;
    border: 0;
}

.output {
        padding: 4px;
        border: 2px solid gray;
        min-height: 100px;
        width: 99%;
        resize: none;

}
</style>
