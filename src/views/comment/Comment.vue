<template>
    <v-container fluid>
        <v-card class="mt-3" width="50%">
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
    </v-container>
</template>

<script>
    export default {
        name: "Comment"
    }
</script>

<style scoped>

</style>
