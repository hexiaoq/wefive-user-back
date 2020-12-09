<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="10" sm="4">
                <v-card width="100%" height="200" class="my-8 text-center" color="indigo">
                    <!--<div class="text&#45;&#45;white" style="font-family: 华文行楷,serif;">
                        登录
                    </div>
                    <v-card-title class="white&#45;&#45;text align-center">
                        wefive
                    </v-card-title>-->
                </v-card>
                <v-form v-model="valid">
                    <v-text-field
                            name="input-10-2"
                            label="账号"
                            value=""
                            id="phone"
                            outlined
                            :rules="phoneRules"
                    ></v-text-field>
                    <v-text-field
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            name="input-10-2"
                            label="密码"
                            value=""
                            outlined
                            id="password"
                            @click:append="show = !show"
                            :rules="passwordRules"
                    ></v-text-field>
                    <v-btn
                            color="indigo"
                            dark
                            large
                            outlined
                            width="100%"
                            @click="sendLoginInfo"
                    >
                        登录
                    </v-btn>
                    <v-snackbar
                            v-model="notCompleted"
                            :timeout="2000"
                            absolute
                            bottom
                            left
                    >
                        请将您的账户信息填写完整！
                    </v-snackbar>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import loginService from "../../service/loginService";

    export default {
        name: "Login",
        data: () => ({
            show: false,
            valid: false,
            notCompleted: false,
            phoneRules: [
                v => !!v || '账户不能为空',
                v => v.length === 11 || '电话号码不规范',
            ],
            passwordRules: [
                v => !!v || '密码不能为空',
                v => v.length >= 6 || '密码必须大于等于6位',
            ],
            password: 'Password',
            governor: {
                phone: "",
                gover_id: "",
                dept_id: "",
                dept_name: "",
            },
        }),
        methods: {
            // 发送登录信息
            sendLoginInfo() {
                // 判断填写有效性
                if (!this.valid) {
                    this.notCompleted = true;
                    return null;
                }
                const password = document.getElementById("password").value;
                const phone = document.getElementById("phone").value;
                loginService.sendLoginInfo(phone, password).then((res) => {
                    if (res.data.code === 200) {
                        // 本地化存储
                        let governor = res.data.data.governor;
                        let token = "abc";
                        this.$store.dispatch('goverModule/storeGoverInfo', {governor, token});
                        // 登录成功跳转主页面
                        const deptName = governor.dept_name;
                        // 携带部门参数
                        this.$router.push({ name: 'businessTable', params: {'name': deptName}});
                    } else {
                        alert("登录失败！" + res.data.msg);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>

</style>
