<template>
    <v-container>
        <v-row>
            <v-col cols="5">
                <v-card>
                    <v-subheader>2020/11/19 办理记录</v-subheader>
                    <v-list two-line>
                        <template>
                            <v-list-item>
                                <v-list-item-avatar color="indigo">
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>办理人 1</v-list-item-title>

                                    <v-list-item-subtitle>
                                        办理业务：身份证办理 | 办理状态：等待办理
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-btn
                                        class="ma-2"
                                        outlined
                                        color="indigo"
                                >
                                    查看
                                </v-btn>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                                <v-list-item-avatar color="indigo">
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>办理人 2</v-list-item-title>

                                    <v-list-item-subtitle>
                                        办理业务：身份证办理 | 办理状态：成功办理
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-btn
                                        class="ma-2"
                                        outlined
                                        color="indigo"
                                >
                                    查看
                                </v-btn>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                                <v-list-item-avatar color="indigo">
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>办理人 3</v-list-item-title>

                                    <v-list-item-subtitle>
                                        办理业务：出入境办理 | 办理状态：成功办理
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-btn
                                        class="ma-2"
                                        outlined
                                        color="indigo"
                                >
                                    查看
                                </v-btn>
                            </v-list-item>

                        </template>
                    </v-list>
                </v-card>

                <v-card class="mt-5">
                    <v-subheader>部门信息</v-subheader>
                    <v-list
                            subheader
                            three-line
                    >
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>身份证办理</v-list-item-title>
                                <v-list-item-subtitle>办理材料：身份证照片、户口本、居住证（异地办理需要）</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn
                                    class="ma-2"
                                    outlined
                                    color="indigo"
                            >
                                修改
                            </v-btn>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>户口本登记</v-list-item-title>
                                <v-list-item-subtitle>办理材料：身份证、户口簿、结婚证或离婚证、子女的出生证、房产证</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn
                                    class="ma-2"
                                    outlined
                                    color="indigo"
                            >
                                修改
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>出入境办理</v-list-item-title>
                                <v-list-item-subtitle>办理材料：本人照片、 中国公民出入境证件申请表、 居民身份证</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn
                                    class="ma-2"
                                    outlined
                                    color="indigo"
                            >
                                修改
                            </v-btn>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>
                </v-card>
            </v-col>
            <v-col col="6">
                <v-card>
                    <v-subheader>武汉市派出所地址及联系方式</v-subheader>
                    <v-list
                            subheader
                            three-line
                    >
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>余家头派出所</v-list-item-title>
                                <v-list-item-subtitle>88738504</v-list-item-subtitle>
                                <v-list-item-subtitle>武汉市洪山区团结路12号佳馨花园1号楼</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn
                                    class="ma-2"
                                    outlined
                                    color="indigo"
                            >
                                修改
                            </v-btn>
                        </v-list-item>
                        <v-divider></v-divider>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>凤凰山派出所</v-list-item-title>
                                <v-list-item-subtitle>88738500</v-list-item-subtitle>
                                <v-list-item-subtitle>首义路71号湖北省民主党派大楼</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn
                                    class="ma-2"
                                    outlined
                                    color="indigo"
                            >
                                修改
                            </v-btn>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>珞珈山派出所</v-list-item-title>
                                <v-list-item-subtitle>88738494</v-list-item-subtitle>
                                <v-list-item-subtitle>湖北省武汉市武昌区八一路301号</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn
                                    class="ma-2"
                                    outlined
                                    color="indigo"
                            >
                                修改
                            </v-btn>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>双湖派出所</v-list-item-title>
                                <v-list-item-subtitle>88738493</v-list-item-subtitle>
                                <v-list-item-subtitle>湖北省武汉市武昌区洪山路62号</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn
                                    class="ma-2"
                                    outlined
                                    color="indigo"
                            >
                                修改
                            </v-btn>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>石洞派出所</v-list-item-title>
                                <v-list-item-subtitle>88102494</v-list-item-subtitle>
                                <v-list-item-subtitle>湖北省武汉市武昌区中国工商银行（094县道北）</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn
                                    class="ma-2"
                                    outlined
                                    color="indigo"
                            >
                                修改
                            </v-btn>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>潘塘所</v-list-item-title>
                                <v-list-item-subtitle>88102703</v-list-item-subtitle>
                                <v-list-item-subtitle>湖北省武汉市振兴路98号</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn
                                    class="ma-2"
                                    outlined
                                    color="indigo"
                            >
                                修改
                            </v-btn>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "HomeAdmin",
        data: () => ({
            cards: ['2020/11/19 办理记录'],
            drawer: null,
            links: [
                ['mdi-inbox-arrow-down', '添加部门'],
                ['mdi-domain', '部门信息'],
                ['mdi-message-text', '在线咨询'],
            ],
        }),
    }
</script>

<style scoped>

</style>
