// import { defineAsyncComponent } from "vue";

// const AsyncComp = defineAsyncComponent(() => {
//   return new Promise((resolve, reject) => {
//     // ...从服务器获取组件
//     resolve(/* 获取到的组件 */);
//   });
// });

/**
 * 异步加载组件，修改组件名字
 * @param _import
 * @param routeName
 * @returns {*}
 */
function dynamicRouteComponent(_import, routeName) {
  return _import.then((comp) => {
    if (comp && comp.default) {
      return { ...comp.default, name: routeName };
    }
    return comp;
  });
}

/**
 * 获取组件
 * @param path
 * @returns {function(*): void}
 */
export function asyncCriterionDisplay(compname, path) {
  return () =>
    dynamicRouteComponent(import("@/views/CriterionDisplay.vue"), compname);
}
export function asyncDataCriterion(compname, path) {
  return () =>
    dynamicRouteComponent(
      import("@/views/DataCriterion/DataCriterion.vue"),
      compname
    );
}
export function asyncDataDisplay(compname, path) {
  return () =>
    dynamicRouteComponent(import("@/views/DataDisplay.vue"), compname);
}
export function asyncDataStatistics(compname, path) {
  return () =>
    dynamicRouteComponent(
      import("@/views/DataStatistics/DataStatistics.vue"),
      compname
    );
}
// export function asyncCriterionEdition(compname, path) {
//   return () =>
//     dynamicRouteComponent(
//       import("@/views/CriterionEdition.vue"),
//       compname
//     );
// }
