<template>
    <div id="wrapper">
        <img :src="`./images/top.jpg`" alt="トップ" class="image-top">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <p>最新の投稿</p>

                    <div class="card">

                    </div>
                </div>
                <div class="col-md-8">
                    <p>人気の投稿</p>
                </div>
                <div class="col-md-4">
                    <p>人気のアイテム</p>
                </div>
            </div>
        </div>        
    </div>
 
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .image-top{
        width:100vw;
        height: 300px;
        object-fit: cover;
    }
</style>