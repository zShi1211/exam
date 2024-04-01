<template>
  <div class="home-wrap">
    <!-- 介绍区 -->
    <!-- <div class="home-introduce">
            <img src="@/assets/img/home-introduce-bg.png"/>
        </div> -->
    <div class="home-function">
      <!-- 侧边栏 -->
      <a-menu
        class="home-list home-list-info"
        mode="pop"
        v-model:selected-keys="selectedKeys"
        show-collapse-button
        breakpoint="xl"
      >
        <!-- <a-menu-item
          style="padding: 0px"
          class="collapsed-hidden"
          v-if="currPage == 'course'"
        >
          <div class="course-wrap" v-if="courseStore.courseInfo">
            <div class="course-detail">
              <a-image
                fit="cover"
                width="100%"
                height="100%"
                v-loadImg
                :src="courseStore.courseInfo.cover"
                class="cover"
              />
              <p type="text" class="btn">
                课程详情
                <icon-right-circle style="margin: 0" />
              </p>
              <!-- <span class="name">{{ courseStore.courseInfo.name }}</span> -->
        <!--    </div>
            <h1 class="course-name">{{ courseStore.courseInfo.name }}</h1>
          </div>
          <div class="course-wrap" v-else>
            <div class="course-detail">
              <a-skeleton-shape
                animation
                width="100%"
                height="100%"
                v-loadImg
                :src="courseStore.courseInfo.cover"
                class="cover"
              />
              <p type="text" class="btn">
                课程详情
                <icon-right-circle style="margin: 0" />
              </p>
              <!-- <span class="name">{{ courseStore.courseInfo.name }}</span> -->
        <!--   </div>
            <h1 class="course-name">{{ courseStore.courseInfo.name }}</h1>
          </div>
        </a-menu-item> -->
        <template v-for="(item, index) in navList" :key="item.key">
          <a-menu-item @click="toLink(item)" v-if="item.visble" :key="item.key">
            <template #icon v-if="item.icon">
              <component :is="item.icon" />
            </template>
            {{ item.name }}
          </a-menu-item>
        </template>
      </a-menu>
      <!-- 课程 -->
      <div class="home-content home-common">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, shallowRef, watchEffect, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useUserStore from "../../sotre/user-store";
import {
  IconApps,
  IconSelectAll,
  IconStorage,
  IconBookmark,
  IconNotification,
} from "@arco-design/web-vue/es/icon";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const selectedKeys = ref([]);
if (!userStore.userInfo) {
  router.push({
    name: "Login",
  });
}

const toLink = (item) => {
  router.push({
    name: item.key,
  });
};
const homeList = [];

const stuList = [
  {
    name: "竞赛列表",
    icon: IconBookmark,
    key: "attend-competition-list",
    params: {},
    visble: true,
  },
  {
    name: "已报名竞赛",
    icon: IconBookmark,
    key: "stu-competition-list",
    params: {},
    visble: true,
  },
  {
    name: "已完成竞赛",
    icon: IconBookmark,
    key: "end-competition-list",
    params: {},
    visble: true,
  },
];
const teacherList = [
  {
    name: "题库列表",
    icon: IconApps,
    key: "question-list",

    visble: true,
  },
  {
    name: "添加题目",
    icon: IconSelectAll,
    key: "question-add",
    visble: true,
  },
  {
    name: "竞赛列表",
    icon: IconBookmark,
    key: "competition-list",
    params: {},
    visble: true,
  },
  {
    name: "添加竞赛",
    icon: IconStorage,
    key: "competition-add",
    params: {},
    visble: true,
  },

  {
    name: "已结束竞赛",
    icon: IconBookmark,
    key: "tend-competition-list",
    params: {},
    visble: true,
  },
  {
    name: "用户管理",
    icon: IconBookmark,
    key: "UserOperate",
    params: {},
    visble: true,
  },
];
const navList = shallowRef([]);
const checkNav = () => {
  if (userStore.userInfo?.type == 0) {
    navList.value = stuList;
  } else {
    navList.value = teacherList;
  }
};
onMounted(() => {
  checkNav();
  router.push({
    name: navList.value[0]?.key,
  });
});
watchEffect(() => {
  selectedKeys.value = [route.name];
});
</script>
<style lang="less" scoped>
:deep(.arco-menu .arco-menu-collapse-button) {
  border-radius: 50%;
}

:deep(.arco-page-header) {
  position: sticky;
  top: -20px;
  background-color: var(--color-menu-light-bg);
  z-index: 1;
}

:deep(.arco-menu) {
  margin: 0 10px;
  background-color: var(--color-menu-light-bg);
  border-radius: 10px;
  padding: 20px;
}

:deep(.arco-menu-collapsed) {
  padding: 0;

  .collapsed-hidden {
    display: none;
  }
}

.home-wrap {
  padding-top: 72px;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-border-1);
  overflow-y: hidden;

  .home-common {
    margin: 0 10px;
    background-color: var(--color-menu-light-bg);
    border-radius: 10px;
    padding: 20px;
  }

  .home-introduce {
    height: 150px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: inherit;
    }
  }

  .home-function {
    flex-grow: 1;
    display: flex;
    padding: 10px 0;
    overflow: hidden;
  }

  .home-list {
    max-width: 200px;
    transition: width 0.2s;
    height: 100%;
    box-sizing: border-box;

    .course-wrap {
      .course-detail {
        height: 80px;
        position: relative;
        overflow: hidden;

        .cover {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .btn {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.2);
          height: 25px;
          line-height: 25px;
          font-size: 12px;
        }
      }

      .course-name {
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: normal;
      }
    }

    .home-list-info {
      overflow-y: auto;
    }
  }

  .home-content {
    overflow-y: auto;
    width: 100%;
    margin-left: 0;
  }
  .footer {
    text-align: center;
    color: var(--color-text-3);
    font-size: 16px;
    padding: 10px;
  }
}
</style>
