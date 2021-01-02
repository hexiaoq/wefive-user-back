<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-subheader>为业务添加材料</v-subheader>
                <v-form v-model="valid">
                    <v-text-field
                            label="材料名称"
                            value=""
                            :rules="materialNameRules"
                            :counter="20"
                            class="my-3"
                            id="materialName"
                            autocomplete="off"
                    ></v-text-field>
                    <v-textarea
                            auto-grow
                            outlined
                            rows="2"
                            label="材料描述"
                            value=""
                            :rules="descriptionRules"
                            :counter="500"
                            class="my-3"
                            id="materialDesc"
                            autocomplete="off"
                    ></v-textarea>
                    <v-text-field
                            label="上传图片文件"
                            value=""
                            class="my-3"
                            id="photoUrl"
                            :rules="photoUrlRules"
                            :counter="200"
                            autocomplete="off"
                    ></v-text-field>
                </v-form>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="indigo"
                            outlined
                            class="mx-3"
                            @click="back"
                    >
                        取消
                    </v-btn>
                    <v-btn
                            color="indigo"
                            outlined
                            class="mx-3"
                            @click="addMaterial"
                    >
                        添加
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-row>

            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import materialService from "../../service/materialService";
    import processService from "../../service/processService";

    export default {
        name: "AddMaterial",
        data () {
            return {
                valid: false,
                notCompleted: false,
                descriptionRules: [
                    v => v.length <= 500 || '描述必须小于500个字符',
                ],
                materialNameRules: [
                    v => !!v || '材料名字不能为空',
                    v => v.length < 20 || '部门名字不能超过20字符',
                ],
                photoUrlRules: [
                    v => v.length < 200 || '不能超过200字符',
                ],
            }
        },

        methods: {
            addMaterial() {
                if (!this.valid) {
                    this.notCompleted = true;
                    return null;
                }
                let busId = this.$route.params.busId;
                let materialName = document.getElementById("materialName").value;
                let description = document.getElementById("materialDesc").value;
                let photoUrl = document.getElementById("photoUrl").value;
                materialService.addMaterial(materialName, description, photoUrl, busId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else if (this.$route.params.processId) {
                        let materialId = res.data.data.materialId;
                        processService.addProcessMaterials(this.$route.params.processId, [materialId]).then((res) => {
                            if (res.data.code !== 200) {
                                alert(res.data.msg);
                                return null;
                            }
                            alert("材料添加成功！");
                            this.$router.go(-1);
                        }).catch((err) => {
                            alert(err);
                        });
                    } else {
                        alert("材料添加成功！");
                        this.$router.go(-1);
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            back() {
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped>

</style>
