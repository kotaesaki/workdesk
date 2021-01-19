<template>
    <div class="col-md-4">  
        <ul id="settings-item">
            <li><router-link v-bind:to="{name: 'account'}">
                アカウント設定
            </router-link></li>
            <li><router-link v-bind:to="{name: 'profile'}">
                プロフィール設定
            </router-link></li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
    },
    data() {
        return{
            
       }
   },
   methods: {
       
   }, 
   mounted() {
   },
    
}
</script>
