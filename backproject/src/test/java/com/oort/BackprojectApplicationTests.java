package com.oort;

import com.oort.entity.User;
import com.oort.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.DigestUtils;

@SpringBootTest
class BackprojectApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
    }

    @Test
    void testSave(){
        User user = new User();
        user.setUserName("root");
        user.setUserPass(DigestUtils.md5DigestAsHex("1234".getBytes()));
        userMapper.insert(user);
    }

    @Test
    void testUpdate(){
        User user = userMapper.selectById(1559156911306240002L);
        user.setUserName("Jock777");
        userMapper.updateById(user);
    }

}
