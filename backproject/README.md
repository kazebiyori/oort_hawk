# 后端文档

## 1 用户业务

### 1.1 表t_user

![image-20220816105702935](https://gallery-1302735062.cos.ap-beijing.myqcloud.com/typora/202208161057433.png)

```s'q'l
/*
 Navicat Premium Data Transfer

 Source Server         : 本机
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : 127.0.0.1:3306
 Source Schema         : fdps

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 16/08/2022 10:50:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` bigint(20) NOT NULL DEFAULT 0 COMMENT '用户id',
  `avatar_id` bigint(20) NOT NULL DEFAULT 0 COMMENT '头像id',
  `user_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户名称',
  `user_pass` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户密码',
  `user_group` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '用户组;DEFAULT',
  `user_status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '用户状态;DEFAULT',
  `intro` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '简介',
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '邮件地址',
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '手机号',
  `last_login_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后登录时间',
  `revision` int(11) NULL DEFAULT 1 COMMENT '乐观锁',
  `created_by` bigint(20) NULL DEFAULT 0 COMMENT '创建人',
  `created_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` bigint(20) NULL DEFAULT 0 COMMENT '更新人',
  `updated_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1559364346348400641, 0, 'root', '81dc9bdb52d04dc20036dbd8313ed055', '1', '1', '', '', '', '2022-08-16 10:20:06', 1, NULL, '2022-08-16 10:20:06', NULL, '2022-08-16 10:20:06');

SET FOREIGN_KEY_CHECKS = 1;

```

### 1.2 接口调试

地址：http://localhost:8081/doc.html#/home

![image-20220816104847340](https://gallery-1302735062.cos.ap-beijing.myqcloud.com/typora/202208161057435.png)

![image-20220816104857082](https://gallery-1302735062.cos.ap-beijing.myqcloud.com/typora/202208161057436.png)