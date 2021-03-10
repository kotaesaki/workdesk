<template>
  <div class="trend-item">
    <h2 class="title">
      Trend Item
    </h2>
    <p>人気の商品を表示しています。</p>
    <div class="contents">
      <div
        v-for="item in items"
        :key="item.item_id"
        class="contentItem">
        <p
          v-once
          class="itemRank">
          {{ count[n++] }}
        </p>
        <a
          :href="`${item.item_url}`"
          target="_blank">
          <img
            :src="`${item.item_image_url}`"
            alt="商品">
          <p class="itemName">{{ item.item_name }}</p>
          <p class="itemPrice">¥{{ item.item_price }}</p>
        </a>
      </div>
    </div>
    <div
      v-show="loading"
      class="loader-space">
      <vue-loaders-ball-spin-fade-loader
        color="#fff"
        class="loader" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: '',
      loading: false,
      count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      n: 0
    }
  },
  mounted() {
    this.getItems()
  },
  methods: {
    async getItems() {
      this.loading = true
      await axios.get('/api/trend_items').then(res=>{
        console.log(res.data)
        this.items = res.data
      }).then(()=>this.loading = false)
        .catch(err=> {
          alert('商品の取得に失敗しました。')
          this.loading = false
        })
    },
  },
}
</script>
<style scoped>
.trend-item{
    margin-top: 30px;
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    text-align: center;
}
h2{
    text-align: center;
}
.trend-item > p{
    text-align: center;
}
.contents{
  width: 80%;
  margin: 0 auto;
}
.itemRank{
  float: left;
  clear: both;
  font-size: 4.3rem;
  margin: 0;
}
.contentItem{
  position: relative;
  width: auto;
  margin-bottom: 3rem;
  padding-bottom: 4rem;
  border-bottom: 2px dotted #000
}
.contentItem:hover{
  opacity: 0.7;
}
.contentItem img{
  width:auto;
  height: 100%;
  float: left;
  margin: 0 2rem;
}
.itemName{
  padding-top: 2rem;
}
.itemPrice{
  font-size: 1.5rem;
  color: black;
  text-align: right;
  padding-right: 2rem;
}
.loader-space{
  width: 100%;
  height: 20vh;
  position: relative;
}
.loader{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
}
@media(max-width:1000px){
.itemRank{
  float: none;
  font-size: 3.3rem;
}
.contentItem img{
  float: none;
}
.itemName{
  padding-top: 0.5rem;
  font-size: 0.7rem;
}
.contentItem{
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}
}
</style>