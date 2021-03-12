<template>
  <div class="col-md-4">  
    <div class="settingBar">
      <ul id="settings-item">
        <router-link :to="{name: 'account'}">
          <li style="border-top:1px solid #08415C;">
            アカウント設定
          </li>
        </router-link>
        <router-link :to="{name: 'profile'}">
          <li>プロフィール設定</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.settingBar{
    margin: 40% 0;
}
ul{
    list-style: none;
    padding: 4%;
}
ul li{
    border-bottom: 1px solid #08415C;
    padding: 1rem;
}
ul li:hover{
    cursor: pointer;
    background-color: #08415C;
    color: #fff;
}
@media(max-width:767px){
    .settingBar{
        margin: 5% 0 20% 0;
    }
}
</style>
