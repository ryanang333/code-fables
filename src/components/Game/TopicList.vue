<template>
    <div>
        <h2>User Dashboard</h2>
        <ul>
        <li v-for="topic in topics" :key="topic.id">
            <span>{{ topic.name }}</span>
            <span v-if="topic.isCompleted">✔</span>
            <button @click="selectTopic(topic)" :disabled="!topic.isUnlocked">Start</button>
        </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
        return {
            topics: [], // An array of topic objects
            userProgress: {}, // User's progress data
        };
        },
        methods: {
        selectTopic(topic) {
            if (topic.isUnlocked) {
            // Redirect to the QuestionPage for the selected topic
            this.$router.push(`/question/${topic.id}`);
            } else {
            alert('Topic is locked. Complete previous topics first.');
            }
        },
        },
        computed: {
        // Compute unlocked and completed topics based on user progress
        unlockedTopics() {
            return this.topics.filter(topic => topic.isUnlocked);
        },
        completedTopics() {
            return this.topics.filter(topic => topic.isCompleted);
        },
        },
        watch: {
        // Watch for changes in user progress and update topics' unlock status
        userProgress: {
            deep: true,
            handler(newProgress) {
            this.topics.forEach(topic => {
                topic.isUnlocked = this.isTopicUnlocked(topic, newProgress);
                topic.isCompleted = this.isTopicCompleted(topic, newProgress);
            });
            },
        },
        },
        created() {
        // Fetch topics and user progress from your database
        this.topics = this.fetchTopics();
        this.userProgress = this.fetchUserProgress();
        },
        methods: {
        fetchTopics() {
            // Fetch topics from your database
            // Mock data for demonstration:
            return [
            { id: 1, name: 'Topic 1', isUnlocked: true, isCompleted: true },
            { id: 2, name: 'Topic 2', isUnlocked: false, isCompleted: false },
            { id: 3, name: 'Topic 3', isUnlocked: false, isCompleted: false },
            { id: 4, name: 'Topic 4', isUnlocked: false, isCompleted: false },
            { id: 5, name: 'Topic 5', isUnlocked: false, isCompleted: false },
            { id: 6, name: 'Topic 6', isUnlocked: false, isCompleted: false },
            ];
        },
        fetchUserProgress() {
            // Fetch user progress data from your database
            // Mock data for demonstration:
            return {
            topic1: { completed: false },
            topic2: { completed: false },
            // Add more topics...
            };
        },
        isTopicUnlocked(topic, progress) {
            // Implement the logic to determine if a topic is unlocked
            // (e.g., check if the previous topic is completed)
            if (topic.id === 1) {
            return true; // The first topic is always unlocked
            }
            const previousTopicId = topic.id - 1;
            return progress[`topic${previousTopicId}`].completed;
        },
        isTopicCompleted(topic, progress) {
            // Implement the logic to determine if a topic is completed
            return progress[`topic${topic.id}`].completed;
        },
        },
    };
</script>
