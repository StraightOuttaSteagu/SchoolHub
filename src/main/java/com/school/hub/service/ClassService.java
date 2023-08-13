package com.school.hub.service;

import com.school.hub.domain.Class;
import com.school.hub.domain.User;
import com.school.hub.domain.organization.Organization;
import com.school.hub.repository.ClassRepository;
import com.school.hub.repository.OrganizationRepository;
import com.school.hub.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ClassService {

    private final ClassRepository classRepository;

    private final OrganizationRepository organizationRepository;

    public ClassService(ClassRepository classRepository,
                        OrganizationRepository organizationRepository) {
        this.classRepository = classRepository;
        this.organizationRepository = organizationRepository;
    }

    public Class create(String name, String subject_name, Organization organization, User professor) {
        if(name.length() == 0){
            throw new IllegalArgumentException("Name cannot be empty");
        }
        var new_class = new Class();
        new_class.setName(name);
        new_class.setSubject_name(subject_name);
        new_class.setOrganization(organization);
        new_class.setProfessor(professor);
        new_class = classRepository.save(new_class);
        return new_class;
    }

    public List<Class> getAll(int page, int pageSize){
        return classRepository
            .findAll(PageRequest.of(page, pageSize))
            .toList();
    }

    public Optional<Class> get(Long id){
        return classRepository.findById(id);
    }

    public Class update(Long id, String name, String subject_name, User professor){
        var update_class = classRepository.findById(id).orElseThrow();
        update_class.setName(name);
        update_class.setSubject_name(subject_name);
        update_class.setProfessor(professor);
        return classRepository.save(update_class);
    }

    public void delete(Long id){
        classRepository.deleteById(id);
    }
}
