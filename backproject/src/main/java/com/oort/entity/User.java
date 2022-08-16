package com.oort.entity;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@ApiModel(value = "用户信息",description = "")
@Data
public class User implements Serializable,Cloneable{

    private static final long serialVersionUID = 1L;

    /** 用户id */
    @ApiModelProperty(name = "用户id",notes = "")
    @TableId
    private Long id ;
    /** 头像id */
    @ApiModelProperty(name = "头像id",notes = "")
    private Long avatarId ;
    /** 用户名称 */
    @ApiModelProperty(name = "用户名称",notes = "")
    private String userName ;
    /** 用户密码 */
    @ApiModelProperty(name = "用户密码",notes = "")
    private String userPass ;
    /** 用户组;DEFAULT */
    @ApiModelProperty(name = "用户组",notes = "DEFAULT")
    private String userGroup ;
    /** 用户状态;DEFAULT */
    @ApiModelProperty(name = "用户状态",notes = "DEFAULT")
    private String userStatus ;
    /** 简介 */
    @ApiModelProperty(name = "简介",notes = "")
    private String intro ;
    /** 邮件地址 */
    @ApiModelProperty(name = "邮件地址",notes = "")
    private String email ;
    /** 手机号 */
    @ApiModelProperty(name = "手机号",notes = "")
    private String phone ;
    /** 最后登录时间 */
    @ApiModelProperty(name = "最后登录时间",notes = "")
    private LocalDateTime lastLoginTime ;
    /** 乐观锁 */
    @ApiModelProperty(name = "乐观锁",notes = "")
    @Version
    private Integer revision ;
    /** 创建人 */
    @ApiModelProperty(name = "创建人",notes = "")
    @TableField(fill = FieldFill.INSERT)
    private Long createdBy ;
    /** 创建时间 */
    @ApiModelProperty(name = "创建时间",notes = "")
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdTime ;
    /** 更新人 */
    @ApiModelProperty(name = "更新人",notes = "")
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Long updatedBy ;
    /** 更新时间 */
    @ApiModelProperty(name = "更新时间",notes = "")
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedTime ;
}