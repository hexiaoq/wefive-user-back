<template>
  <v-app>
    <!-- Gover -->
    <div
            v-if="this.$route.name!=='loginAdmin' &&
             this.$route.name!=='init' &&
             this.$route.name!=='login' &&
             this.$route.name!=='app' &&
             !this.$store.state.adminModule.adminInfo"
    >
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title id="mainTitle" style="display: block">指尖武汉后台管理服务系统</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer
              v-model="drawer"
              app
      >
        <v-sheet
                color="grey lighten-4"
                class="pa-4"
        >
          <v-avatar
                  class="mb-4 ml-10"
                  color="indigo"
                  size="64"
          ></v-avatar>

          <div>政府部门用户：{{this.$store.state.goverModule.goverInfo.phone}}</div>
          <div>当前部门：{{this.$store.state.goverModule.goverInfo.dept_name}}</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
                  link
                  @click="toBusiness"
          >
            <v-list-item-icon>
              <v-icon color="indigo">mdi-inbox-arrow-down</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>业务信息</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
                  link
                  @click="toComment"
          >
            <v-list-item-icon>
              <v-icon color="indigo">mdi-message-text</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>在线咨询</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
                  link
                  @click="logoutGover"
          >
            <v-list-item-icon>
              <v-icon color="indigo">mdi-message-text</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>退出登录</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <!-- Admin -->
    <div
            v-if="this.$route.name!=='loginAdmin' &&
             this.$route.name!=='init' &&
             this.$route.name!=='login' &&
             this.$route.name!=='app' &&
             this.$store.state.adminModule.adminInfo"
    >
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title style="display: block">指尖武汉后台管理服务系统</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer
              v-model="drawer"
              app
      >
        <v-sheet
                color="grey lighten-4"
                class="pa-4"
        >
          <v-avatar
                  class="mb-4 ml-10"
                  color="indigo"
                  size="64"
          ></v-avatar>

          <div>欢迎您！系统管理员: {{this.$store.state.adminModule.adminInfo.name}}</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
                  link
                  @click="toDepartment"
          >
            <v-list-item-icon>
              <v-icon color="indigo">mdi-inbox-arrow-down</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>部门管理</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
                  link
                  @click="toGovernorTable"
          >
            <v-list-item-icon>
              <v-icon color="indigo">mdi-message-text</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>人员管理</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
                  link
                  @click="logoutAdmin"
          >
            <v-list-item-icon>
              <v-icon color="indigo">mdi-message-text</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>退出登录</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  props: {
    source: String,
  },
  data: () => ({
    cards: ['2020/11/19 办理记录'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', '业务信息'],
      ['mdi-domain', '部门信息'],
      ['mdi-message-text', '在线咨询'],
    ],
  }),
  components: {

  },
  methods: {
    toBusiness() {
      let deptId = this.$store.state.goverModule.goverInfo.dept_id;
      // 携带部门参数
      this.$router.push({ name: 'businessTable', params: {'deptId': deptId}});
    },
    toComment() {
      let deptId = this.$store.state.goverModule.goverInfo.dept_id;
      this.$router.push({ name: 'comment' , params: {'busId' : deptId}});
    },
    toDepartment() {
      this.$router.push({ name: 'departTable' });
    },
    toGovernorTable() {
      this.$router.push({ name: 'goverTable' })
    },
    // 管理员登出
    logoutAdmin() {
      // 跳转登录页
      this.$router.replace({ name: 'init' });
      // 清除用户信息
      this.$store.dispatch('adminModule/logoutAdmin');
    },
    // 政府人员登出
    logoutGover() {
      // 跳转登录页
      this.$router.replace({ name: 'init' });
      // 清除用户信息
      this.$store.dispatch('goverModule/logoutGover');
    },
  },
};
</script>
<style scoped>

</style>
