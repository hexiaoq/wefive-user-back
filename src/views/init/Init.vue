<template>
    <v-container fluid>
        <v-row align="center">
            <v-col cols="12" sm="7">
                <v-carousel
                        cycle
                        height="90vh"
                        hide-delimiter-background
                        :show-arrows="false"
                        hide-delimiters
                >
                    <v-carousel-item>
                        <v-sheet
                                color="indigo"
                                height="100%"
                        >
                            <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                            >
                                <div class="display-3">
                                    Slide
                                </div>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                    <v-carousel-item>
                        <v-sheet
                                color="warning"
                                height="100%"
                        >
                            <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                            >
                                <div class="display-3">
                                    Slide
                                </div>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col cols="12" sm="5">
                <v-row align="center">
                    <v-col
                            cols="12"
                            sm="12"
                    >
                        <div class="text-center">
                            <div class="mt-16">
                                <v-btn
                                        color="indigo"
                                        dark
                                        large
                                        outlined
                                        width="50%"
                                        min-width="200"
                                        @click="toLogin"
                                >
                                    政府部门用户登录入口
                                </v-btn>
                            </div>
                            <div class="my-2">
                                <v-btn
                                        color="indigo"
                                        dark
                                        large
                                        outlined
                                        width="50%"
                                        min-width="200"
                                        @click="toLoginAdmin"
                                >
                                    后台管理员登录入口
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>


</template>

<script>
    export default {
        name: "Init",
        methods: {
            // 跳转登录
            toLogin() {
                this.$router.push({ name: 'login'});
            },
            // 跳转管理员登录
            toLoginAdmin() {
                this.$router.push({ name: 'loginAdmin'});
            },
        }
    }
</script>

<style scoped>

</style>
