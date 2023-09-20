package com.school.hub.domain;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "organizations")
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
        mappedBy = "organization",
        fetch = FetchType.EAGER
    )
    private Set<OrganizationUser> organizationUsers;

    @OneToMany(
        cascade = CascadeType.REMOVE,
        mappedBy = "organization",
        fetch = FetchType.EAGER
    )
    private Set<UserClass> userClasses;

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

    public Set<OrganizationUser> getOrganizationUsers() {
        return organizationUsers;
    }

    public void setOrganizationUsers(Set<OrganizationUser> organizationUsers) {
        this.organizationUsers = organizationUsers;
    }

    public Set<UserClass> getClasses() {
        return userClasses;
    }

    public void setClasses(Set<UserClass> userClasses) {
        this.userClasses = userClasses;
    }
}
