<template>
    <v-container fluid onload="updateBusinessTable()">
        <!-- 工具栏 -->
        <v-toolbar dense color="indigo" dark>
            <v-btn icon @click="back">
                <v-icon>mdi-reply</v-icon>
            </v-btn>


            <v-toolbar-title>业务管理列表</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-toolbar>

        <!-- 业务列表 -->
        <v-card class="px-5">
            <v-btn outlined color="indigo" @click="addBusiness" large class="ma-3">添加新业务</v-btn>
            <v-btn outlined color="indigo" @click="addBusFromTemplate" large class="ma-3">从模板中添加新业务</v-btn>
            <v-divider class="my-3"></v-divider>
            <v-data-iterator
                    :items="businesses"
                    :items-per-page.sync="itemsPerPage"
                    :page="page"
                    :search="search"
                    :sort-by="sortBy.toLowerCase()"
                    :sort-desc="sortDesc"
                    hide-default-footer
            >
                <!-- Projects Info cards -->
                <template v-slot:default="props">
                    <v-row v-if="showCards">
                        <v-col
                                v-for="(item, index) in props.items"
                                :key="index"
                                cols="12"
                                sm="6"
                                md="4"
                                lg="3"
                        >
                            <v-card>
                                <v-list three-line>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <div v-text="item.bus_name"></div>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                <div v-text="item.requirement"></div>
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle>
                                                <div v-if="item.cost" v-text="'所需费用￥'+item.cost"></div>
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>

                                <!-- Project Menu -->
                                <v-card-actions>
                                    <v-btn
                                            icon
                                            @click=" showDetail === index ? showDetail = -1 : showDetail = index "
                                    >
                                        <v-icon>{{ showDetail === index || showDetail === -2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="indigo"
                                            :id="item.bus_id"
                                            @click="businessProcess"
                                            text
                                    >
                                        业务流程
                                    </v-btn>
                                    <v-btn
                                            color="indigo"
                                            :id="item.bus_id"
                                            @click="editMaterial"
                                            text
                                    >
                                        业务详情
                                    </v-btn>


                                </v-card-actions>
                                <!-- Project Expansion -->
                                <v-expand-transition>
                                    <div v-show="showDetail === index || showDetail === -2">
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <div v-text="item.description"></div>
                                        </v-card-text>
                                    </div>
                                </v-expand-transition>


                            </v-card>
                        </v-col>
                    </v-row>
                </template>

                <!-- Footer -->
                <template v-slot:footer>
                    <v-row class="mt-2 ml-1" align="center" justify="center">

                        <v-spacer></v-spacer>

                        <span
                                class="mr-4 grey--text"
                        >
                             {{ page }} / {{ numberOfPages }}
                        </span>
                        <v-btn
                                text
                                fab
                                dark
                                color="indigo"
                                class="mr-1"
                                small
                                @click="formerPage"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                                text
                                fab
                                dark
                                small
                                color="indigo"
                                class="ml-1"
                                @click="nextPage"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-card>
    </v-container>
</template>

<script>
    import businessService from "../../service/businessService";

    export default {
        name: "BusinessTable",
        data: () => ({
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 8,
            sortBy: 'name',
            keys: [
                'Name',
                'Total',
                'Donations',
            ],
            showDetail: false,
            showCards: false,
            businesses: [{
                bus_id: "",
                bus_name: "",
                description: "",
                requirement: "",
                cost: "",
            }],
        }),
        mounted: function() {
            this.updateBusinessTable();
        },
        computed: {
            numberOfPages () {
                return Math.ceil(this.businesses.length / this.itemsPerPage)
            },
        },
        methods: {
            updateBusinessTable() {
                //let deptId = this.$store.state.goverModule.goverInfo.dept_id;
                let deptId = this.$route.params.deptId;
                businessService.getAllBusinessByDeptId(deptId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return;
                    }
                    this.businesses = res.data.data.businesses;
                    this.showCards = true;
                }).catch((err) => {
                    alert(err);
                    return null;
                });
            },

            addBusiness() {
                let deptId = this.$route.params.deptId;
                this.$router.push({ name: 'businessAdd', params: {'deptId': deptId}});
            },

            addBusFromTemplate() {
                let deptId = this.$route.params.deptId;
                this.$router.push({ name: 'busAddTemplate', params: {'deptId': deptId}});
            },

            deleteBusiness(event) {
                let r = confirm("确定要删除吗？");
                if (!r) return;
                let busId = event.currentTarget.id;
                //let deptName = this.$store.state.goverModule.goverInfo.dept_name;
                businessService.deleteBusiness(busId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert("删除业务成功！");
                        location.reload();
                    }

                }).catch((err) => {
                    alert(err);
                })
            },

            editMaterial(event) {
                // 携带业务id
                let busId = event.currentTarget.id;
                // 跳转材料页面
                this.$router.push({ name: 'material', params: {'busId': busId}});
            },

            businessProcess(event) {
                let busId = event.currentTarget.id;
                // 跳转材料页面
                this.$router.push({ name: 'process', params: {'busId': busId}});
            },

            nextPage () {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage () {
                if (this.page - 1 >= 1) this.page -= 1
            },

            back() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>

</style>
