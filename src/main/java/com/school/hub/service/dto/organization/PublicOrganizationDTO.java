package com.school.hub.service.dto.organization;

import com.school.hub.domain.Organization;

public class PublicOrganizationDTO {

    private Long id;
    private String name;
    private String description;

    public PublicOrganizationDTO() {}

    public PublicOrganizationDTO(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public PublicOrganizationDTO(Organization organization) {
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
