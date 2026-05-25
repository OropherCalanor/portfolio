package com.ruhatkaratas.employeemanagement.mapper;

import com.ruhatkaratas.employeemanagement.dto.position.PositionResponse;
import com.ruhatkaratas.employeemanagement.entity.Position;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PositionMapper {

    PositionResponse toResponse(Position position);
}

