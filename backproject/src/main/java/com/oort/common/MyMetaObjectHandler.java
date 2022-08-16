package com.oort.common;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * 自定义元数据对象处理器，用于公共字段的填充
 */
@Slf4j
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    /**
     * 插入时的操作，自动填充
     * @param metaObject
     */
    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("公共字段自动填充[insert]...");
        metaObject.setValue("createdTime", LocalDateTime.now());
        metaObject.setValue("updatedTime", LocalDateTime.now());
        metaObject.setValue("createdBy", BaseContext.getCurrentId());
        metaObject.setValue("updatedBy", BaseContext.getCurrentId());
    }

    /**
     * 更新时的操作，自动填充
     * @param metaObject
     */
    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("公共字段自动填充[update]...");
        metaObject.setValue("updatedTime", LocalDateTime.now());
        metaObject.setValue("updatedBy", BaseContext.getCurrentId());
    }
}
