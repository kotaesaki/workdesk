<template>
  <div class="footer">
    <div>
      <img
        :src="`/images/Logo.svg`"
        alt="ロゴ"
        class="logo">
      <p>@2021 TAKUWAKU All Rights Reserved.</p>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.footer{
  position: absolute;
  width: 100%;
  height: 20vh;
  background-color: #3E3E3E;
  color: aliceblue;
  margin: 10% 0 0 0;
  text-align: center;
  vertical-align: middle;
  bottom: 0;
}
.footer div{
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 20%;
  height: 60%;

}
.footer p{
  font-size: 0.8rem;
  margin: 0%;
}
.logo{
    height: 74px;
    margin: 5% 0 0;
}
</style>