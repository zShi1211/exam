<template>
  <div>
    <h1 class="name">竞赛名称：{{ route.query.name }}</h1>

    <a-table :columns="columns" :data="data">
      <template #optional="{ rowIndex }">
        {{ rowIndex + 1 }}
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { getPaperAll, deletePaper, getStuAll } from "@/apis/apis.js";
import { Message } from "@arco-design/web-vue";
import { useRoute } from "vue-router";
const route = useRoute();

const data = ref([]);
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

async function ondelete(record) {
  //   console.log(record);
  const res = await deletePaper({
    id: record._id,
  });
  Message.success("成功");
  //   console.log(res);
  getTable();
}
</script>

<style lang="scss" scoped>
.name {
  margin-bottom: 20px;
}
</style>
