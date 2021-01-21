<template>
    <div id="post-image-preview" class="post-image-preview">
        <div class="form-group">
            <p>画像を追加する</p>
            <label for="image" class="image-view">
                <input id="image" class="form-input image-btn" type="file" name="image"
                    accept="image/png, image/jpeg" v-on:change="openModal">
                <img class="cropimg" v-bind:src="cropImg" v-if="cropImg">
            </label>

            <!-- 以下モーダル -->
            <div class="overlay" v-show="showModal">
                <div class="modal1">
                    <p>モーダル</p>
                    <div v-if="imageData" class="image-box">
                        <vue-cropper
                            ref="cropper"
                            :guides="true"
                            :view-mode="2"
                            :drag-mode="none"
                            :aspect-ratio= "1/1"
                            :auto-crop-area="0.5"
                            :min-container-width="200"
                            :min-container-height="200"
                            :background="true"
                            :rotatable="false"
                            :src="imageData"
                            :img-style="{ 'width': '200px', 'height': '200px' }"
                            v-if="imageData"
                        ></vue-cropper>
                    </div>

                    <p><button v-on:click="closeModal">キャンセル</button></p>                    
                    <p><button v-on:click="cropImage">完了</button></p>
                </div>
            </div>
            <button v-on:click="deleteImage">削除</button>

        </div>
    </div>
</template>
<script>
import VueCropper from "vue-cropperjs";

import "cropperjs/dist/cropper.css";

export default {
    components: {
        VueCropper
    },
    el:'#post-image-preview',
    props:
    [

    ],
    data() {
        return {
            showModal: false,
            imageData:'',
            cropImg:'',
            file:{},
        };
    },
    methods: {
        openModal(e) {
            let files = e.target.files;
            if(files.length) {
                this.file = files[0];
                const reader = new FileReader();
                console.log(this.file);
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                    this.$refs.cropper.replace(e.target.result);
                };
                reader.readAsDataURL(this.file);
                e.target.value = '';
                this.showModal = true;

            }
            
        },
        closeModal(){
            this.files= '';
            this.showModal = false;
        },
        cropImage(){
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            this.showModal = false;
        },
        deleteImage(){
            this.imageData = '';
            this.cropImg = '';
            this.file = '';
            //こっちでもemit送る
        },


    },
    watch: {
        
    },
    
}
</script>
<style scoped>
.image-view{
    width: 200px;
    height: 200px;
    background-color: beige;

}
.overlay{
    z-index:1;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);

    display: flex;
    align-items: center;
    justify-content: center;
}
.modal1{
    z-index: 2;
    width: 50%;
    padding: 1em;
    background-color: #fff;
}

.cropimg{
    width: 200px;
    height: 200px;
}
.image-box{
    width: 200px; 
    height:200px; 
    border: 1px solid gray; 
    display: inline-block;
}
</style>