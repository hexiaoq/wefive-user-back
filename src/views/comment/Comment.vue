<template>
    <v-container fluid onload="loadComment()">
        <v-row v-if="show">
            <v-col
                    v-for="(item, index) in comments"
                    :key="index"
                    cols="12"
                    sm="6"
            >
                <v-card class="mt-3" width="100%" v-if="item.delete_1 === '0'">
                    <v-subheader>客户反馈信息栏</v-subheader>
                    <v-card-text>
                        <v-col
                                cols="12"
                        >
                            <v-textarea
                                    rows="1"
                                    auto-grow
                                    outlined
                                    name="input-7-4"
                                    label="匿名客户"
                                    :value="item.content"
                            ></v-textarea>
                            <v-textarea
                                    rows="1"
                                    auto-grow
                                    outlined
                                    :id="'reply' + item.comment_id"
                                    label="回复"
                                    :value="item.reply"
                            ></v-textarea>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-btn
                                        class="ma-2"
                                        outlined
                                        width="40%"
                                        color="indigo"
                                >
                                    忽略
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn
                                        :id="item.comment_id"
                                        class="ma-2"
                                        outlined
                                        width="40%"
                                        color="indigo"
                                        @click="feedBack"
                                >
                                    反馈
                                </v-btn>
                                <v-spacer></v-spacer>
                            </v-row>
                        </v-col>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar
                v-model="success"
                :timeout="2000"
                outlined
                color="success"
                centered
                top
        ><v-icon color="success">
            mdi-checkbox-marked-circle
        </v-icon>
            回复成功！
        </v-snackbar>
    </v-container>
</template>

<script>
    import commentService from "../../service/commentService";

    export default {
        name: "Comment",
        data () {
            return {
                show: false,
                success: false,
                comments: [{
                    comment_id: '',
                    user_id: '',
                    dept_id: '',
                    bus_id: '',
                    content: '',
                    reply: '',
                    delete_1: '',
                }],
            }
        },
        mounted: function() {
            this.loadComment();
        },
        methods: {
            loadComment() {
                let deptId = this.$route.params.deptId;
                commentService.getDeptComment(deptId).then((res) => {
                    if (res.data.code === 200) {
                        this.comments = res.data.data.comments;
                        this.show = true;
                    } else {
                        alert(res.data.msg);
                    }
                }).catch((err) => {
                    alert(err);
                });
            },
            feedBack(event) {
                let commentId = event.currentTarget.id;
                let reply = document.getElementById("reply"+commentId).value;
                if (reply.length === 0) {
                    return null;
                }
                commentService.feedBack(commentId, reply).then((res) => {
                    if (res.data.code === 200) {
                        this.success = true;
                        setTimeout(this.reloadPage, 2000);
                    } else {
                        alert(res.data.msg);
                    }
                }).catch((err) => {
                    alert(err);
                })
            },

            reloadPage() {
                location.reload();
            },
        },
    }
</script>

<style scoped>

</style>
