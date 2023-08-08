package com.school.hub.repository;

import com.school.hub.domain.organization.UserOrganization;
import org.springframework.data.repository.CrudRepository;

public interface UserOrganizationRepository extends CrudRepository<UserOrganization, Long> {
}
