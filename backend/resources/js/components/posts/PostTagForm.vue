<template>
    <div class="form-group">
        <label for="tag">タグを追加する</label>
        <vue-simple-suggest
            v-model="selected"
            :list="List"
            :filter-by-query="true"
            >
            <input type="text" name="tag" id="tag" v-model="selected" placeholder="タグを入力してください" autocomplete="off">    
        </vue-simple-suggest>
        <p v-on:click="addTag">タグを追加する</p>
        <div class="tags" v-show="tagList">
            <ul>
                <li v-for="tag in tagList" :key="tag">
                    {{tag}}
                    <p v-on:click="deleteTag(tag)">削除</p>
                </li>
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
        };
    },
    methods: {
        addTag(){
            if(this.selected){
                if(!this.tagList.includes(this.selected)){
                    this.tagList.push(this.selected);
                    console.log(this.selected + 'を追加');
                    this.selected = '';
                    this.$emit('catchTag', this.tagList);
                }else{
                    this.selected = '';
                    console.log(this.selected + "は追加済み");
                }
            }
        },
        deleteTag(tag){
            var index = this.tagList.indexOf(tag);
            this.tagList.splice(index,1);
            console.log(tag +"タグを削除");
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