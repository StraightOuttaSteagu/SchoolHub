package com.school.hub.repository;

import com.school.hub.domain.Organization;
import com.school.hub.domain.UserClass;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClassRepository extends CrudRepository<UserClass, Long> {
    List<UserClass> findAllByOrganization(Organization organization);
}
