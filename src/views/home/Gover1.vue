<template>
    <v-app id="inspire">
        <v-app-bar app>
            <v-spacer></v-spacer>
            <v-toolbar-title id="mainTitle" style="display: block">指尖武汉后台管理服务系统</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-sheet
                    color="grey lighten-4"
                    class="pa-4"
            >
                <v-avatar
                        class="mb-4 ml-10"
                        color="indigo"
                        size="64"
                ></v-avatar>

                <div>欢迎您！政府部门用户</div>
            </v-sheet>

            <v-divider></v-divider>

            <v-list>
                <v-list-item
                        v-for="[icon, text] in links"
                        :key="icon"
                        link
                >
                    <v-list-item-icon>
                        <v-icon color="indigo">{{ icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-container>
            <v-row>
                <v-col cols="5">
                    <v-card>
                        <v-subheader>2020/11/19 办理记录</v-subheader>

                        <v-list two-line>
                            <template>
                                <v-card
                                        class="mt-4 mx-auto"
                                        max-width="400"
                                >
                                    <v-sheet
                                            class="v-sheet--offset mx-auto"
                                            color="indigo"
                                            elevation="12"
                                            max-width="calc(100% - 32px)"
                                            min-height="130"
                                    >
                                        <v-sparkline
                                                :labels="labels"
                                                :value="value"
                                                color="white"
                                                line-width="3"
                                                padding="16"
                                        ></v-sparkline>
                                    </v-sheet>

                                    <v-card-text class="pt-0">
                                        <div class="title font-weight-light mb-2">
                                            办理业务人数统计
                                        </div>
                                        <div class="subheading font-weight-light grey--text">
                                            统计时段24小时
                                        </div>
                                        <v-divider class="my-2"></v-divider>
                                        <v-icon
                                                class="mr-2"
                                                small
                                        >
                                            mdi-clock
                                        </v-icon>
                                        <span class="caption grey--text font-weight-light">距离上一次更新：26分钟之前</span>
                                    </v-card-text>
                                </v-card>
                            </template>
                        </v-list>
                    </v-card>

                    <v-card class="mt-5">

                        <v-card-text>
                            <v-subheader>添加新办理业务</v-subheader>
                            <form>
                                <v-text-field
                                        label="办理业务名称"
                                ></v-text-field>
                                <v-text-field
                                        label="业务主要负责人"
                                ></v-text-field>
                                <v-select
                                        label="业务所需材料"
                                ></v-select>
                            </form>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card>
                        <v-subheader>添加新部门</v-subheader>
                        <v-card-text>
                            <form>
                                <v-row class="mx-1">
                                    <v-text-field
                                            label="部门地址"
                                    ></v-text-field>
                                    <v-btn
                                            class="ma-2"
                                            outlined
                                            color="indigo"
                                    >
                                        从地图上选择
                                    </v-btn>
                                </v-row>

                                <v-text-field
                                        label="部门联系电话"
                                ></v-text-field>
                                <v-row class="mx-1">
                                    <v-select
                                            label="部门负责人"
                                    ></v-select>
                                    <v-btn
                                            class="ma-2"
                                            outlined
                                            color="indigo"
                                    >
                                        添加新用户
                                    </v-btn>
                                    <v-btn
                                            class="ma-2"
                                            outlined
                                            color="indigo"
                                    >
                                        添加已有用户
                                    </v-btn>
                                </v-row>

                            </form>
                        </v-card-text>
                    </v-card>
                    <v-card class="mt-3">
                        <v-subheader>客户反馈信息栏</v-subheader>
                        <v-card-text>
                            <v-col
                                    cols="12"
                            >
                                <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="匿名客户"
                                        value="今天排队的人数太多了，如果工作人员能够提前跟我们反馈今天来办理的人数情况，今天我就不会浪费这么多的时间了..."
                                ></v-textarea>
                                <v-row>
                                    <v-btn
                                            class="ma-2"
                                            outlined
                                            min-width="150"
                                            color="indigo"
                                    >
                                        忽略
                                    </v-btn>
                                    <v-btn
                                            class="ma-2"
                                            min-width="180"
                                            outlined
                                            color="indigo"
                                    >
                                        待处理
                                    </v-btn>
                                    <v-btn
                                            class="ma-2"
                                            outlined
                                            min-width="150"
                                            color="indigo"
                                    >
                                        反馈
                                    </v-btn>
                                </v-row>
                            </v-col>
                        </v-card-text>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>

    </v-app>
</template>

<script>
    export default {
        name: "Gover1",
        data: () => ({
            cards: ['2020/11/19 办理记录'],
            drawer: null,
            links: [
                ['mdi-inbox-arrow-down', '办理记录'],
                ['mdi-domain', '部门信息'],
                ['mdi-message-text', '在线咨询'],
            ],
            labels: [
                '12am',
                '3am',
                '6am',
                '9am',
                '12pm',
                '3pm',
                '6pm',
                '9pm',
            ],
            value: [
                55,
                55,
                23,
                34,
                310,
                160,
                550,
                840,
            ],
        }),
    }
</script>

<style scoped>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }
</style>
