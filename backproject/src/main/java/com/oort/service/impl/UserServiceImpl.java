package com.oort.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.oort.entity.User;
import com.oort.mapper.UserMapper;
import com.oort.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}