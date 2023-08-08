package com.school.hub.domain.organization;

import com.school.hub.domain.AbstractAuditingEntity;
import com.school.hub.domain.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_organizations")
public class UserOrganization extends AbstractAuditingEntity<Long> {
    public enum Role {
        STUDENT,
        PARENT,
        TEACHER,
        ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @Column(name = "role", nullable = false)
    private Role role = Role.STUDENT;

    public UserOrganization() {
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
