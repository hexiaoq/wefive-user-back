<template>
    <v-container onload="updateGovernors()">
        <!-- 工具栏 -->
        <v-toolbar dense color="indigo" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>政府部门人员列表</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <!-- 列表内容 -->
        <v-card>
            <v-card-title>
                <v-btn text color="indigo" @click="showAddGoverDialog">添加工作人员</v-btn>
                <v-btn text color="indigo" @click="showDeleteGoverDialog">删除工作人员</v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="governors"
                    :search="search"
            ></v-data-table>
        </v-card>

        <!-- 添加工作人员 -->
        <v-dialog
                v-model="addGoverDialog"
                persistent
                max-width="80%"
        >
            <v-card>
                <v-card-text>
                    <v-subheader>添加新部门人员</v-subheader>
                    <v-form v-model="valid">
                        <v-text-field
                                label="新工作人员电话"
                                value=""
                                :rules="phoneRules"
                                class="my-3"
                                id="phone"
                                autocomplete="off"
                        ></v-text-field>
                        <v-autocomplete
                                :items="departs"
                                color="indigo"
                                label="工作所在部门"
                                item-text="name"
                                item-value="name"
                                id="department"
                                :filter="customFilter"
                                :rules="departRules"
                        >
                        </v-autocomplete>
                        <!--<v-autocomplete
                                class="my-3"

                                :items="departments"
                                :filter="customFilter"
                                color="white"
                                value=""
                                item-text="name"
                                label="所属政府部门"
                                id="department"
                                :rules="departRules"
                        ><template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                                <v-list-item-content>
                                    <v-list-item-title v-html="data.item.dept_name"></v-list-item-title>
                                </v-list-item-content>
                            </template>
                        </template>
                        </v-autocomplete>-->
                    </v-form>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="indigo"
                                outlined
                                class="mx-3"
                                @click="addGoverDialog = false"
                        >
                            取消
                        </v-btn>
                        <v-btn
                                color="indigo"
                                outlined
                                class="mx-3"
                                @click="addGovernor"
                        >
                            添加
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-row>

                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- 删除工作人员 -->
        <v-dialog
                v-model="deleteGoverDialog"
                persistent
                max-width="80%"
        >
            <v-card>
                <v-card-text>
                    <v-subheader>删除部门人员</v-subheader>
                    <v-form v-model="valid">
                        <v-autocomplete
                                :items="phones"
                                color="indigo"
                                label="工作人员电话"
                                item-text="name"
                                item-value="name"
                                id="phones"
                                :filter="customFilter"
                                :rules="phoneRules"
                        >
                        </v-autocomplete>
                    </v-form>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="indigo"
                                outlined
                                class="mx-3"
                                @click="deleteGoverDialog = false"
                        >
                            取消
                        </v-btn>
                        <v-btn
                                color="indigo"
                                outlined
                                class="mx-3"
                                @click="deleteGovernor"
                        >
                            删除
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-row>

                </v-card-text>
            </v-card>
        </v-dialog>
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
    import goverService from "../../service/goverService";
    import departService from "../../service/departService";

    export default {
        name: "GoverTable",
        data() {
            return {
                valid: false,
                notCompleted: false,
                phoneRules: [
                    v => !!v || '电话不能为空',
                ],
                departRules: [
                    v => !!v || '所属政府部门不能为空',
                ],
                addGoverDialog: false,
                deleteGoverDialog: false,
                search: '',
                headers: [
                    {
                        text: '电话',
                        align: 'start',
                        sortable: false,
                        value: 'phone',
                    },
                    { text: '所属部门', value: 'dept_name' },
                ],
                governors: [{
                    gover_id: "",
                    phone: "",
                    dept_name: "",
                }],
                departs: [],
                phones: [],
            };
        },

        mounted: function() {
            this.updateGovernors();
        },

        methods: {
            updateGovernors() {
                goverService.getAllGovernor().then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.governors = res.data.data.governors;
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            // 添加工作人员
            addGovernor() {
                if (!this.valid) {
                    this.notCompleted = true;
                    return;
                }
                let department = document.getElementById("department").value;
                let phone = document.getElementById("phone").value;
                goverService.addGovernor(phone, department).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert("添加工作人员成功！");
                        location.reload();
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            // 删除工作人员
            deleteGovernor() {
                if (!this.valid) {
                    this.notCompleted = true;
                    return;
                }
                let phone = document.getElementById("phones").value;
                goverService.deleteGovernor(phone).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert("删除工作人员成功！");
                        location.reload();
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            // 显示添加人员对话框
            showAddGoverDialog() {
                this.addGoverDialog = true;
                // 获取所有部门
                departService.getAllDepartment().then((res) => {
                    this.departs = new Array(res.data.data.departments.length);
                    for (let i = 0; i < res.data.data.departments.length; i++) {
                        this.departs[i] = res.data.data.departments[i].dept_name;
                    }
                }).catch((err) => {
                    alert(err);
                    return null;
                });
            },

            // 显示添加人员对话框
            showDeleteGoverDialog() {
                this.deleteGoverDialog = true;
                this.phones = new Array(this.governors.length);
                for (let i = 0; i < this.governors.length; i++) {
                    this.phones[i] = this.governors[i].phone;
                }
            },

            customFilter (item, queryText) {
                return item.indexOf(queryText) > -1
            },
        },
    }
</script>

<style scoped>

</style>
