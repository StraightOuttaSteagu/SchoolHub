package com.school.hub.domain;

import jakarta.persistence.*;

@Table(name = "organization_users")
@Entity
public class OrganizationUser {

    public enum Role {
        ADMIN,
        USER,
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Organization organization;

    @ManyToOne
    private User user;

    @Column(nullable = false)
    private Role role;

    public OrganizationUser() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
