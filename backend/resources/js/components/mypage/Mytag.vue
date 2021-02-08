<template>
    <div class="col-md-8">
        <ul v-for="(name,key) in mytag" :key="name">
            <li>
                <p class="tag">{{key}} {{name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        userId: String
    },
    computed: {
        mytag(){
            return this.$store.getters["mytag/mytag"];
        }
    },
    mounted() {
        this.$store.dispatch('mytag/getMytag', this.userId);
    },
};
</script>