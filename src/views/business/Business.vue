<template>
    <v-container fluid onload="updateBusinessTable()">
        <!-- 工具栏 -->
        <v-toolbar dense color="indigo" dark>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-toolbar-title>业务管理列表</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon @click="addDepartment">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-toolbar>

        <!-- 业务列表 -->
        <v-card class="px-5">
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
                                                <div v-text="item.dept_name"></div>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                <div v-text="item.location"></div>
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
                                            :id="item.dept_id"
                                            @click="deleteDepartment"
                                            outlined
                                    >
                                        删除部门
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
    import departService from "../../service/departService";

    export default {
        name: "business",
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
                dept_id: "",
                dept_name: "",
                description: "",
                location: "",
                work_time: "",
            }],
        }),
        mounted: function() {
            this.updateBusinessTable();
        },
        computed: {
            numberOfPages () {
                return Math.ceil(this.departments.length / this.itemsPerPage)
            },
        },
        methods: {
            // 添加部门
            addDepartment() {
                this.$router.push({ name: 'departAdd'});
            },
            // 删除部门
            deleteDepartment(event) {
                let r = confirm("确定要删除吗？");
                if (!r) return;

                let deptId = event.currentTarget.id;
                departService.deleteDepartment(deptId).then((res) => {
                    if (res.data.code === 200) {
                        alert("删除成功！");
                        location.reload();
                    } else {
                        alert(res.data.msg);
                    }
                }).catch((err) => {
                    alert(err);
                });
            },
            // 获取所有业务
            updateBusinessTable() {
                departService.getAllDepartment().then((res) => {
                    this.departments = res.data.data.departments;
                    this.showCards = true;
                }).catch((err) => {
                    alert(err);
                    return null;
                });
            },
            nextPage () {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage () {
                if (this.page - 1 >= 1) this.page -= 1
            },
        },
    }
</script>

<style scoped>

</style>
