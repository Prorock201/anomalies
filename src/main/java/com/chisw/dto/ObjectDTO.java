package com.chisw.dto;

/**
 * Created by user on 6/13/2016.
 */
public class ObjectDTO {

    private long id;
    private String name;
    private short active;

    public ObjectDTO() {
    }

    public ObjectDTO(long id, String name, short active) {
        this.id = id;
        this.name = name;
        this.active = active;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public short getActive() {
        return active;
    }

    public void setActive(short active) {
        this.active = active;
    }
}
