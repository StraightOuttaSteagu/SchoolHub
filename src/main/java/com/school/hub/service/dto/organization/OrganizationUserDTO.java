package com.school.hub.service.dto.organization;

import com.school.hub.domain.OrganizationUser;
import com.school.hub.service.dto.UserDTO;

public class OrganizationUserDTO extends UserDTO {
    private OrganizationUser.Role role;

    public OrganizationUserDTO() { }

    public OrganizationUserDTO(OrganizationUser organizationUser) {
        super(organizationUser.getUser());
        this.role = organizationUser.getRole();
    }

    public OrganizationUser.Role getRole() {
        return role;
    }

    public void setRole(OrganizationUser.Role role) {
        this.role = role;
    }
}
