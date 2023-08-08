package com.school.hub.web.rest;

import com.school.hub.service.OrganizationService;
import com.school.hub.service.UserService;
import com.school.hub.service.dto.OrganizationDTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationResource {
    private final OrganizationService organizationService;
    private final UserService userService;

    public OrganizationResource(
        OrganizationService organizationService,
        UserService userService
    ) {
        this.organizationService = organizationService;
        this.userService = userService;
    }

    @PostMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> createOrganization(@RequestBody OrganizationDTO organizationDTO) {
        var user = userService.getUserWithAuthorities();
        if (user.isEmpty())
            return ResponseEntity
                .internalServerError()
                .build();
        return ResponseEntity.ok(new OrganizationDTO(
            organizationService.create(
                organizationDTO.getName(),
                organizationDTO.getDescription(),
                user.get()
            )
        ));
    }

    @GetMapping(
        path = "/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getOrganization(@PathVariable Long id) {
        var organization = organizationService.get(id);
        if (organization.isEmpty())
            return ResponseEntity
                .notFound()
                .build();
        return ResponseEntity.ok(new OrganizationDTO(organization.get()));
    }

    @GetMapping(
        path = "/all",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getAllOrganizations(
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "pageSize", defaultValue = "10") int pageSize
    ) {
        return ResponseEntity.ok(organizationService.getAll(page, pageSize));
    }

    @PutMapping(
        path = "/{id}",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> updateOrganization(
        @PathVariable Long id,
        @RequestBody OrganizationDTO organizationDTO
    ) {
        try {
            var organization = organizationService.update(
                id,
                organizationDTO.getName(),
                organizationDTO.getDescription()
            );
            return ResponseEntity.ok(new OrganizationDTO(organization));
        } catch (Exception e) {
            return ResponseEntity
                .notFound()
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrganization(@PathVariable Long id) {
        try {
            organizationService.delete(id);
            return ResponseEntity
                .ok()
                .build();
        } catch (Exception e) {
            return ResponseEntity
                .notFound()
                .build();
        }
    }
}
