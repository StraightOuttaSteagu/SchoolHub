package com.school.hub.web.rest;

import com.school.hub.service.OrganizationService;
import com.school.hub.service.dto.OrganizationDTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/organization")
public class OrganizationResource {

    private final OrganizationService organizationService;

    public OrganizationResource(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOrganizations() {
        return ResponseEntity.ok(organizationService.getUserOrganizations());
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOrganization(@PathVariable Long id) {
        return ResponseEntity.ok(organizationService.getOrganization(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void createOrganization(@RequestBody OrganizationDTO organizationDTO) {
        organizationService.createOrganization(organizationDTO.getName(), organizationDTO.getDescription());
    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateOrganization(@PathVariable Long id, @RequestBody OrganizationDTO organizationDTO) {
        organizationService.updateOrganization(id, organizationDTO.getName(), organizationDTO.getDescription());
    }
}
