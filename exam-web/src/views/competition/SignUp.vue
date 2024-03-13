<template>
  <div>
    <a-input
      placeholder="关键词查询"
      v-model="search"
      style="width: 400px; margin-bottom: 10px"
    />
    <a-row :gutter="[15, 15]" class="course-list">
      <a-col
        :xs="24"
        :sm="12"
        :xl="8"
        :xxl="6"
        v-for="item in data"
        :key="item._id"
        @click="fetchSignupExam(item._id)"
      >
        <div class="course-item">
          <div class="course-picture">
            <a-image
              width="100%"
              style="object-fit: cover"
              height="100%"
              :preview="false"
              src="/src/assets/img/login_bg.jpg"
            />
          </div>
          <div class="course-info">
            <h3 class="title">{{ item.name }}</h3>
            <p class="author">
              开始时间：
              {{ dayjs(item.startTime).format("YYYY-MM-DD HH:mm:ss") }}
            </p>
            <p class="author">状态：竞赛未开始</p>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { getPaperAll, signupExam, getSInfo } from "../../apis/apis";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { Notification } from "@arco-design/web-vue";
import useUserStore from "../../sotre/user-store";

const search = ref("");
const data = ref([]);
const router = useRouter();
const userStore = useUserStore();

watchEffect(() => {
  getTable();
});

async function getTable() {
  const res = await getPaperAll({
    content: search.value,
  });
  //   console.log(res);
  //   res.data.data.forEach((item) => {
  //     const res = getStatus(item);
  //     if (res === "竞赛进行中") {
  //       Notification.warning({
  //         title: "竞赛开始提醒",
  //         content: `${item.name} 竞赛已开始，请尽快开始答题`,
  //         closable: true,
  //         duration: 100000,
  //       });
  //     }
  //   });
  data.value = res.data.data.filter((item) => {
    return dayjs(item.startTime) > dayjs();
  });
}
async function fetchSignupExam(id) {
  try {
    const res = await signupExam({
      stuId: userStore.userInfo._id,
      paperId: id,
    });
    if (res.data.status == 0) {
      Message.success("报名成功！");
      getTable();

      const r = await getSInfo({
        id: userStore.userInfo._id,
      });
      userStore.userInfo = r.data.data;
    } else {
      Message.error(res.data.msg);
    }
  } catch (error) {}
}
</script>

<style lang="scss" scoped>
.course-item {
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid var(--color-border-2);
  transition: all 0.3s;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  .course-picture {
    img {
      transition: all 0.3s;
      width: 100%;
      height: 100%;
      aspect-ratio: 2 / 1;
    }
  }
  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    .course-picture {
      .course-opera {
        height: 100%;
      }
      img {
        transform: scale(1.05);
        filter: blur(2px);
      }
    }
  }

  .course-picture {
    height: 160px;
    position: relative;
    .course-opera {
      position: absolute;
      top: 0px;
      right: 0px;
      height: 0;
      left: 0;
      bottom: 0;
      overflow: hidden;
      transition: height 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      span {
        font-size: 14px;
        display: inline-block;
        height: 50px;
        width: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 30px;
        color: var(--color-text-1);
        background-color: var(--color-bg-1);
        font-weight: bold;
        margin: 0 5px;
        &:hover {
          background-color: var(--color-fill-2);
        }
      }
    }
  }
  .course-info {
    padding: 10px;
    .title {
      margin: 10px 0;
      color: var(--color-text-1);
    }

    .author {
      margin: 10px 0;
      color: var(--color-text-2);
    }
  }
}
</style>
