<template>
  <div class="box">
    <div v-for="(q, index) in arr" :key="q._id" class="q_item">
      <div class="ques">
        {{ index + 1 }}、（分值:{{ q.score }}）{{ q.content }}
      </div>

      <ul class="options">
        <li v-if="q.type == 'single'">
          <a-radio-group size="small" direction="vertical">
            <a-radio
              :value="item[0]"
              style="margin: 5px"
              class="option-item"
              disabled
              v-for="(item, index) in q.selection"
              :key="index"
            >
              {{ item }}
            </a-radio>
          </a-radio-group>
        </li>
        <li v-else-if="q.type == 'judgement'">
          <a-radio-group direction="vertical" size="large">
            <a-radio value="0" class="option-item" disabled>对 </a-radio>
            <a-radio value="1" class="option-item" disabled> 错</a-radio>
          </a-radio-group>
        </li>
      </ul>

      <div class="aa">
        <span>正确答案:</span>
        <span v-if="q.type == 'judgement'">{{
          q.answer == 0 ? "错" : "对"
        }}</span>
        <span v-else>{{ q.answer }}</span>
      </div>
      <div class="bb">
        <span>你的答案:</span>
        <span v-if="q.type == 'judgement'">{{ q.an == 0 ? "错" : "对" }}</span>
        <span v-else>{{ q.an }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import useUserStore from "../../sotre/user-store";

import {
  getOnePaper,
  getQuestionOne,
  submitExam,
  getSInfo,
} from "../../apis/apis";
const questionsData = ref([]);
const userStore = useUserStore();
const route = useRoute();
const paperData = ref({});

onMounted(async () => {
  try {
    const res = await getOnePaper({
      id: route.query.id,
    });
    paperData.value = res.data.data;
    const pros = res.data.data._questions.map((item) =>
      getQuestionOne({
        id: item,
      })
    );
    const re = await Promise.all(pros);
    questionsData.value = re.map((item) => item.data.data);
  } catch (error) {
    console.log(error);
  }
});
const arr = computed(() => {
  const res = userStore.userInfo.exams.find(
    (item) => item._paper === route.query.id
  );
  const re = questionsData.value
    .map((item) => {
      const r = res.answers.find((i) => i._question === item._id);

      return {
        ...item,
        an: r?.answer,
      };
    })
    .filter((item) => {
      return item.answer !== item.an;
    });
  return re;
});
</script>

<style lang="scss" scoped>
.box {
  padding: 100px 30px 10px;
  font-size: 20px;
  width: 1100px;
  margin-right: 30px;
  padding: 0 20px;
  .q_item {
    margin-bottom: 20px;
  }
  .ques {
    margin-bottom: 10px;
  }
}
.aa {
  margin-bottom: 10px;
  color: rgb(55, 196, 149);
}
.bb {
  margin-bottom: 10px;
  color: rgb(196, 79, 55);
}
</style>
