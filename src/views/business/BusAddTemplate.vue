<template>
    <v-container onload="loadAllBusinesses()">
        <v-card>
            <v-card-text>
                <v-subheader>从业务模板中添加新业务</v-subheader>
                <v-form v-model="valid">
                    <v-autocomplete
                            :items="businesses"
                            color="indigo"
                            label="已有业务列表"
                            item-text="name"
                            item-value="name"
                            id="business"
                            :filter="customFilter"
                            :rules="notNullRules"
                    >
                    </v-autocomplete>
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
                            @click="addBusTemplate"
                    >
                        添加
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-row>

            </v-card-text>
        </v-card>
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
        name: "BusAddTemplate",
        data () {
            return {
                valid: false,
                notCompleted: false,
                notNullRules: [
                    v => !!v || '此项不能为空',
                ],
                businesses: [],
            }
        },
        mounted: function() {
            this.loadAllBusinesses();
        },
        methods: {
            loadAllBusinesses() {
                // 获取所有部门
                businessService.getAllBusinesses().then((res) => {
                    this.businesses = new Array(res.data.data.businesses.length);
                    for (let i = 0; i < res.data.data.businesses.length; i++) {
                        this.businesses[i] = res.data.data.businesses[i].bus_name;
                    }
                }).catch((err) => {
                    alert(err);
                    return null;
                });
            },
            customFilter (item, queryText) {
                return item.indexOf(queryText) > -1
            },

            // 添加一个已有业务，包括其中的流程和材料
            addBusTemplate() {
                if (!this.valid) {
                    this.notCompleted = true;
                    return;
                }
                let deptId = this.$route.params.deptId;
                let busName = document.getElementById("business").value;
                businessService.addBusFromTemplate(busName, deptId.toString()).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return null;
                    }
                    alert(res.data.msg);
                    this.back();
                }).catch((err) => {
                    alert(err);
                })
            },
            back() {
                this.$router.go(-1);
            }
        },

    }
</script>

<style scoped>

</style>
