<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="10" sm="4">
                <v-card width="100%" height="200" class="my-8 text-center" dark color="indigo">
                    <v-card-title>

                    </v-card-title>
                    <div class="text-center headline mt-11">
                        后台管理员登录入口
                    </div>
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
                            @click="sendAdminLoginInfo"
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
    //import storageService from "../../service/storageService";

    export default {
        name: "LoginAdmin",
        data: () => ({
            show: false,
            valid: false,
            notCompleted: false,
            admin: {
                admin_id: "",
                name: "",
                phone: "",
                Role: "",
                AvatarUrl: "",
            },
            phoneRules: [
                v => !!v || '账户不能为空',
                v => v.length === 11 || '电话号码不规范',
            ],
            passwordRules: [
                v => !!v || '密码不能为空',
                v => v.length >= 6 || '密码必须大于等于6位',
            ],
            password: 'Password',
        }),
        methods: {
            // 发送登录信息
            sendAdminLoginInfo() {
                // 判断填写有效性
                if (!this.valid) {
                    this.notCompleted = true;
                    return null;
                }
                const password = document.getElementById("password").value;
                const phone = document.getElementById("phone").value;
                loginService.sendAdminLoginInfo(phone, password).then((res) => {
                    if (res.data.code === 200) {
                        // 本地化存储
                        let admin = res.data.data.admin;
                        // let token = res.data.data.token;
                        let token = "abc";
                        // 本地储存用户信息和Token
                        this.$store.dispatch('adminModule/storeAdminInfo', {admin, token});
                        //console.log(this.$store.state.adminModule.state.adminInfo);
                        console.log(admin, token);
                        // 登录成功跳转主页面
                        this.$router.push({ name: 'departTable'});
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
