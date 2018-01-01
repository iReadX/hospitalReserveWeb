<!--
****--@file     list
****--@date     2017/12/31 15:03
****--@author   Lurkerc
****--@describe   手机号列表
-->
<template>
    <div ref="content">
        <Table :data="tableData" :columns="columns" :height="tableHeight" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <Button type="info" @click="add">添加</Button>
            <div style="float: right;">
                <Page :total="total" :current="current" @on-change="changePage" show-total :pageSize="pageSize"></Page>
            </div>
        </div>

        <Modal title="添加手机号" v-model="addModal" class-name="vertical-center-modal" :mask-closable="false">
            <numbers-input @cancel="cancel" @add="subCall"></numbers-input>
            <div slot="footer"></div>
        </Modal>
        <Modal title="修好手机号" v-model="editModal" class-name="vertical-center-modal" :mask-closable="false">
            <numbers-input v-if="editModal" @cancel="cancel" @edit="subCall" :params="params"></numbers-input>
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="delModal" title="删除手机号" :loading="loading" @on-ok="del">
            <p>您确认删除该手机号吗？</p>
            <p>删除之后将不能查询该手机的相关任务和爬取的数据！</p>
        </Modal>
    </div>
</template>
<script>
    /* 当前组件必要引入 */
    import api from './api';
    import numbersInput from './input';
    // 当前组件引入全局的util
    export default {
        name: 'accounts-list',
        data () {
            return {
                loading: false,
                addModal: false,
                editModal: false,
                delModal: false,
                params: {},
                tableData: [],
                columns: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '手机号',
                        key: 'userName'
                    },
                    {
                        title: '密码',
                        key: 'password'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        render: (h, params) => {
                            return h('span', params.row.sex ? (params.row.sex === 1 ? '男' : '女') : '-');
                        }
                    },
                    {
                        title: '设备ID',
                        key: 'deviceId',
                        width: 160
                    },
                    {
                        title: '设备型号',
                        key: 'deviceSys'
                    },
                    {
                        title: '更新时间',
                        key: 'updateTime',
                        width: 100,
                        render: (h, params) => {
                            return h('span', params.row.updateTime ? this.$util.date.formatDate(+params.row.updateTime, 'yyyy-MM-dd HH:mm:ss') : '-');
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'addTime',
                        // width: 100,
                        render: (h, params) => {
                            return h('span', params.row.addTime ? this.$util.date.formatDate(+params.row.addTime, 'yyyy-MM-dd HH:mm:ss') : '-');
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'action',
                        width: 140,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.params = params.row;
                                            this.editModal = true;
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.params = params.row;
                                            this.delModal = true;
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                tableHeight: 0,
                total: 0,
                current: 1,
                pageSize: 20
            };
        },
        methods: {
            // 初始化请求列表数据
            init () {
                this.getTableData();
            },
            getTableData () {
                this.$util.ajax.post(api.list, {current: this.current}).then(res => {
                    if (res.code) {
                        // 错误
                    } else {
                        this.tableData = res.data;
                        this.total = res.total;
                        this.pageSize = res.pageSize;
                    }
                });
            },
            changePage (current) {
                this.current = current;
                this.getTableData();
            },
            add () {
                this.addModal = true;
            },
            del () {
                this.$util.ajax.post(api.del, {id: this.params.id}).then(res => {
                    if (res.code) {
                        this.$Message.error(res.msg);
                    } else {
                        this.getTableData();
                    }
                });
            },
            subCall (name, msg) {
                this.cancel(name);
                this.$Message.success(msg);
                this.getTableData();
            },
            cancel (name) {
                this[name + 'Modal'] = false;
            }
        },
        created () {
            this.init();
        },
        mounted () {
            this.$nextTick(() => {
                this.tableHeight = this.$refs.content.parentNode.offsetHeight - 52;
            });
        },
        components: {
            numbersInput
        }
    };
</script>

