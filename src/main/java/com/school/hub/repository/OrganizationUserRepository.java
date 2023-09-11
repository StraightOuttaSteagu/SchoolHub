package com.school.hub.repository;

import com.school.hub.domain.Organization;
import com.school.hub.domain.OrganizationUser;
import com.school.hub.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface OrganizationUserRepository extends CrudRepository<OrganizationUser, Long> {
    Optional<OrganizationUser> findByOrganizationAndUser(Organization organization, User user);
    List<OrganizationUser> findByUser(User user);
}
