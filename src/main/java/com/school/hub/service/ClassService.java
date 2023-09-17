package com.school.hub.service;

import com.school.hub.domain.Class;
import com.school.hub.domain.Organization;
import com.school.hub.repository.ClassRepository;
import com.school.hub.web.rest.errors.NotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ClassService {

    private final ClassRepository classRepository;
    private final UserService userService;

    public ClassService(ClassRepository classRepository, UserService userService) {
        this.classRepository = classRepository;
        this.userService = userService;
    }

    public void createClass(Organization organization, String name, String iconName, String theme) {
        var newClass = new Class();
        newClass.setName(name);
        newClass.setIconName(iconName);
        newClass.setTheme(theme);
        newClass.setCreator(userService.getUserWithAuthorities().orElseThrow(() -> new NotFoundException("User not found")));
        newClass.setOrganization(organization);
        classRepository.save(newClass);
    }

    public List<Class> getClasses(Organization organization) {
        return classRepository.findAllByOrganization(organization);
    }

    public Class getClass(Long id, Organization organization) {
        var newClass = classRepository.findById(id).orElseThrow(() -> new NotFoundException("Class not found"));
        if (!newClass.getOrganization().equals(organization)) {
            throw new NotFoundException("Class not found");
        } else {
            return newClass;
        }
    }

    public void updateClass(Long id, String name, String iconName, String theme) {
        var classToUpdate = classRepository.findById(id).orElseThrow(() -> new NotFoundException("Class not found"));
        classToUpdate.setName(name);
        classToUpdate.setIconName(iconName);
        classToUpdate.setTheme(theme);
        classRepository.save(classToUpdate);
    }

    public void deleteClass(Long id) {
        var classToDelete = classRepository.findById(id).orElseThrow(() -> new NotFoundException("Class not found"));
        classRepository.delete(classToDelete);
    }
}
