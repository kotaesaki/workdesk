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
        <img :src="`./images/top.jpg`" alt="トップ" class="image-top">
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
    .image-top{
        width:100vw;
        height: 300px;
        object-fit: cover;
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
    }
    .pages{
        width:100vw;
        height: 100%;
        background-color: #CFCABF;
        margin-top: 30px;
    }
</style>