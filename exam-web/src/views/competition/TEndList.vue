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
        @click="
          router.push({
            name: 'sort-list',
            query: {
              id: item._id,
              name: item.name,
            },
          })
        "
      >
        <div class="course-item">
          <div class="course-picture">
            <a-image
              width="100%"
              style="object-fit: cover"
              height="100%"
              src="/src/assets/img/login_bg.jpg"
              show-loader
            />
          </div>
          <div class="course-info">
            <h3 class="title">{{ item.name }}</h3>
            <p class="author">
              开始时间：
              {{ dayjs(item.startTime).format("YYYY-MM-DD hh:mm:ss") }}
            </p>
            <p class="author">状态： 竞赛已结束</p>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { getPaperAll } from "../../apis/apis";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
const search = ref("");
const data = ref([]);
const router = useRouter();
watchEffect(() => {
  getTable();
});

async function getTable() {
  const res = await getPaperAll({
    content: search.value,
  });
  data.value = res.data.data.filter((item) => {
    return dayjs(item.startTime).add(item.time, "minute") < dayjs();
  });
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
      color: var(--color-text-2);
      margin: 10px 0;
    }
  }
}
</style>
