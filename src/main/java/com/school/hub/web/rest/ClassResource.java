package com.school.hub.web.rest;

import com.school.hub.service.ClassService;
import com.school.hub.service.OrganizationService;
import com.school.hub.service.dto.PublicClassDTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/class")
public class ClassResource {

    private final ClassService classService;
    private final OrganizationService organizationService;

    public ClassResource(ClassService classService, OrganizationService organizationService) {
        this.classService = classService;
        this.organizationService = organizationService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getClasses(@RequestParam("organizationId") Long organizationId) {
        return ResponseEntity.ok(
            classService.getClasses(organizationService.getOrganization(organizationId)).stream().map(PublicClassDTO::new).toList()
        );
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getClass(@RequestParam("organizationId") Long organizationId, @RequestParam("id") Long id) {
        return ResponseEntity.ok(classService.getClass(id, organizationService.getOrganization(organizationId)));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createClass(
        @RequestParam("organizationId") Long organizationId,
        @RequestBody PublicClassDTO createClassRequest
    ) {
        classService.createClass(
            organizationService.getOrganization(organizationId),
            createClassRequest.getName(),
            createClassRequest.getIconName(),
            createClassRequest.getTheme()
        );
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateClass(
        @RequestParam("organizationId") Long organizationId,
        @RequestParam("id") Long id,
        @RequestBody PublicClassDTO updateClassRequest
    ) {
        classService.updateClass(id, updateClassRequest.getName(), updateClassRequest.getIconName(), updateClassRequest.getTheme());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteClass(@RequestParam("organizationId") Long organizationId, @PathVariable Long id) {
        classService.deleteClass(id);
        return ResponseEntity.ok().build();
    }
}