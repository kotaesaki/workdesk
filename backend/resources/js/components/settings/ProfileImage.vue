<template>
    <div id="file-preview" class="file-preview">
        <div class="form-group">
            <label class="form-label image-label" for="image">
                <div class="add-image-btn">
                    <img class="add-image" src="'images/add-picture.png'">
                </div>
                <input id="image" class="form-input image-btn" type="file" name="image"
                    accept="image/png, image/jpeg" v-on:change="onFileChange">
            </label>        
        </div>
        <img class="userInfo__icon" v-bind:src="imageData" v-if="imageData">
        <img class="userInfo__icon" :src="`../${imageData1.icon_path}`" v-if="imageData1"/> 
    </div>
</template>
<script>
export default {
    el: '#file-preview',
    props: ['profile'],
    data() {
        return {
            imageData: '', //プレビュー画像格納用変数
            imageData1: this.profile.icon_path, //初期表示用の画像
            file :'',
        };
    },
    mounted() {

        
    },
    methods: {
        onFileChange(e) {
            const files = e.target.files;

            if(files.length > 0) {

                this.file = files[0];
                const reader = new FileReader();
                console.log(this.file);

                reader.onload = (e) => {
                    this.imageData = e.target.result;
                    this.imageData1 = '';
                    this.$emit('catchImage', this.imageData,this.file);
                    

                };
                reader.readAsDataURL(this.file);
            }
        }
    },
    watch: {
        profile(newValue, oldValue) {
            this.imageData1 = newValue;
        },
    },
};
</script>
<style scoped>
    .userInfo__icon{
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
    }
</style>