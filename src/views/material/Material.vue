<template>
    <v-container fluid onload="loadBusinessDetail()">
        <!-- 工具栏 -->
        <v-toolbar dense color="indigo" dark>
            <v-btn icon @click="lastPage">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title>业务材料管理</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>

        <!-- 主要内容 -->
        <v-card class="px-5">
            <!-- 业务详情页 -->
            <v-list
                    three-line
                    subheader
            >
                <v-subheader>业务详情</v-subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>业务名称</v-list-item-title>
                        <v-list-item-subtitle v-if="!this.businessEditing">{{this.business.bus_name}}</v-list-item-subtitle>
                        <v-textarea
                                auto-grow
                                rows="1"
                                outlined
                                v-if="this.businessEditing"
                                :value="this.business.bus_name"
                                id="editBusName"
                                autocomplete="off"
                        ></v-textarea>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>业务描述</v-list-item-title>
                        <v-card-text v-if="!this.businessEditing">{{this.business.description}}</v-card-text>
                        <v-textarea
                                auto-grow
                                rows="1"
                                outlined
                                v-if="this.businessEditing"
                                :value="this.business.description"
                                id="editBusDescription"
                                autocomplete="off"
                        ></v-textarea>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>业务需求</v-list-item-title>
                        <v-list-item-subtitle v-if="!this.businessEditing">{{this.business.requirement}}</v-list-item-subtitle>
                        <v-textarea
                                auto-grow
                                rows="1"
                                outlined
                                v-if="this.businessEditing"
                                :value="this.business.requirement"
                                autocomplete="off"
                                id="editRequirement"
                        ></v-textarea>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>业务费用</v-list-item-title>
                        <v-list-item-subtitle v-if="!this.businessEditing">￥{{this.business.cost}}</v-list-item-subtitle>
                        <v-textarea
                                auto-grow
                                rows="1"
                                outlined
                                v-if="this.businessEditing"
                                :value="this.business.cost"
                                id="editCost"
                                autocomplete="off"
                        ></v-textarea>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                    <v-btn
                            v-if="!this.businessEditing"
                            color="indigo"
                            outlined
                            @click="businessEditing = true"
                            width="100%"
                    >
                        编辑
                    </v-btn>
                    <v-btn
                            v-if="this.businessEditing"
                            color="indigo"
                            dark
                            @click="editBusiness"
                            width="100%"
                    >
                        保存
                    </v-btn>
                </v-list-item>
                <v-list-item dense>
                    <v-btn
                            v-if="!this.businessEditing"
                            color="red"
                            outlined
                            @click="deleteBusiness"
                            width="100%"
                    >
                        删除
                    </v-btn>
                </v-list-item>

            </v-list>

            <v-divider class="mb-6"></v-divider>

            <v-btn text color="indigo" @click="toAddMaterial">添加业务材料</v-btn>

            <!-- 材料列表 -->
            <v-list rounded>
                <v-subheader>材料列表</v-subheader>
                <v-list-item-group
                        v-model="selectedItem"
                        color="primary"
                        class="mb-12"
                >
                    <v-list-item
                            v-for="(item, i) in materials"
                            :key="i"
                            @click="showMaterialDetail"
                    >
                        <v-list-item-icon>
                            <v-icon class="indigo--text">mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.material_name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>

        <!-- 某个材料详情 -->
        <v-dialog
                v-if="this.materials[this.selectedItem]"
                v-model="detailDialog"
                width="500"
        >
            <v-list
                    three-line
                    subheader
            >
                <v-subheader>业务材料详情</v-subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>材料名称</v-list-item-title>
                        <v-list-item-subtitle v-if="!this.materialEditing">{{this.materials[this.selectedItem].material_name}}</v-list-item-subtitle>
                        <v-textarea
                                auto-grow
                                rows="1"
                                outlined
                                v-if="this.materialEditing"
                                :value="this.materials[this.selectedItem].material_name"
                                id="editMaterialName"
                                autocomplete="off"
                        ></v-textarea>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>材料描述</v-list-item-title>
                        <v-list-item-subtitle v-if="!this.materialEditing">{{this.materials[this.selectedItem].description}}</v-list-item-subtitle>
                        <v-textarea
                                auto-grow
                                rows="1"
                                outlined
                                v-if="this.materialEditing"
                                :value="this.materials[this.selectedItem].description"
                                id="editDescription"
                                autocomplete="off"
                        ></v-textarea>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>材料图片</v-list-item-title>
                        <v-avatar
                                class="ma-3"
                                size="125"
                                tile
                                v-if="!this.materialEditing && this.materials[this.selectedItem].photo_url"
                        >
                            <v-img :src="this.materials[this.selectedItem].photo_url"></v-img>
                        </v-avatar>
                        <v-textarea
                                auto-grow
                                rows="1"
                                outlined
                                v-if="this.materialEditing"
                                :value="this.materials[this.selectedItem].photo_url"
                                id="editPhotoUrl"
                                autocomplete="off"
                        ></v-textarea>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-btn
                            v-if="!this.materialEditing"
                            color="indigo"
                            text
                            @click="materialEditing = true"
                    >
                        编辑
                    </v-btn>
                    <v-btn
                            v-if="this.materialEditing"
                            color="indigo"
                            text
                            @click="editMaterial"
                    >
                        保存
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="indigo"
                            dark
                            @click="closeMaterialDialog"
                    >
                        关闭
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            text
                            color="indigo"
                            @click="deleteMaterial"
                    >
                        删除
                    </v-btn>
                </v-list-item>

            </v-list>
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
    import businessService from "../../service/businessService";
    import materialService from "../../service/materialService";

    export default {
        name: "Material",
        data: () => ({
            busId: "",
            selectedItem: -1,
            isEditing1: false,
            isEditing2: false,
            isEditing3: false,
            materialEditing: false,
            businessEditing: false,
            addMaterialDialog: false,
            detailDialog: false,
            business: {
                bus_id: "",
                bus_name: "",
                description: "",
                requirement: "",
                cost: "",
            },
            materials: [{
                material_id: "",
                description: "",
                photo_url: "",
                bus_id: "",
                material_name: "",
            }],
            valid: false,
            notCompleted: false,
        }),
        mounted: function() {
            this.loadBusinessDetail();
        },
        methods: {
            // 更新业务详情
            loadBusinessDetail() {
                let busId = this.$route.params.busId;
                // 获取业务
                businessService.getBusinessById(busId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return null;
                    }
                    this.business = res.data.data.business;
                }).catch((err) => {
                    alert(err);
                });
                // 获取业务材料
                materialService.getMaterials(busId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return null;
                    }
                    this.materials = res.data.data.materials;
                }).catch((err) => {
                    alert(err);
                });
            },

            editBusiness() {
                this.businessEditing = false;
                let busName = this.business.bus_name;
                let description = this.business.description;
                let requirement = this.business.requirement;
                let cost;
                if (this.business.cost) {
                    cost = this.business.cost.toString();
                } else {
                    cost = "0";
                }
                let busId = this.business.bus_id.toString();
                let deptId = this.business.dept_id.toString();
                if (document.getElementById("editBusName").value) {
                    busName = document.getElementById("editBusName").value;
                }
                if (document.getElementById("editBusDescription").value) {
                    description = document.getElementById("editBusDescription").value;
                }
                if (document.getElementById("editRequirement").value) {
                    requirement = document.getElementById("editRequirement").value;
                }
                if (document.getElementById("editCost").value.length > 0) {
                    cost = document.getElementById("editCost").value;
                }
                businessService.updateBusiness(busId, deptId, busName, description, requirement, cost).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        location.reload();
                    }
                }).catch((err) => {
                    alert(err);
                })
            },

            addMaterial() {
                if (!this.valid) {
                    this.notCompleted = true;
                    return null;
                }
                let busId = this.$route.params.id;
                let materialName = document.getElementById("materialName").value;
                let description = document.getElementById("materialDesc").value;
                let photoUrl = document.getElementById("photoUrl").value;
                materialService.addMaterial(materialName, description, photoUrl, busId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert("材料添加成功！");
                        location.reload();
                    }
                })
            },

            editMaterial() {
                this.materialEditing = false;
                let material = this.materials[this.selectedItem];
                if (document.getElementById("editMaterialName").value) {
                    material.material_name = document.getElementById("editMaterialName").value;
                }
                if (document.getElementById("editDescription").value) {
                    material.description = document.getElementById("editDescription").value;
                }
                if (document.getElementById("editPhotoUrl").value) {
                    material.photo_url = document.getElementById("editPhotoUrl").value;
                }
                let materialId = material.material_id.toString();
                let busId = material.bus_id.toString();
                let materialName = material.material_name;
                let description = material.description;
                let photoUrl = material.photo_url;
                materialService.updateMaterial(materialId, busId, materialName, description, photoUrl).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    }
                }).catch((err) => {
                    alert(err);
                })
            },

            deleteMaterial() {
                let r = confirm("确定要删除吗？");
                if (!r) return;
                let materialId = this.materials[this.selectedItem].material_id.toString();
                materialService.deleteMaterial(materialId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert("删除成功！");
                        location.reload();
                    }
                }).catch((err) => {
                    alert(err);
                })
            },

            deleteBusiness() {
                let r = confirm("确定要删除吗？");
                if (!r) return;
                let busId = this.$route.params.busId;
                businessService.deleteBusiness(busId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return;
                    }
                    alert(res.data.msg);
                    this.$router.go(-1);
                })
            },

            // 返回上一级
            lastPage() {
                this.$router.go(-1);
            },

            // 显示添加对话框
            toAddMaterial() {
                //this.addMaterialDialog = true;
                let busId = this.$route.params.busId;
                this.$router.push({ name: 'addMaterial', params: {'busId': busId}});
            },

            // 显示材料详情
            showMaterialDetail() {
                this.detailDialog = true;
            },

            customFilter (item, queryText) {
                return item.indexOf(queryText) > -1
            },

            closeMaterialDialog() {
                this.selectedItem = -1;
                this.detailDialog = false;
            },
        },

    }
</script>

<style scoped>

</style>
