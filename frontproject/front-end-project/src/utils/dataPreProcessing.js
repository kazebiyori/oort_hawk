function transformSource2Display(rowData) {
  let result = [];
  rowData.forEach((item) => {
    result.push({
      id: item.id,
      dataId: item.dataId,
      testTimeStart: item.testTimeStart,
      planeModel: item,
      planeModel,
      planeId: item.planeId,
    });
  });
}

// 将扁平数据转化为树状数据
export function getGroupForm(data, groupKey, labelKey) {
  // 获取所有组名称
  let groupTypes = {};
  data.forEach((item) => {
    groupTypes[item[groupKey]] = [];
  });

  //
  data.forEach((item) => {
    groupTypes[item[groupKey]].push(item);
  });

  // 输出结果
  let result = [];
  for (let item in groupTypes) {
    let json = {};
    json[labelKey] = item;
    json["children"] = groupTypes[item];
    result.push(json);
  }
  return result;
}

// 获取类型信息
export function getItemList(data) {
  let result = {
    planeModel: [],
    engine1Model: [],
    engine2Model: [],
    testType: [],
  };

  data.forEach((item) => {
    let planeModel = item.planeModel;
    let engine1Model = item.engine1Model;
    let engine2Model = item.engine2Model;
    let testType = item.testType;

    if (!result.planeModel.find((i) => i == planeModel)) {
      result.planeModel.push(planeModel);
    }
    if (!result.engine1Model.find((i) => i == engine1Model)) {
      result.engine1Model.push(engine1Model);
    }
    if (!result.engine2Model.find((i) => i == engine2Model)) {
      result.engine2Model.push(engine2Model);
    }
    if (!result.testType.find((i) => i == testType)) {
      result.testType.push(testType);
    }
  });
  return result;
}
