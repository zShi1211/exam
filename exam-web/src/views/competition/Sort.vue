<template>
  <div>
    <h1 class="name">竞赛名称：{{ route.query.name }}</h1>

    <a-table :columns="columns" :data="data">
      <template #optional="{ rowIndex }">
        {{ rowIndex + 1 }}
      </template>
    </a-table>

    <div class="comment">
      <div class="input_box">
        <a-textarea placeholder="说你想说~" allow-clear v-model="commentVal" />
        <a-button type="primary" @click="fetchAddComment">发布</a-button>
      </div>

      <a-comment
        v-for="item in commentList"
        :key="item.time"
        :author="item.name"
        :content="item.content"
        :datetime="dayjs(item.time).format('YYYY-MM-DD HH:mm')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import {
  getPaperAll,
  deletePaper,
  getStuAll,
  addComment,
  getOnePaper,
} from "@/apis/apis.js";
import { Message } from "@arco-design/web-vue";
import { useRoute } from "vue-router";
import useUserStore from "../../sotre/user-store";
import dayjs from "dayjs";
const userStore = useUserStore();

const route = useRoute();
const commentVal = ref("");
const data = ref([]);
const commentList = ref([]);
const columns = [
  {
    title: "排名",
    slotName: "optional",
  },
  {
    title: "学生",
    dataIndex: "username",
  },
  {
    title: "分数",
    dataIndex: "score",
  },
  {
    title: "提交时间",
    dataIndex: "date",
  },
  //   {
  //     title: "操作",
  //   },
];
watchEffect(() => {
  getTable();
  getCommentList();
});

async function getTable() {
  const res = await getStuAll();
  //   console.log(res);

  const r = res.data.data.filter((item) => {
    const a = item.exams.find((i) => {
      return i._paper === route.query.id;
    });
    if (a) {
      return true;
    } else {
      return false;
    }
  });

  const dataT = r.map((item) => {
    const a = item.exams.find((i) => {
      return i._paper === route.query.id;
    });
    return {
      username: item.username,
      date: a.date,
      score: a.score,
    };
  });
  data.value = dataT;
}

async function getCommentList() {
  const res = await getOnePaper({
    id: route.query.id,
  });
  if (res.data.status === 0) {
    commentList.value = res.data.data.comment;
  }
}
async function fetchAddComment() {
  if (commentVal.value === "") {
    Message.error("评论不能为空！");
    return;
  }
  const res = await addComment({
    commentData: {
      name: userStore.userInfo.nickname,
      time: new Date(),
      content: commentVal.value,
    },
    paperId: route.query.id,
  });
  if (res.data.status === 0) {
    Message.success("评论成功！");
    getCommentList();
    commentVal.value = "";
  } else {
    Message.error("评论失败！");
  }
}
</script>

<style lang="scss" scoped>
.name {
  margin-bottom: 20px;
}
.comment {
  margin-top: 20px;
}
.input_box {
  margin-bottom: 10px;
}
</style>
