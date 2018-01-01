<!--
****--@file     info
****--@date     2017/12/31 15:41
****--@author   Lurkerc
****--@describe   系统信息
-->
<style lang="less">
    @import './info.less';
</style>
<template>
    <iframe frameborder=0 marginheight=0 marginwidth=0 scrolling="auto" src='http://www.alurk.com:19999' class="iframeView"></iframe>
</template>
<script>
    /* 当前组件必要引入 */

    export default {
        name: 'system-info',
        data () {
            return {};
        },
        methods: {
            // 初始化请求列表数据
            init () {

            }
        },
        created () {
            this.init();
        },
        mounted () {
        },
        components: {}
    };
</script>
