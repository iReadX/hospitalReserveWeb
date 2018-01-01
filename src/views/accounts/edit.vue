<!--
****--@file     edit
****--@date     2017/12/31 14:54
****--@author   Lurkerc
****--@describe   管理员帐号修改
-->
<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                管理员信息
            </p>
            <div>
                <Form ref="userForm" :labelWidth="70" :model="userForm" label-position="right" :rules="inforValidate">
                    <FormItem label="昵称：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="帐号：" prop="userName">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.userName"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="密码：" prop="password">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.password"></Input>
                        </div>
                        <p>(不输入则不修改登录密码)</p>
                    </FormItem>
                    <div>
                        <Button type="primary" style="width: 100px;" :disabled="!canSave" :loading="save_loading"
                                @click="saveEdit">保存
                        </Button>
                    </div>
                </Form>
            </div>
        </Card>
    </div>
</template>
<script>
    /* 当前组件必要引入 */

    export default {
        name: 'account-input',
        data () {
            return {
                save_loading: false,
                canSave: false,
                userForm: {
                    userId: '',
                    name: '',
                    userName: '',
                    password: ''
                },
                inforValidate: {
                    name: [
                        {required: true, message: '请输入昵称', trigger: 'blur'}
                    ],
                    userName: [
                        {required: true, message: '请输入帐号', trigger: 'blur'}
                    ],
                    password: [
                        // {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, message: '请至少输入6个字符', trigger: 'blur'},
                        {max: 32, message: '最多输入32个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            // 初始化请求列表数据
            init () {
                let userId = this.$route.params.userId;
                if (!userId) {
                    return false;
                }
                this.$util.ajax.post('/console/getUserInfo', {userId}).then(res => {
                    if (res.code) {
                        this.$Message.error(res.msg);
                    } else {
                        this.canSave = true;
                        for (let key in this.userForm) {
                            this.userForm[key] = res.data[key] || '';
                        }
                    }
                });
            },
            saveEdit () {
                this.$refs['userForm'].validate((valid) => {
                    if (valid) {
                        this.save_loading = true;
                        this.$util.ajax.post('/console/updateUserInfoByAdmin', this.userForm).then(res => {
                            if (res.code) {
                                this.$Message.error(res.msg);
                            } else {
                                this.$Message.success(res.msg);
                                this.$router.push({name: 'accounts-list'});
                            }
                            setTimeout(() => {
                                this.save_loading = false;
                            }, 1000);
                        });
                    }
                });
            }
        },
        created () {
            this.init();
        },
        mounted () {
        },
        watch: {
            '$route' () {
                this.init();
            }
        },
        components: {}
    };
</script>
