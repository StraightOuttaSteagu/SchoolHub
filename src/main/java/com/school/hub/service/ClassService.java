package com.school.hub.service;

import com.school.hub.domain.User;
import com.school.hub.domain.UserClass;
import com.school.hub.domain.Organization;
import com.school.hub.repository.ClassRepository;
import com.school.hub.repository.OrganizationUserRepository;
import com.school.hub.web.rest.errors.AlreadyExistsException;
import com.school.hub.web.rest.errors.NotFoundException;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

@Service
public class ClassService {

    private final ClassRepository classRepository;
    private final UserService userService;
    private final OrganizationUserRepository organizationUserRepository;

    public ClassService(
        ClassRepository classRepository,
        UserService userService,
        OrganizationUserRepository organizationUserRepository
    ) {
        this.classRepository = classRepository;
        this.userService = userService;
        this.organizationUserRepository = organizationUserRepository;
    }

    public void createClass(Organization organization, String name, String iconName, String theme) {
        var newClass = new UserClass();
        newClass.setName(name);
        newClass.setIconName(iconName);
        newClass.setTheme(theme);
        newClass.setCreator(userService.getUserWithAuthorities().orElseThrow(() -> new NotFoundException("User not found")));
        newClass.setOrganization(organization);
        classRepository.save(newClass);
    }

    public List<UserClass> getClasses(Organization organization) {
        return classRepository.findAllByOrganization(organization);
    }

    public UserClass getUserClass(Long id, Organization organization) {
        var aClass = classRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Class not found"));
        if (!Objects.equals(aClass.getOrganization().getId(), organization.getId())) {
            throw new NotFoundException("Class not found");
        } else {
            return aClass;
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

    public void addTeacher(UserClass userClass, Long userId) {
        var user = authorizeAdd(userClass, userId);
        userClass.getTeachers().add(user);
        classRepository.save(userClass);
    }

    public void addStudent(UserClass userClass, Long userId) {
        var user = authorizeAdd(userClass, userId);
        userClass.getStudents().add(user);
        classRepository.save(userClass);
    }

    private User authorizeAdd(UserClass userClass, Long userId) {
        var user = userService
            .getUser(userId)
            .orElseThrow(() -> new NotFoundException("User not found"));
        organizationUserRepository
            .findByOrganizationAndUser(userClass.getOrganization(), user)
            .orElseThrow(() -> new NotFoundException("User not found"));
        userClass.getTeachers().forEach(teacher -> {
            if (Objects.equals(teacher.getId(), userId))
                throw new AlreadyExistsException("There is a teacher with the given id");
        });
        userClass.getStudents().forEach(student -> {
            if (Objects.equals(student.getId(), userId))
                throw new AlreadyExistsException("There is a student with the given id");
        });
        return user;
    }
}
