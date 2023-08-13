package com.school.hub.service.dto;

import com.school.hub.domain.User;
import com.school.hub.domain.organization.Organization;

public class ClassDTO {
    private Long id;
    private String name;
    private String subject_name;
    private User professor;
    private Organization organization;

    public ClassDTO() {
    }

    public ClassDTO(Long id, String name, String subject_name, User professor, Organization organization) {
        this.id = id;
        this.name = name;
        this.subject_name = subject_name;
        this.professor = professor;
        this.organization = organization;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject_name() {
        return subject_name;
    }

    public void setSubject_name(String subject_name) {
        this.subject_name = subject_name;
    }

    public User getProfessor() {
        return professor;
    }

    public void setProfessor(User professor) {
        this.professor = professor;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }
}
