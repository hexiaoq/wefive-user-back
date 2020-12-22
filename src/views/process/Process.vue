<template>
    <v-container fluid onload="loadProcess()">
        <!-- 工具栏 -->
        <v-toolbar dense color="indigo" dark>
            <v-btn icon @click="back">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title>业务流程管理</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar>
            <v-spacer></v-spacer>
            <v-btn
                    outlined
                    @click="addProcessDialog = true"
                    width="45%"
            >
                添加新流程
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                    width="45%"
                    outlined
                    @click="deleteProcess"
            >
                删除流程
            </v-btn>
            <v-spacer></v-spacer>
        </v-toolbar>

        <!-- 流程内容 -->
        <v-row v-if="showCards && processes">
            <v-col
                    cols="12"
                    v-for="(item, index) in processes"
                    :key="index"
            >
                <v-card>
                    <v-list
                            three-line
                    >
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>流程标题</v-list-item-title>
                                <v-list-item-subtitle v-if="isEditing !== index">{{item.title}}</v-list-item-subtitle>
                                <v-textarea
                                        auto-grow
                                        rows="1"
                                        outlined
                                        v-else
                                        :value="item.title"
                                        id="title"
                                        autocomplete="off"
                                ></v-textarea>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>流程描述</v-list-item-title>
                                <v-card-text v-if="isEditing !== index">{{item.content}}</v-card-text>
                                <v-textarea
                                        auto-grow
                                        rows="1"
                                        outlined
                                        v-else
                                        :value="item.content"
                                        id="content"
                                        autocomplete="off"
                                ></v-textarea>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-btn
                                    v-if="isEditing !== index"
                                    color="indigo"
                                    outlined
                                    @click="isEditing = index"
                                    width="100%"
                            >
                                编辑
                            </v-btn>
                            <v-btn
                                    v-else
                                    :id="item.process_id"
                                    color="indigo"
                                    dark
                                    @click="updateProcess"
                                    width="100%"
                            >
                                保存
                            </v-btn>
                        </v-list-item>
                    </v-list>

                    <v-divider class="mb-6"></v-divider>

                    <v-btn
                            text
                            color="indigo"
                            :id="item.process_id"
                            @click="toAddMaterial"
                    >添加新的流程材料</v-btn>

                    <v-btn
                            text
                            color="indigo"
                            :id="item.process_id"
                            @click="showAddOldMaterial"
                    >添加已有流程材料</v-btn>

                    <!-- 材料列表 -->
                    <v-list rounded>
                        <v-subheader>流程所需材料列表</v-subheader>
                        <v-list-item-group
                                v-model="selectedItem"
                                color="primary"
                                class="mb-12"
                        >
                            <v-list-item
                                    :id="index"
                                    v-for="(item1, i) in item.materials"
                                    :key="i"
                                    @click="showMaterialDetail"
                            >
                                <v-list-item-icon>
                                    <v-icon class="indigo--text">mdi-folder</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item1.material_name"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>

        <!-- 添加流程对话框 -->
        <v-dialog
                v-model="addProcessDialog"
                persistent
                max-width="80%"
        >
            <v-card>
                <v-card-text>
                    <v-subheader>为业务添加新流程</v-subheader>
                    <v-form v-model="valid">
                        <v-text-field
                                label="流程标题"
                                value=""
                                :rules="titleRules"
                                :counter="20"
                                class="my-3"
                                id="diaTitle"
                                autocomplete="off"
                        ></v-text-field>
                        <v-textarea
                                auto-grow
                                outlined
                                rows="2"
                                label="流程描述"
                                value=""
                                :rules="contentRules"
                                class="my-3"
                                id="diaContent"
                                autocomplete="off"
                        ></v-textarea>
                    </v-form>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="indigo"
                                outlined
                                class="mx-3"
                                @click="addProcessDialog = false"
                        >
                            取消
                        </v-btn>
                        <v-btn
                                color="indigo"
                                dark
                                class="mx-3"
                                @click="addProcess"
                        >
                            添加
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-row>

                </v-card-text>
            </v-card>
        </v-dialog>

         <!--为流程添加材料对话框-->
        <v-dialog
                v-model="addMaterialForProcessDialog"
                persistent
                max-width="80%"
        >
            <v-card>
                <v-card-text>
                    <v-subheader>为流程添加材料</v-subheader>
                    <v-autocomplete
                            v-model="processMaterials"
                            :items="materials"
                            outlined
                            chips
                            color="blue-grey lighten-2"
                            label="流程所需材料"
                            item-text="material_name"
                            item-value="material_id"
                            multiple
                    >
                        <template v-slot:selection="data">
                            <v-chip
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    close
                                    @click="data.select"
                                    @click:close="remove(data.item)"
                            >
                                <v-avatar left>
                                    <v-img :src="data.item.photo_url"></v-img>
                                </v-avatar>
                                {{ data.item.material_name }}
                            </v-chip>
                        </template>
                        <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                                <v-list-item-avatar>
                                    <img :src="data.item.photo_url" alt="">
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-html="data.item.material_name "></v-list-item-title>
                                </v-list-item-content>
                            </template>
                        </template>
                    </v-autocomplete>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="indigo"
                                outlined
                                class="mx-3"
                                @click="addMaterialForProcessDialog = false"
                        >
                            取消
                        </v-btn>
                        <v-btn
                                color="indigo"
                                dark
                                class="mx-3"
                                @click="addMaterialForProcess"
                        >
                            添加
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- 某个材料详情 -->
        <v-dialog
                persistent
                v-if="processes && processes[currentProcessIndex].materials && selectedItem >= 0"
                v-model="materialDetailDialog"
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
                        <v-list-item-subtitle>{{processes[currentProcessIndex].materials[selectedItem].material_name}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>材料描述</v-list-item-title>
                        <v-list-item-subtitle>{{processes[currentProcessIndex].materials[selectedItem].description}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>材料图片</v-list-item-title>
                        <v-avatar
                                class="ma-3"
                                size="125"
                                tile
                                v-if="processes[currentProcessIndex].materials[selectedItem].photo_url"
                        >
                            <v-img :src="processes[currentProcessIndex].materials[selectedItem].photo_url"></v-img>
                        </v-avatar>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="indigo"
                            width="45%"
                            dark
                            @click="closeMaterialDetailDialog"
                    >
                        关闭
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            :id="processes[currentProcessIndex].materials[selectedItem].material_id"
                            text
                            width="45%"
                            color="indigo"
                            @click="deleteProcessMaterial"
                    >
                        删除
                    </v-btn>
                    <v-spacer></v-spacer>
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
    import processService from "../../service/processService";
    import materialService from "../../service/materialService";

    export default {
        name: "Process",
        data () {
            return {
                showCards: false,
                notCompleted: false,
                valid: false,
                selectedItem: -1,
                isEditing: -1,
                addProcessDialog: false,
                addMaterialForProcessDialog: false,
                materialDetailDialog: false,
                currentProcessId: 0,
                currentProcessIndex: 0,
                processes: [{
                    process_id: "",
                    bus_id: "",
                    title: "",
                    content: "",
                    step: "",
                    materials: [{
                        material_id: "",
                        description: "",
                        photo_url: "",
                        bus_id: "",
                        material_name: "",
                    }],
                }],
                titleRules: [
                    v => !!v || '流程标题不能为空',
                    v => v.length < 100 || '不能超过100字符',
                ],
                contentRules: [
                    v => !!v || '流程描述不能为空',
                    v => v.length < 1024 || '不能超过1024字符',
                ],
                processMaterials: [],
                materials: [{
                    material_id: "",
                    description: "",
                    photo_url: "",
                    bus_id: "",
                    material_name: "",
                }],
            }
        },
        mounted: function() {
            this.loadProcess();
        },
        methods: {
            loadProcess() {
                let busId = this.$route.params.busId;
                processService.getAllProcessOfBus(busId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.processes = res.data.data.processes;
                        console.log(res.data.data.processes);
                        this.showCards = true;
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            updateProcess(event) {
                this.isEditing = -1;
                let processId = event.currentTarget.id;
                console.log(processId);
            },

            // 为流程添加已有材料
            showAddOldMaterial(event) {
                this.currentProcessId = event.currentTarget.id;
                this.addMaterialForProcessDialog = true;
                let busId = this.$route.params.busId;
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

            // 为流程添加新的图片
            toAddMaterial(event) {
                let busId = this.$route.params.busId;
                let processId = event.currentTarget.id;
                this.$router.push({ name: 'addMaterial', params: {'busId': busId, 'processId': processId}});
            },

            // 为流程添加材料
            addMaterialForProcess() {
                if (this.processMaterials.length === 0) {
                    this.notCompleted = true;
                    return null;
                }

                let processId = this.currentProcessId;
                processService.addProcessMaterials(processId, this.processMaterials).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert(res.data.msg);
                        location.reload();
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            // 显示材料详情
            showMaterialDetail(event) {
                this.currentProcessIndex = event.currentTarget.id;
                this.currentProcessId = this.processes[event.currentTarget.id].process_id;
                this.materialDetailDialog = true;
            },

            addProcess() {
                if (!this.valid) {
                    this.notCompleted = true;
                    return null;
                }

                let busId = this.$route.params.busId;
                let title = document.getElementById("diaTitle").value;
                let content = document.getElementById("diaContent").value;
                let step;
                if (this.processes) {
                    step = this.processes.length + 1;
                } else {
                    step = 1;
                }

                processService.addProcessForBus(busId, title, content, step.toString()).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert("流程添加成功！");
                        this.addProcessDialog = false;
                        location.reload();
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            deleteProcess() {
                let r = confirm("确定要删除吗？");
                if (!r) return;
                let busId = this.$route.params.busId;
                processService.deleteProcess(busId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert(res.data.msg);
                        location.reload();
                    }
                }).catch((err) => {
                    alert(err);
                })
            },

            deleteProcessMaterial(event) {
                let r = confirm("确定要删除吗？");
                if (!r) return;
                let materialId = event.currentTarget.id;
                let processId = this.currentProcessId;
                processService.deleteProcessMaterial(processId.toString(), materialId.toString()).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert(res.data.msg);
                        location.reload();
                    }
                }).catch((err) => {
                    alert(err);
                })
            },

            back() {
                this.$router.go(-1);
            },

            remove (item) {
                const index = this.processMaterials.indexOf(item.material_id);
                if (index >= 0) this.processMaterials.splice(index, 1)
            },

            closeMaterialDetailDialog() {
                this.materialDetailDialog = false;
                this.selectedItem = -1;
            }
        }
    }
</script>

<style scoped>

</style>
