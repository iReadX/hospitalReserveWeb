<!--
****--@file     input
****--@date     2018/1/1 18:37
****--@author   Lurkerc
****--@describe   编辑手机号
-->
<template>
    <Form ref="editForm" :labelWidth="100" :model="editForm" label-position="right" :rules="rules">
        <FormItem label="手机号：" prop="userName">
            <div style="display:inline-block;width:300px;">
                <Input v-model="editForm.userName"></Input>
            </div>
        </FormItem>
        <FormItem label="密码：" prop="password">
            <div style="display:inline-block;width:300px;">
                <Input v-model="editForm.password"></Input>
            </div>
        </FormItem>
        <FormItem label="性别：" prop="sex">
            <div style="display:inline-block;width:300px;">
                <Select v-model="editForm.sex" clearable>
                    <Option v-for="index in 2" :value="index+''" :key="index">{{ index | sex }}</Option>
                </Select>
            </div>
        </FormItem>
        <FormItem label="设备ID：" prop="deviceId">
            <div style="display:inline-block;width:300px;">
                <Input v-model="editForm.deviceId"></Input>
            </div>
            <p>（不输入则系统自动生成16位设备ID）</p>
        </FormItem>
        <FormItem label="设备型号：" prop="deviceSys">
            <div style="display:inline-block;width:300px;">
                <Input v-model="editForm.deviceSys"></Input>
            </div>
            <p>（不输入则系统自动生成设备型号）</p>
        </FormItem>
        <div align="center">
            <Button type="success" :loading="saveLoading" @click="saveData">保存</Button>
            <Button @click="cancel">取消</Button>
        </div>
    </Form>
</template>
<script>
    /* 当前组件必要引入 */
    import api from './api';

    export default {
        name: 'number-input',
        props: ['params'],
        data () {
            return {
                saveLoading: false,
                editForm: {
                    userName: '',
                    password: '',
                    sex: '',
                    deviceId: '',
                    deviceSys: ''
                },
                editType: 'add',
                rules: {
                    userName: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    deviceId: [
                        {min: 15, message: '请至少输入15个字符', trigger: 'blur'},
                        {max: 16, message: '最多输入16个字符', trigger: 'blur'}
                    ],
                    deviceSys: [
                        {min: 1, message: '请至少输入1个字符', trigger: 'blur'},
                        {max: 6, message: '最多输入6个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            // 初始化请求列表数据
            init () {
                if (this.params) {
                    this.editType = 'edit';
                    this.getEditData();
                }
            },
            getEditData () {
                this.$util.ajax.post(api.get, {id: this.params.id}).then(res => {
                    if (res.code) {
                        this.$Message.error(res.msg);
                    } else {
                        this.editForm = res.data;
                    }
                });
            },
            saveData () {
                let msg = {add: '添加', edit: '修改'};
                this.$refs['editForm'].validate((valid) => {
                    if (valid) {
                        this.saveLoading = true;
                        this.$util.ajax.post(api[this.editType], this.editForm).then(res => {
                            if (res.code) {
                                this.$Message.error(res.msg);
                            } else {
                                this.$emit(this.editType, this.editType, msg[this.editType] + '成功！');
                            }
                            this.saveLoading = false;
                        });
                    }
                });
            },
            cancel () {
                this.$emit('cancel', this.editType);
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
