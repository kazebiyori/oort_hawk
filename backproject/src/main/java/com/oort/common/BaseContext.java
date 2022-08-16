package com.oort.common;

/**
 * 基于ThreadLocal封装的工具类，用于保存和读取当前登录用户的id
 */
public class BaseContext {
    public static ThreadLocal<Long> threadLocal = new ThreadLocal<>();

    /**
     * 保存当前登录用户的id
     * @param id
     */
    public static void setCurrentId(Long id){
        threadLocal.set(id);
    }

    /**
     * 读取当前登录用户的id
     * @param id
     * @return
     */
    public static Long getCurrentId(){
        return threadLocal.get();
    }
}