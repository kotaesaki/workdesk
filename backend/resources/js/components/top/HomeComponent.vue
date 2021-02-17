<template>
    <div id="wrapper">
        <div class="tab">
            <div class="tab_box container">
                <ul class="tab_list">
                    <li @click="changeTab('1')" v-bind:class="{'active': isActive === '1'}">New</li>
                    <li @click="changeTab('2')" v-bind:class="{'active': isActive === '2'}">Trend</li>
                    <li @click="changeTab('3')" v-bind:class="{'active': isActive === '3'}">Items</li>
                </ul>
            </div>
        </div>
        <div class="topImage container">
            <div class="box">
                <ul>
                    <li><div class="circle"></div></li>
                </ul>
                <span>自宅の作業環境の参考に！<br>在宅環境をシェアする写真投稿サービスです。</span>
                <img :src="`./images/top.jpg`" alt="トップ" class="image-top">

            </div>
        </div>
        <div class="pages">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="article">
                        <new-timeline v-show="isActive === '1'" class="item"></new-timeline>
                        <trend-timeline v-show="isActive === '2'" class="item"></trend-timeline>
                        <trend-item v-show="isActive === '3'"  class="item"></trend-item>
                    </div>
                </div>
            </div>     
        </div>   
    </div>
 
</template>
<script>
import NewTimeline from './NewTimeline.vue'
import TrendItem from './TrendItem.vue'
import TrendTimeline from './TrendTimeline.vue'
export default {
    components: { NewTimeline, TrendTimeline, TrendItem },
    data() {
        return {
            isActive: '1',
        };
    },
    methods: {
        changeTab(val) {
            this.isActive = val;
        },
    },
}
</script>
<style scoped>
    .topImage{
        position: relative;
        height: 50vh;
    }
    .image-top{
        position: absolute;
        width: 41vh;
        height: 100%;
        top: 0%;
        right: 2vw;
        object-fit: cover;
    }
    .topImage span{
        position: absolute;
        font-size: 1.5rem;
        text-align: center;
        top: 36%;
        left: 10%;
        color: #111111;
        text-shadow: 1px 1px 69px #3ea8ff;
    }
    .topImage ul {
        list-style: none;
        padding: 0;
    }
    .topImage .circle{
        position: absolute;
        width: 40vh;
        height: 40vh;
        border-radius: 50%;
        background-color: #DEF2FF;
        animation: horizontal 40s ease-in-out infinite alternate;
        animation-duration: 6.5s;
        z-index:-1;
    }
    .topImage li:first-child{

        animation: vertical 30s ease-in-out infinite alternate;
        animation-duration: 10.5s;
    }

    @keyframes horizontal {
        0% { transform:translateX( -400px); }
        100% { transform:translateX(  -200px); }
    }
    @keyframes vertical {
        0% { transform:translateY( 0px); }
        100% { transform:translateY(  100px); }
    }

    .tab{
        width: 100%;
        position: sticky;
        background-color:#fff;
        top:0;
        z-index: 100;
    }
    .tab_list {
        overflow: hidden;
        list-style: none;
    }
    .tab_list li {
        float: left;
        padding: 10px 20px;
        cursor: pointer;
        transition: .3s;
    }
    .tab_list li:not(:first-child) {
        border-left: none;
    }
    .tab_list li.active {
        border-bottom: 3px solid #000;
        cursor: auto;
    }
    .article{
        overflow: hidden;
        margin-top: -1px;
        width: 100%;
    }
    .pages{
        width:100vw;
        height: 100%;
        background-color: #DEF2FF;
        margin-top: 100px;
    }
</style>