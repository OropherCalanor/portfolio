package com.ruhatkaratas.employeemanagement.service.impl;

import com.ruhatkaratas.employeemanagement.dto.position.PositionCreateRequest;
import com.ruhatkaratas.employeemanagement.dto.position.PositionResponse;
import com.ruhatkaratas.employeemanagement.dto.position.PositionUpdateRequest;
import com.ruhatkaratas.employeemanagement.entity.Position;
import com.ruhatkaratas.employeemanagement.exception.BadRequestException;
import com.ruhatkaratas.employeemanagement.exception.DuplicateResourceException;
import com.ruhatkaratas.employeemanagement.exception.ResourceNotFoundException;
import com.ruhatkaratas.employeemanagement.mapper.PositionMapper;
import com.ruhatkaratas.employeemanagement.repository.EmployeeRepository;
import com.ruhatkaratas.employeemanagement.repository.PositionRepository;
import com.ruhatkaratas.employeemanagement.service.PositionService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PositionServiceImpl implements PositionService {

    private final PositionRepository positionRepository;
    private final EmployeeRepository employeeRepository;
    private final PositionMapper positionMapper;

    @Override
    public PositionResponse createPosition(PositionCreateRequest request) {
        validatePositionTitle(request.title(), null);

        Position position = new Position();
        position.setTitle(request.title().trim());
        position.setDescription(request.description());

        return positionMapper.toResponse(positionRepository.save(position));
    }

    @Override
    @Transactional(readOnly = true)
    public PositionResponse getPositionById(Long id) {
        return positionMapper.toResponse(findPositionById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PositionResponse> getAllPositions() {
        return positionRepository.findAll()
                .stream()
                .map(positionMapper::toResponse)
                .toList();
    }

    @Override
    public PositionResponse updatePosition(Long id, PositionUpdateRequest request) {
        Position position = findPositionById(id);
        validatePositionTitle(request.title(), id);

        position.setTitle(request.title().trim());
        position.setDescription(request.description());

        return positionMapper.toResponse(positionRepository.save(position));
    }

    @Override
    public void deletePosition(Long id) {
        Position position = findPositionById(id);

        if (employeeRepository.countByPositionId(id) > 0) {
            throw new BadRequestException("Position cannot be deleted because it is assigned to one or more employees");
        }

        positionRepository.delete(position);
    }

    private Position findPositionById(Long id) {
        return positionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Position not found with id: " + id));
    }

    private void validatePositionTitle(String title, Long currentPositionId) {
        positionRepository.findByTitleIgnoreCase(title.trim())
                .filter(existing -> !existing.getId().equals(currentPositionId))
                .ifPresent(existing -> {
                    throw new DuplicateResourceException("Position title already exists: " + title);
                });
    }
}
