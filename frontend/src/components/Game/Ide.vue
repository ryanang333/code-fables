<template>
  <div class="bg-dark p-3 text-white rounded-1" v-if="isLesson">
    <h2>Lesson: {{ question[0] }}</h2>
    <br />
    <h6>{{ question[1] }}</h6>
    <br />
  </div>
  <div class="bg-dark p-3 text-white rounded-1" v-else>
    <h2>Task:</h2>
    <br />
    <h5>{{ question }}</h5>
    <br />
  </div>
  <div class="row">
    <div class="editor col-6" id="editor"></div>
    <div class="col-6">
      <div class="mt-1 output bg-dark text-white rounded-4 p-3">
        {{ output }}
      </div>
    </div>
  </div>
  <div class="button-container mt-3">
    <button type="button" class="btn btn-success w-100" @click="executeCode">
      Run
    </button>
  </div>
</template>
<script>
import axios from "axios";
import { getAuth } from "firebase/auth";
import db from "../../firebase/init";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
export default {
  name: "Ide",
  props: {
    questionInfo: Object,
  },
  data() {
    return {
      hasError: false,
      editor: null, // Define the editor here
      username: "",
      output: "",
      question: [],
      isLesson: false,
      currentQn: "",
      UID: "",
    };
  },
  emits: ["resultOK", "resultWrong"],
  methods: {
    getCode() {
      if (Array.isArray(this.questionInfo.question)) {
        this.isLesson = true;
      }
      this.question = this.questionInfo.question;
      let startingCode = this.questionInfo.starting_code;
      let codeLines = startingCode.split("##newline##");
      let codeWithLineBreaks = codeLines.join("\n");
      this.editor.setValue(codeWithLineBreaks, -1);
      this.editor.getSession().setUseSoftTabs(true);
    },
    async executeCode() {
      const userCode = this.editor.getSession().getValue(); // Use "this" to access data properties

      const url = "http://3.27.193.241/compiler.php";
      // const url = "/backend/compiler.php";

      // Make an Axios GET request
      const param = {
        language: "python",
        code: userCode,
        name: this.username,
        qn: this.currentQn,
      };
      axios
        .get(url, {
          params: param,
        })
        .then((response) => {
          // Process the response data object
          console.log("Server Response:", response.data);
          this.output = response.data.output;
          if (response.data.output.includes('.txt",')) {
            this.output = response.data.output.split('.txt",')[1];
          } else {
            this.output = response.data.output;
          }
          let correctOutput = this.questionInfo["test_case"];
          var x = this.output.replace(/\n/g, "");
          if (x == correctOutput) {
            this.$emit("resultOK");
          } else {
            this.$emit("resultWrong");
          }
        })
        .catch((error) => {
          // Process the error object
          console.error("An error occurred:", error);
        });
    },
  },
  async mounted() {
    const ace = await import("ace-builds/src-noconflict/ace.js");
    const modePython = await import("ace-builds/src-noconflict/mode-python.js");
    const themeMonokai = await import(
      "ace-builds/src-noconflict/theme-monokai.js"
    );
    this.UID = getAuth().currentUser.uid;
    this.currentQn = localStorage.getItem("currentQn");
    this.username = getAuth().currentUser.email.split(".com")[0];
    // ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict');
    // ace.config.set('basePath', '/node_modules/ace/build/lib')
    this.editor = ace.edit("editor"); // Assign the editor to "this.editor"
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/python");
    this.getCode();
    this.currentTopic = localStorage.getItem("currentTopic");
  },
};
</script>

<style scoped>
* {
  margin: 0;
}

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

#editor {
  height: 200px;
  width: 50%;
}

.output {
  border: 2px solid gray;
  height: 200px;
  width: 100%;
  resize: none;
  white-space: pre-line;
}
</style>
