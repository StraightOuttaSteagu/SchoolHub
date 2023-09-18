package com.school.hub.service.dto.organization;

import com.school.hub.domain.Organization;
import com.school.hub.service.dto.userClass.PublicClassDTO;

import java.util.List;

public class OrganizationDTO extends PublicOrganizationDTO {
    private List<PublicClassDTO> classes;
    private List<OrganizationUserDTO> users;

    public OrganizationDTO() {
    }

    public OrganizationDTO(Organization organization) {
        super(organization);
        this.classes = organization
            .getClasses()
            .stream()
            .map(PublicClassDTO::new)
            .toList();
        this.users = organization
            .getOrganizationUsers()
            .stream()
            .map(OrganizationUserDTO::new)
            .toList();
    }

    public List<PublicClassDTO> getClasses() {
        return classes;
    }

    public void setClasses(List<PublicClassDTO> classes) {
        this.classes = classes;
    }

    public List<OrganizationUserDTO> getUsers() {
        return users;
    }

    public void setUsers(List<OrganizationUserDTO> users) {
        this.users = users;
    }
}
