<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="10">
                <v-card>
                    <v-card-text>
                        <v-subheader>添加新部门</v-subheader>
                        <v-form v-model="valid">
                            <v-text-field
                                    label="部门名称"
                                    value=""
                                    id="deptName"
                                    :rules="nameRules"
                                    counter="20"
                                    autocomplete="off"
                                    class="mb-4"
                            ></v-text-field>
                            <v-textarea
                                    outlined
                                    value=""
                                    :counter="500"
                                    :rules="descriptionRules"
                                    id="deptDescription"
                                    label="部门描述"
                                    autocomplete="off"
                            ></v-textarea>
                            <v-text-field
                                    id="deptLocation"
                                    label="部门位置"
                                    :counter="50"
                                    :rules="locationRules"
                                    value=""
                                    autocomplete="off"
                            ></v-text-field>
                            <v-text-field
                                    id="deptWorkTime"
                                    label="工作时间"
                                    :counter="100"
                                    :rules="workTimeRules"
                                    value=""
                                    autocomplete="off"
                            ></v-text-field>

                        </v-form>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="indigo"
                                    outlined
                                    class="mx-3"
                                    @click="toLastPage"
                            >
                                放弃
                            </v-btn>
                            <v-btn
                                    color="indigo"
                                    outlined
                                    class="mx-3"
                                    @click="addDepartment"
                            >
                                添加
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-row>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar
                v-model="notCompleted"
                :timeout="2000"
                absolute
                bottom
                left
        >
            请将部门信息填写完整！
        </v-snackbar>
    </v-container>

</template>

<script>
    import departService from "../../service/departService";

    export default {
        name: "departAdd",
        data: () => ({
            valid: false,
            isEditing: false,
            notCompleted: false,
            descriptionRules: [
                v => v.length <= 200 || '描述必须小于200个字符',
            ],
            locationRules: [
                v => v.length <= 50 || '描述必须小于50个字符',
            ],
            workTimeRules: [
                v => v.length <= 100 || '描述必须小于100个字符',
            ],
            nameRules: [
                v => !!v || '部门名字不能为空',
                v => v.length < 20 || '部门名字不能超过20字符',
            ],
        }),
        methods: {
            // 添加部门
            addDepartment() {
                if (!this.valid) {
                    this.notCompleted = true;
                    return;
                }
                let deptName = document.getElementById("deptName").value;
                let description = document.getElementById("deptDescription").value;
                let location = document.getElementById("deptLocation").value;
                let workTime = document.getElementById("deptWorkTime").value;
                departService.addDepartment(deptName, location, workTime, description).then((res) => {
                    if (res.data.code === 200) {
                        alert("添加部门成功！");
                        this.toLastPage();
                    } else {
                        alert(res.data.msg);
                    }
                }).catch((err) => {
                    alert(err);
                })
            },

            // 返回上一级
            toLastPage() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>

</style>
