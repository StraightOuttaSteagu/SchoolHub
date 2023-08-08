package com.school.hub.service.dto;

import com.school.hub.domain.organization.Organization;

public class OrganizationDTO {
    private Long id;
    private String name;
    private String description;

    public OrganizationDTO() {
    }

    public OrganizationDTO(Organization organization) {
        this.id = organization.getId();
        this.name = organization.getName();
        this.description = organization.getDescription();
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
