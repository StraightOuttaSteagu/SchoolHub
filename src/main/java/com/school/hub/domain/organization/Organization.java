package com.school.hub.domain.organization;

import com.school.hub.domain.AbstractAuditingEntity;
import com.school.hub.domain.Class;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "organization")
public class Organization extends AbstractAuditingEntity<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @OneToMany(
        cascade = CascadeType.REMOVE,
        mappedBy = "organization"
    )
    private Set<UserOrganization> users;

    @OneToMany(
        cascade = CascadeType.REMOVE
    )
    private Set<Class> classes;

    public Organization() {
    }

    @Override
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

    public Set<UserOrganization> getUsers() {
        return users;
    }

    public void setUsers(Set<UserOrganization> users) {
        this.users = users;
    }

    public Set<Class> getClasses() {
        return classes;
    }

    public void setClasses(Set<Class> classes) {
        this.classes = classes;
    }
}
