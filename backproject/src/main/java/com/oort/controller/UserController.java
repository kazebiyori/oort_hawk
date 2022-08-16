package com.oort.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.oort.common.R;
import com.oort.entity.User;
import com.oort.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@Slf4j
@Api(tags = "用户相关接口")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 员工登录
     * @param request
     * @param user
     * @return
     */
    @PostMapping("/login")
    @ApiOperation(value = "用户登录接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "user",value = "用户",required = true),
    })
    public R<User> login(HttpServletRequest request, @RequestBody User user){
        //1、将页面提交的密码password进行md5加密处理
        String password = user.getUserPass();
        password = DigestUtils.md5DigestAsHex(password.getBytes());

        //2、根据页面提交的用户名username:查询数据库
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUserName, user.getUserName());
        User user1 = userService.getOne(queryWrapper);

        //3、如果没有查询到则返回登录失败结果
        if (user1 == null){
            return R.error("登录失败");
        }

        //4、密码比对，如果不一致则返回登录失败结果
        if(!password.equals(user1.getUserPass())){
            return R.error("登录失败");
        }

        //5、查看员工状态，如果为已禁用状态，则返回员工已禁用结果
        if(user1.getUserStatus().equals("0")){
            return R.error("员工已禁用");
        }

        //6、登录成功，将员工id存入Session并返回登录成功结果
        request.getSession().setAttribute("user",user1.getId());
        return R.success(user1);
    }

    /**
     * 员工退出
     * @param request
     * @return
     */
    @PostMapping("/logout")
    @ApiOperation(value = "用户退出接口")
    public R<String> logout(HttpServletRequest request){
        //1、清理Session中的用户id
        request.getSession().removeAttribute("user");
        //2、返回结果
        return R.success("退出成功");
    }
}