<template>
  <div class="Upload">
    <div class="form-group">
      <div class="contents">
        <div class="explain">
          <p class="title">
            タグを追加する
          </p>
          <p class="required">
            ※必須
          </p>
        </div>
        <div class="uploadTag items">
          <vue-simple-suggest
            v-model="selected"
            class="formTag"
            :list="List"
            :filter-by-query="true">
            <input
              id="tag"
              v-model="selected"
              type="text"
              name="tag"
              placeholder="タグを入力してください"
              autocomplete="off">    
          </vue-simple-suggest>
          <div
            class="addTagBtn"
            @click="addTag">
            <i class="fas fa-plus" />タグを追加する
          </div>
          <div
            v-show="tagList"
            class="tags">
            <ul>
              <li
                v-for="tag in tagList"
                :key="tag">
                <i
                  class="fas fa-times-circle batsuBtn"
                  @click="deleteTag(tag)" />
                <p>{{ tag }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css'

export default {
  components: {
    VueSimpleSuggest
  },
  data() {
    return {
      selected: '',
      List: '',
      tagList: [],
    }
  },
  created(){
    axios.get('/api/tagList')
      .then(res => this.List = res.data)
      .catch((error)=>{
        this.errorMsg = 'Error! Could not reach the API. ' + error
        console.log(this.errorMsg)
      })        
  },
  methods: {
    addTag(){
      if (this.selected){
        if (!this.tagList.includes(this.selected)){
          this.tagList.push(this.selected)
          console.log(this.selected + 'を追加')
          this.selected = ''
          this.$emit('catchTag', this.tagList)
        } else {
          this.selected = ''
          console.log(this.selected + 'は追加済み')
        }
      }
    },
    deleteTag(tag){
      let index = this.tagList.indexOf(tag)
      this.tagList.splice(index, 1)
      console.log(tag +'タグを削除')
    }
  }

}
</script>
<style scoped>
.formTag{
    width: 35%;
    float: left;
}
.tags{
    margin: 1%;
}
ul{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0%;
    
}
ul > li{
    display: inline-block;
    border: 1px solid #08415C;
    border-radius: 5px;
    background-color: #08415C;
    color: #fff;
    padding: 0 2%;
    margin: 0 1% 1% 0;
}
.batsuBtn{
    cursor: pointer;
    color:#fff;
}
.batsuBtn:hover{
    opacity:0.6;
}
ul > li > p{
    display: inline;
    margin:0;
    font-size: 1.1rem;
}
.addTagBtn{
    display: inline-block;
    border: 1.4px solid #08415C;
    border-radius: 5px;
    padding: 1%;
    margin: 0 1%;
    cursor: pointer;
    color: #08415C;
}
.addTagBtn:hover{
    background-color: #08415C;
    opacity: 0.7;
    color: #FFF;
}
@media(max-width: 1000px){
    .uploadTag{
        text-align: center;
    }
    .formTag{
        width: 100%;
        float: none;
    }
    input{
        font-size: 16px;
        transform: scale(1.0);
    }
    .addTagBtn{
        margin: 1rem;
        padding: 6%;
    }
    
}
</style>