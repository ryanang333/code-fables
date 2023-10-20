<template>
<div class="container">
        <!-- Display the topic -->
    <div class="topic mb-4">
        <h2 class="text-light">{{ selectedTopic.name }}</h2>
    </div>

    <!-- Display the currently selected question -->
    <div class="coding-question card bg-dark text-light p-4 mb-4">
        <h3 class="mb-3">Question {{ selectedQuestionIndex + 1 }}</h3>
        <div class="question">
            {{ selectedQuestion.questionText }}
        </div>

        <!-- Integrated Replit IDE -->
        <ReplitEmbed :replitUrl="replitUrl" />
    </div>
</div>
</template>


<script>

import ReplitEmbed from "./ide.vue";
import db  from "../../firebase/init";
import { getDocs, collection, query, where, getFirestore, doc,limit } from 'firebase/firestore';


export default {
    name: "ide",
    components: {
        ReplitEmbed
    },
    data() {
        return {
        selectedTopic: {
            name: 'Topic Name', // Initialize with the selected topic
        },
        selectedQuestion: 'topicId1', // Initialize with the first question
        selectedQuestionIndex: 0, // Index of the selected question
        replitUrl: 'https://replit.com/@muhdalmaliki141/Python',
        isLoading: false,
        selectedTopicId: 'topicId1',
        };
    },
    methods: {
        async fetchSelectedTopicData() {
            try {
                const topicsRef = collection(db, 'topics'); 
                const topicDoc = doc(topicsRef, selectedTopicId);
                const docSnapshot = await getDocs(topicDoc);

                if (docSnapshot.exists()) {
                this.selectedTopic = docSnapshot.data();
                } else {
                this.showErrorMessage('Selected topic does not exist.');
                }
            } catch (error) {
                console.error('Error fetching selected topic data:', error);
                this.showErrorMessage('An error occurred while fetching selected topic data.');
            }
        },

        async fetchInitialSelectedQuestion() {
            try {
                const questionsRef = collection(db, 'questions'); 
                const q = query(questionsRef, where('topicId', '==', 'selectedTopicId'), limit(1));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    this.selectedQuestion = doc.data();
                });
                } else {
                this.showErrorMessage('No questions found for the selected topic.');
                }
            } catch (error) {
                console.error('Error fetching selected question data:', error);
                this.showErrorMessage('An error occurred while fetching selected question data.');
            }
        },

        async checkCode() {
            this.isLoading = true;
            const userCode = this.$refs.replitIDE.getUserCode();
            const correctAnswer = this.selectedQuestion.correctAnswer;
            if (userCode.trim() === correctAnswer.trim()) {
                this.handleCorrectAnswer();
            } else {
                this.handleIncorrectAnswer();
            }
            this.isLoading = false;
            this.loadNextQuestion();
            },

        handleCorrectAnswer() {
        // Update the user's progress (e.g., increment a score)
        this.updateUserProgress();

        // Provide feedback to the user for a correct answer
        this.showSuccessMessage();
        // You can also implement additional logic specific to a correct answer
        },

        showSuccessMessage() {
        // You can use a library or a custom method to display a success message to the user.
        // For instance, you might use a notification library or Vue's built-in `alert`.
        alert('Congratulations! Your answer is correct.');
        }, 

        handleIncorrectAnswer() {
            this.showErrorMessage('Sorry, your answer is incorrect. Please try again.');
        },

        loadNextQuestion() {
            // You can handle topic selection and question retrieval from Firestore here
            // Increment the selectedQuestionIndex to load the next question
            // You can fetch the next question from Firestore based on your logic
            },
        showErrorMessage(message) {
            console.log(message);
        },
        },
        created() {
            this.fetchSelectedTopicData();
            this.fetchInitialSelectedQuestion();
        },


};
</script>



<style scoped>
/* Add CSS styles for your CodingQuestion component here */
    .topic {
    background-color: #343a40; /* Dark background color */
    padding: 10px;
    border-radius: 5px;
    }

    .coding-question {
    border: none;
    }

    .question {
    font-size: 18px;
    }

    .user-code-input {
    margin-top: 20px;
    }

    .text-light {
    color: #fff; /* White text color */
    }
</style>
