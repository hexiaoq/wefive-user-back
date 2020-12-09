<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="10">
                <v-card>
                    <v-card-text>
                        <v-subheader>添加新业务</v-subheader>
                        <v-form v-model="valid">
                            <v-text-field
                                    label="业务名称"
                                    value=""
                                    id="busName"
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
                                    id="description"
                                    label="业务流程描述"
                                    autocomplete="off"
                            ></v-textarea>
                            <v-text-field
                                    id="requirement"
                                    label="业务办理需求"
                                    :counter="500"
                                    :rules="requirementRules"
                                    value=""
                                    autocomplete="off"
                            ></v-text-field>
                            <v-text-field
                                    id="cost"
                                    label="业务办理费用"
                                    :counter="50"
                                    :rules="costRules"
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
                                    @click="addBusiness"
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
            请将相关信息填写完整！
        </v-snackbar>
    </v-container>

</template>

<script>
    import businessService from "../../service/businessService";

    export default {
        name: "businessAdd",
        data: () => ({
            valid: false,
            isEditing: false,
            notCompleted: false,
            descriptionRules: [
                v => v.length <= 500 || '描述必须小于200个字符',
            ],
            requirementRules: [
                v => v.length <= 500 || '描述必须小于500个字符',
            ],
            costRules: [
                v => v.length <= 50 || '描述必须小于50个字符',
            ],
            nameRules: [
                v => !!v || '业务名字不能为空',
                v => v.length < 20 || '业务名字不能超过20字符',
            ],
        }),
        methods: {
            // 添加业务
            addBusiness() {
                if (!this.valid) {
                    this.notCompleted = true;
                    return;
                }
                let deptName = this.$store.state.goverModule.goverInfo.dept_name;
                let busName = document.getElementById("busName").value;
                let requirement = document.getElementById("requirement").value;
                let description = document.getElementById("description").value;
                let cost = document.getElementById("cost").value;
                businessService.addBusiness(deptName, busName, description, requirement, cost).then((res) => {
                    if (res.data.code === 200) {
                        alert("添加业务成功！");
                        this.toLastPage();
                    } else {
                        alert(res.data.msg);
                    }
                }).catch((err) => {
                    alert(err);
                });
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
