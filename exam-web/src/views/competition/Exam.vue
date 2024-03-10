<template>
  <div class="exam">
    <div class="left">
      <div v-for="(q, index) in questionsData" :key="q._id" class="q_item">
        <div class="ques">
          {{ index + 1 }}、（分值:{{ q.score }}）{{ q.content }}
        </div>

        <ul class="options">
          <li v-if="q.type == 'single'">
            <a-radio-group
              size="small"
              v-model="answer[q._id]"
              direction="vertical"
            >
              <a-radio
                :value="item[0]"
                style="margin: 5px"
                class="option-item"
                v-for="(item, index) in q.selection"
                :key="index"
              >
                {{ item }}
              </a-radio>
            </a-radio-group>
          </li>
          <li v-else-if="q.type == 'judgement'">
            <a-radio-group
              v-model="answer[q._id]"
              direction="vertical"
              size="large"
            >
              <a-radio value="0" class="option-item">对 </a-radio>
              <a-radio value="1" class="option-item"> 错</a-radio>
            </a-radio-group>
          </li>
          <li v-else class="SUBJECTIVE">
            <a-form-item label="答：">
              <a-textarea v-model="answer[q._id]" />
            </a-form-item>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div>竞赛名称：{{ paperData.name }}</div>
      <div>总分：{{ paperData.totalPoints }}分</div>
      <div>开始时长：{{ paperData.time }}分钟</div>
      <div>剩余时间：{{ dayjs(endDate - nowDate).format("hh:mm:ss") }}</div>
      <a-button type="primary" @click="submit">提交</a-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import {
  getOnePaper,
  getQuestionOne,
  submitExam,
  getSInfo,
} from "../../apis/apis";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import dayjs from "dayjs";
import useUserStore from "../../sotre/user-store";
import { Message } from "@arco-design/web-vue";

const route = useRoute();
const userStore = useUserStore();
const paperData = ref({});
const questionsData = ref([]);
const answer = ref({});
const isSubmit = ref(false);
const endDate = ref(dayjs());
const nowDate = ref(dayjs());

setInterval(() => {
  nowDate.value = dayjs();
  if (nowDate.value >= endDate) {
    Message.success("考试时间结束，请自动提交试卷");
    subExam();
  }
});

watchEffect(async () => {
  try {
    const res = await getOnePaper({
      id: route.params.id,
    });
    paperData.value = res.data.data;
    const pros = res.data.data._questions.map((item) =>
      getQuestionOne({
        id: item,
      })
    );
    endDate.value = dayjs().minute(res.data.data.time);
    const re = await Promise.all(pros);
    questionsData.value = re.map((item) => item.data.data);
    console.log(questionsData.value);
  } catch (error) {}
});

async function submit() {
  if (!window.confirm("确认要提交试卷吗？")) {
    return;
  }
  subExam();
}

async function subExam() {
  const stuId = userStore.userInfo._id;
  const answers = [];
  let score = 0;

  for (const key in answer.value) {
    answers.push({
      _question: key,
      answer: answer.value[key],
    });

    const r = questionsData.value.find((item) => item._id === key);
    if (r.answer === answer.value[key]) {
      score += +r.score;
    }
  }

  try {
    const res = await submitExam({
      stuId,
      id: paperData.value._id,
      score,
      startTime: paperData.value.startTime,
      answers,
      date: new Date(),
      examName: paperData.value.name,
    });
    isSubmit.value = true;
    Message.success("提交成功");
    console.log(userStore.userInfo);
    const r = await getSInfo({
      id: userStore.userInfo._id,
    });
    userStore.userInfo = r.data.data;
  } catch (error) {
    Message.error("提交失败");
  }
}

onBeforeRouteLeave(async (to, from) => {
  if (isSubmit.value) return true;
  const answer = window.confirm("离开页面将自动提交试卷");
  // 取消导航并停留在同一页面上
  if (!answer) return false;

  await subExam();

  return true;
});
</script>

<style lang="scss" scoped>
.exam {
  width: 100vw;
  height: 100%;
  padding: 100px 30px 10px;
  display: flex;
  align-items: flex-start;
  .left {
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

  .right {
    font-size: 18px;
    background-color: #0088cc39;
    width: 300px;
    padding: 13px;
    // height: 200px;
    border-radius: 20px;
    div {
      margin-bottom: 20px;
    }
  }
}
</style>
