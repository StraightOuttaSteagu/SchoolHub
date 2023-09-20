package com.school.hub.service;

import com.school.hub.domain.Organization;
import com.school.hub.domain.OrganizationUser;
import com.school.hub.repository.OrganizationRepository;
import com.school.hub.repository.OrganizationUserRepository;
import com.school.hub.web.rest.errors.NotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final OrganizationUserRepository organizationUserRepository;
    private final UserService userService;

    public OrganizationService(
        OrganizationRepository organizationRepository,
        OrganizationUserRepository organizationUserRepository,
        UserService userService
    ) {
        this.organizationRepository = organizationRepository;
        this.organizationUserRepository = organizationUserRepository;
        this.userService = userService;
    }

    public void createOrganization(String name, String description) {
        var organization = new Organization();
        organization.setName(name);
        organization.setDescription(description);
        organizationRepository.save(organization);

        var organizationUser = new OrganizationUser();
        organizationUser.setOrganization(organization);
        organizationUser.setUser(userService.getUserWithAuthorities().orElseThrow(() -> new NotFoundException("User could not be found.")));
        organizationUser.setRole(OrganizationUser.Role.ADMIN);
        organizationUserRepository.save(organizationUser);
    }

    public Organization getOrganization(Long id) {
        var organization = organizationRepository.findById(id).orElseThrow(() -> new NotFoundException("Organization could not be found."));
        var organizationUser = organizationUserRepository.findByOrganizationAndUser(
            organization,
            userService.getUserWithAuthorities().orElseThrow(() -> new NotFoundException("User could not be found."))
        );
        if (organizationUser.isEmpty()) {
            throw new NotFoundException("User is not a member of this organization.");
        }

        return organization;
    }

    public List<Organization> getUserOrganizations() {
        return organizationUserRepository
            .findByUser(userService.getUserWithAuthorities().orElseThrow(() -> new NotFoundException("User could not be found.")))
            .stream()
            .map(OrganizationUser::getOrganization)
            .toList();
    }

    public void updateOrganization(Long id, String name, String description) {
        var organization = organizationRepository.findById(id).orElseThrow(() -> new NotFoundException("Organization could not be found."));
        var organizationUser = organizationUserRepository.findByOrganizationAndUser(
            organization,
            userService.getUserWithAuthorities().orElseThrow(() -> new NotFoundException("User could not be found."))
        );
        if (organizationUser.isEmpty() || organizationUser.get().getRole() != OrganizationUser.Role.ADMIN) {
            throw new NotFoundException("User is not a member of this organization.");
        }

        organization.setName(name);
        organization.setDescription(description);
        organizationRepository.save(organization);
    }

    public void deleteOrganization(Long id) {
        organizationRepository.findById(id)
            .ifPresent(organization -> {
                organizationUserRepository.deleteAll(
                    organizationUserRepository
                        .findByOrganization(organization));
                organizationRepository.delete(organization);
            });
    }
}
