<template>
    <v-container fluid onload="loadDepartment()">
        <v-row justify="center">
            <v-col cols="10">
                <v-card>
                    <v-card-text>
                        <v-subheader>编辑部门信息</v-subheader>
                        <v-form v-model="valid">
                            <v-text-field
                                    label="部门名称"
                                    :value="department.dept_name"
                                    id="deptName"
                                    :rules="nameRules"
                                    counter="20"
                                    autocomplete="off"
                                    class="mb-4"
                            ></v-text-field>
                            <v-textarea
                                    outlined
                                    :value="department.description"
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
                                    :value="department.location"
                                    autocomplete="off"
                            ></v-text-field>
                            <v-text-field
                                    id="deptWorkTime"
                                    label="工作时间"
                                    :counter="100"
                                    :rules="lenRules100"
                                    :value="department.work_time"
                                    autocomplete="off"
                            ></v-text-field>
                            <v-text-field
                                    id="picture"
                                    label="部门图片url"
                                    :counter="200"
                                    :rules="lenRules200"
                                    :value="department.picture"
                                    autocomplete="off"
                            ></v-text-field>
                            <v-text-field
                                    id="contact"
                                    label="部门联系人"
                                    :counter="200"
                                    :rules="lenRules200"
                                    :value="department.contact"
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
                                    @click="editDepartment"
                            >
                                保存
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
            请将部门信息填写正确！
        </v-snackbar>
    </v-container>

</template>

<script>
    import departService from "../../service/departService";

    export default {
        name: "departEdit",
        data: () => ({
            valid: false,
            isEditing: false,
            notCompleted: false,
            department: {
                dept_id: "",
                dept_name: "",
                description: "",
                location: "",
                work_time: "",
                picture: "",
                contact: "",
            },
            descriptionRules: [
                v => v.length <= 200 || '描述必须小于200个字符',
            ],
            locationRules: [
                v => v.length <= 50 || '描述必须小于50个字符',
            ],
            lenRules100: [
                v => v.length <= 100 || '必须小于100个字符',
            ],
            lenRules200: [
                v => v.length <= 200 || '必须小于100个字符',
            ],
            nameRules: [
                v => v.length < 20 || '部门名字不能超过20字符',
            ],
        }),

        mounted: function() {
            this.loadDepartment();
        },

        methods: {
            loadDepartment() {
                let deptId = this.$route.params.id;
                departService.getDepartment(deptId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.department = res.data.data.department;
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            editDepartment() {
                if (!this.valid) {
                    this.notCompleted = true;
                    return;
                }
                let deptId = this.$route.params.id;
                let deptName = document.getElementById("deptName").value;
                let description = document.getElementById("deptDescription").value;
                let location = document.getElementById("deptLocation").value;
                let workTime = document.getElementById("deptWorkTime").value;
                let picture = document.getElementById("picture").value;
                let contact = document.getElementById("contact").value;
                departService.updateDepartment(deptId, deptName, location, workTime, description, picture, contact).then((res) => {
                    if (res.data.code === 200) {
                        alert("更新部门成功！");
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
