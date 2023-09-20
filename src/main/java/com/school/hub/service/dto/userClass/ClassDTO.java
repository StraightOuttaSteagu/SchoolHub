package com.school.hub.service.dto.userClass;

import com.school.hub.domain.UserClass;
import com.school.hub.service.dto.UserDTO;

import java.util.List;

public class ClassDTO extends PublicClassDTO {
    private List<UserDTO> teachers;
    private List<UserDTO> students;


    public ClassDTO() {
    }

    public ClassDTO(UserClass userClass) {
        super(userClass);
        this.teachers = userClass
            .getTeachers()
            .stream()
            .map(UserDTO::new)
            .toList();
        this.students = userClass
            .getStudents()
            .stream()
            .map(UserDTO::new)
            .toList();
    }

    public List<UserDTO> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<UserDTO> teachers) {
        this.teachers = teachers;
    }

    public List<UserDTO> getStudents() {
        return students;
    }

    public void setStudents(List<UserDTO> students) {
        this.students = students;
    }
}
