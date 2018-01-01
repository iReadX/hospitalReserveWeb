<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form ref="userForm" :model="userForm" :label-width="100" label-position="right" :rules="inforValidate">
                    <FormItem label="昵称：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="登录帐号：" prop="userName">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.userName"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="登录密码：">
                        <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
                    </FormItem>
                    <div>
                        <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                        <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存
                        </Button>
                    </div>
                </Form>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right"
                  :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                    <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码"></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符"></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'ownspace_index',
        data () {
            const valideRePassword = (rule, value, callback) => {
                if (value !== this.editPasswordForm.newPass) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                userForm: {
                    name: '',
                    userName: ''
                },
                uid: '',  // 登录用户的userId
                save_loading: false,
                editPasswordModal: false, // 修改密码模态框显示
                savePassLoading: false,
                oldPassError: '',
                inforValidate: {
                    name: [
                        {required: true, message: '请输入昵称', trigger: 'blur'}
                    ],
                    userName: [
                        {required: true, message: '请输入登录帐号', trigger: 'blur'}
                    ]
                },
                editPasswordForm: {
                    oldPass: '',
                    newPass: '',
                    rePass: ''
                },
                passwordValidate: {
                    oldPass: [
                        {required: true, message: '请输入原密码', trigger: 'blur'}
                    ],
                    newPass: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, message: '请至少输入6个字符', trigger: 'blur'},
                        {max: 32, message: '最多输入32个字符', trigger: 'blur'}
                    ],
                    rePass: [
                        {required: true, message: '请再次输入新密码', trigger: 'blur'},
                        {validator: valideRePassword, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            showEditPassword () {
                this.editPasswordModal = true;
            },
            cancelEditUserInfor () {
                this.$store.commit('removeTag', 'ownspace_index');
                localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
                let lastPageName = '';
                if (this.$store.state.app.pageOpenedList.length > 1) {
                    lastPageName = this.$store.state.app.pageOpenedList[1].name;
                } else {
                    lastPageName = this.$store.state.app.pageOpenedList[0].name;
                }
                this.$router.push({
                    name: lastPageName
                });
            },
            saveEdit () {
                this.$refs['userForm'].validate((valid) => {
                    if (valid) {
                        this.save_loading = true;
                        this.$util.ajax.post('/console/updateUserInfo', this.userForm).then(res => {
                            if (res.code) {
                                this.$Message.error(res.msg);
                            } else {
                                this.$Message.success(res.msg);
                                this.$store.commit('user/updateInfo', this.userForm);
                            }
                            setTimeout(() => {
                                this.save_loading = false;
                            }, 1000);
                        });
                    }
                });
            },
            cancelEditPass () {
                this.editPasswordModal = false;
                this.editPasswordForm.newPass = '';
                this.editPasswordForm.oldPass = '';
                this.editPasswordForm.rePass = '';
            },
            saveEditPass () {
                this.$refs['editPasswordForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                });
                this.savePassLoading = true;
                this.$util.ajax.post('/console/updateUserPass',
                    {password: this.editPasswordForm.oldPass, newPassword: this.editPasswordForm.newPass}
                ).then(res => {
                    this.savePassLoading = false;
                    if (res.code) {
                        this.$Message.error(res.msg);
                    } else {
                        this.cancelEditPass();
                        this.$Message.success(res.msg);
                    }
                });
            },
            init () {
                let store = this.$store.state.user.info;
                this.userForm.name = store.name;
                this.userForm.userName = store.userName;
            },
            cancelInputCodeBox () {
                this.inputCodeVisible = false;
                this.userForm.cellphone = this.initPhone;
            },
            submitCode () {
                let vm = this;
                vm.checkIdentifyCodeLoading = true;
                if (this.securityCode.length === 0) {
                    this.$Message.error('请填写短信验证码');
                } else {
                    setTimeout(() => {
                        this.$Message.success('验证码正确');
                        this.inputCodeVisible = false;
                        this.checkIdentifyCodeLoading = false;
                    }, 1000);
                }
            },
            hasChangePhone () {
                this.phoneHasChanged = true;
                this.hasGetIdentifyCode = false;
                this.identifyCodeRight = false;
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
