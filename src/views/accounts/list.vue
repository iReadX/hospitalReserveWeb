<!--
****--@file     list
****--@date     2017/12/31 14:32
****--@author   Lurkerc
****--@describe   管理员列表
-->
<template>
    <div ref="content">
        <Table :data="tableData" :columns="columns" :height="tableHeight" stripe></Table>
        <!--<div style="margin: 10px;overflow: hidden">-->
        <!--<div style="float: right;">-->
        <!--<Page :total="total" :current="current" @on-change="changePage"></Page>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
    /* 当前组件必要引入 */

    // 当前组件引入全局的util
    export default {
        name: 'accounts-list',
        data () {
            return {
                tableData: [],
                columns: [
                    {
                        title: 'ID',
                        key: 'userId'
                    },
                    {
                        title: '昵称',
                        key: 'name'
                    },
                    {
                        title: '帐号',
                        key: 'userName'
                    },
                    {
                        title: '最后登录时间',
                        key: 'lastTime',
                        render: (h, params) => {
                            return h('span', params.row.lastTime ? this.$util.date.formatDate(+params.row.lastTime, 'yyyy-MM-dd HH:mm:ss') : '-');
                        }
                    },
                    {
                        title: '最后登录IP',
                        key: 'lastIp',
                        render: (h, params) => {
                            return h('span', params.row.lastIp || '-');
                        }
                    }
                ],
                tableHeight: 0,
                total: 0,
                current: 1
            };
        },
        methods: {
            // 初始化请求列表数据
            init () {
                let {access} = this.$store.state.user.info;
                if (access === 0) {
                    this.columns.push({
                        title: '操作',
                        align: 'center',
                        key: 'action',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '16px'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({name: 'account-edit', params: {userId: params.row.userId}});
                                    }
                                }
                            }, '修改');
                        }
                    });
                }
                this.$util.ajax.post('/console/allUser').then(res => {
                    this.tableData = res.data;
                });
            },
            changePage () {
                console.log(this.current);
            }
        },
        created () {
            this.init();
        },
        mounted () {
            this.$nextTick(() => {
                this.tableHeight = this.$refs.content.parentNode.offsetHeight;
            });
        },
        components: {}
    };
</script>
