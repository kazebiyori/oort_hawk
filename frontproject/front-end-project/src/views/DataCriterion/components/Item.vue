<template>
  <div class="item">
    <div class="left">
      <label>数据一</label>
      <br>
      <img src="@/assets/plane.svg" alt="飞机">
    </div>

    <div class="right">
      <label style="color:#5191EB;font-size:x-large">GS型飞机</label> <label>编号：<l style="color:#5191EB;">2222</l>
      </label>
      <p>
        发动机型号：999    发动机编号：001
        <br>
        试飞类型：<span style="color:red">启动</span>    试飞时间：2021.09.06
      </p>

    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCriterionItem'
}
</script>

<style lang="scss" scoped>
img {
  width: 40px;
  position: relative;
  //top: 3px;
}

.item {
  border: 1px solid pink;
  margin: 10px;


  & .left {
    text-align: center;
    display: inline-block;
    margin: 5px auto;

    width: 25%;
    height: 100%;
  }

  & .right {
    display: inline-block;
    text-align: center;

    //vertical-align: top;
    width: 75%;

    margin: 5px auto;
  }


}

:deep(p) {
  margin: 5px;
}

span {
  color: red;
}
</style>
