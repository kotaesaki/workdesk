<template>
    <div class="form-group">
        <label for="tag">タグを追加する</label>
        <vue-simple-suggest
            v-model="selected"
            :list="List"
            :filter-by-query="true"
            >
            <input type="text" name="tag" id="tag" v-model="aim" placeholder="タグを入力してください" autocomplete="off">    
        </vue-simple-suggest>
        <button v-on:click="addTag">タグを追加する</button>
        <div class="tags" v-show="tagList">
            <ul>
                <li v-for="tag in tagList" :key="tag">{{tag}}</li>
            </ul>
        </div>
    </div>
  
</template>
<script>
import VueSimpleSuggest from "vue-simple-suggest";
import 'vue-simple-suggest/dist/styles.css';

export default {
    components: {
        VueSimpleSuggest
    },
    data() {
        return {
            selected: '',
            List:'',
            tagList:[],
            aim:'',
        };
    },
    methods: {
        addTag(){
            if(this.selected){
                if(!this.tagList.includes(this.selected)){
                    this.tagList.push(this.selected);
                    console.log(this.selected + 'を追加');
                    this.selected = '';
                    this.aim='';
                }else{
                    this.selected = '';
                    this.aim='';
                    console.log(this.selected + "は追加済み");
                }
            }

        }
    },
    created(){
        axios.get('/api/tagList')
        .then(res => this.List = res.data )
        .catch((error)=>{
            this.errorMsg = 'Error! Could not reach the API. ' + error
            console.log(this.errorMsg)
        })        
    }

}
</script>
<style scoped>

</style>