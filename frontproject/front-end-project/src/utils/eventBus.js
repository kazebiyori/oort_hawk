import mitt from "mitt";
export const emitter = mitt();

// 更新数据统计数据源
// bus.on("getNewStatistics", myChart.value.hiddenLoading)
// 获取完毕数据源
// bus.on("finishNewStatistics", myChart.value.hiddenLoading)
// emitter.emit("groupByEngineType", {})
// emitter.emit("groupByPlaneType", {})

// 初始化侧边栏数据
// initFilterPane
// 传输过滤信息消息
// filterData
