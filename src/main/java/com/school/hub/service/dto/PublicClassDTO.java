package com.school.hub.service.dto;

import com.school.hub.domain.Class;

public class PublicClassDTO {

    private Long id;
    private String name;
    private String iconName;
    private String theme;

    public PublicClassDTO() {}

    public PublicClassDTO(Class sclass) {
        this.id = sclass.getId();
        this.name = sclass.getName();
        this.iconName = sclass.getIconName();
        this.theme = sclass.getTheme();
    }

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

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }
}
