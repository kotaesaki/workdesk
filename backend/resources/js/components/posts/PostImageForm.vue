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
            <button v-on:click="deleteImage" v-if="cropImg">削除</button>

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
/*     props:
    [

    ], */
    data() {
        return {
            showModal: false,
            imageData:'',
            cropImg:'',
            file:'',
            blob: '',
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
            this.deleteImage();
            this.showModal = false;
        },
        cropImage(){
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            let bin = atob(this.cropImg.replace(/^.*,/, ''));
            let buffer = new Uint8Array(bin.length);
            for(let i = 0; i < bin.length; i++){
                buffer[i] = bin.charCodeAt(i);
            }
            // Blobを作成
            this.blob = new Blob([buffer.buffer], {
                type: "image/jpeg"
            });
            console.log(this.blob);
            this.$emit('catchBlob', this.blob);
            this.showModal = false;
        },
        deleteImage(){
            console.log("写真消します");
            this.imageData = '';
            this.cropImg = '';
            this.file = '';
            this.blob = '';
            this.$emit('catchBlob', this.blob);
            console.log("写真消しました");
            //こっちでもemit送る
        },


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
label input{
    display: none;
}
</style>