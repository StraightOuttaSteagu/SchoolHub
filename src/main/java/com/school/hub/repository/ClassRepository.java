package com.school.hub.repository;

import com.school.hub.domain.Class;
import com.school.hub.domain.Organization;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface ClassRepository extends CrudRepository<Class, Long> {
    List<Class> findAllByOrganization(Organization organization);
}
