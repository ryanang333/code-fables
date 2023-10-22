<template>
<div class="container">
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

        <button @click="loadNextQuestion">Next</button>
    </div>
</div>
</template>


<script>

import ReplitEmbed from "./ide.vue";
import db  from "../../firebase/init";
import { getDocs, getDoc, collection, query, where, getFirestore, doc,limit } from 'firebase/firestore';


export default {
    name: "Codingquestion",
    components: {
        ReplitEmbed
    },
    data() {
        return {
        selectedTopic: '',
        selectedQuestion: 'topicId1', // Initialize with the first question
        selectedQuestionIndex: 0, // Index of the selected question
        replitUrl: 'https://replit.com/@muhdalmaliki141/Python?embed=true',
        isLoading: false,
        selectedTopicId: 'topicId1',
        };
    },
    methods: {
        async fetchSelectedTopicData() {
            // try {
            //     const topicsRef = collection(db, 'topics');
            //     const topicDoc = doc(topicsRef, this.selectedTopicId); 
            //     const docSnapshot = await getDocs(topicDoc);

            //     if (docSnapshot.exists()) {
            //         this.selectedTopic = docSnapshot.data();
            //     } else {
            //         this.showErrorMessage('Selected topic does not exist.');
            //     }
            // } catch (error) {
            //     console.error('Error fetching selected topic data:', error);
            //     this.showErrorMessage('An error occurred while fetching selected topic data.');
            // }
            const docSnap = await getDoc(doc(db, 'topics', this.selectedTopicId));
            this.selectedTopic = docSnap.data().name;
            console.log(this.selectedTopic);
        },


        async fetchInitialSelectedQuestion() {
            try {
                const questionsRef = collection(db, 'questions'); 
                const q = query(questionsRef, where('topicId', '==', this.selectedTopicId), limit(1));
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
        this.showSuccessMessage();
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
            this.selectedQuestionIndex++;
            this.fetchNextQuestion();
            },
        async fetchNextQuestion() {
            try {
                const questionsRef = collection(db, 'questions');
                // Query for the next question based on the topic and the updated index
                const q = query(
                    questionsRef,
                    where('topicId', '==', this.selectedTopicId),
                    limit(1), // You can add an offset here based on the selectedQuestionIndex
                    offset(this.selectedQuestionIndex)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        this.selectedQuestion = doc.data();
                    });
                } else {
                    this.showErrorMessage('No more questions found for the selected topic.');
                }
            } catch (error) {
                console.error('Error fetching the next question:', error);
                this.showErrorMessage('An error occurred while fetching the next question.');
            }
        },
        showErrorMessage(message) {
            console.log(message);
        },
        },
        mounted() {
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
