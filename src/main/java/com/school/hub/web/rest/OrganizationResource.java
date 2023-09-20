package com.school.hub.web.rest;

import com.school.hub.service.OrganizationService;
import com.school.hub.service.dto.organization.OrganizationDTO;
import com.school.hub.service.dto.organization.PublicOrganizationDTO;
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
        return ResponseEntity.ok(
            organizationService
                .getUserOrganizations()
                .stream().map(PublicOrganizationDTO::new)
        );
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOrganization(@PathVariable Long id) {
        return ResponseEntity.ok(
            new OrganizationDTO(organizationService.getOrganization(id))
        );
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void createOrganization(@RequestBody PublicOrganizationDTO publicOrganizationDTO) {
        organizationService.createOrganization(publicOrganizationDTO.getName(), publicOrganizationDTO.getDescription());
    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateOrganization(@PathVariable Long id, @RequestBody PublicOrganizationDTO publicOrganizationDTO) {
        organizationService.updateOrganization(id, publicOrganizationDTO.getName(), publicOrganizationDTO.getDescription());
    }

    @DeleteMapping(path = "/{id}")
    public void deleteOrganization(@PathVariable Long id) {
        organizationService.deleteOrganization(id);
    }
}
