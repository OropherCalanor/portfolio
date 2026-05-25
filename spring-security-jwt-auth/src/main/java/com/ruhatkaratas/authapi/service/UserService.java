package com.ruhatkaratas.authapi.service;

import com.ruhatkaratas.authapi.dto.user.UserResponse;

public interface UserService {

    UserResponse getCurrentUser(String email);
}
