package com.school.hub.service;

import com.school.hub.domain.User;
import com.school.hub.domain.organization.Organization;
import com.school.hub.domain.organization.UserOrganization;
import com.school.hub.repository.OrganizationRepository;
import com.school.hub.repository.UserOrganizationRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final UserOrganizationRepository userOrganizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository,
                               UserOrganizationRepository userOrganizationRepository) {
        this.organizationRepository = organizationRepository;
        this.userOrganizationRepository = userOrganizationRepository;
    }

    public Organization create(String name, String description, User owner) {
        if (name.length() == 0)
            throw new IllegalArgumentException("Name cannot be empty");
        var organization = new Organization();
        organization.setName(name);
        organization.setDescription(description);
        organization = organizationRepository.save(organization);
        var ownerRelationship = new UserOrganization();
        ownerRelationship.setOrganization(organization);
        ownerRelationship.setUser(owner);
        ownerRelationship.setRole(UserOrganization.Role.ADMIN);
        userOrganizationRepository.save(ownerRelationship);
        return organization;
    }

    public List<Organization> getAll(int page, int pageSize) {
        return organizationRepository
            .findAll(PageRequest.of(page, pageSize))
            .toList();
    }

    public Optional<Organization> get(Long id) {
        return organizationRepository.findById(id);
    }

    public Organization update(Long id, String name, String description) {
        var organization = organizationRepository
            .findById(id)
            .orElseThrow();
        organization.setName(name);
        organization.setDescription(description);
        return organizationRepository.save(organization);
    }

    public void delete(Long id) {
        organizationRepository.deleteById(id);
    }
}
