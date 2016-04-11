package com.chisw.dto;

import com.chisw.xml.Anomaly;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by admin on 03/04/2016.
 */
public class StreamDTO {
    
    private long id;
    private String name;
    private String image;
    private boolean isDetectedPerson;
    private boolean isHotAnomaly;
    private List<Anomaly> anomalies = new ArrayList<>();


    public StreamDTO() {
    }

    public StreamDTO(String image, String name, long id) {
        this.image = image;
        this.name = name;
        this.id = id;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isDetectedPerson() {
        return isDetectedPerson;
    }

    public void setDetectedPerson(boolean detectedPerson) {
        isDetectedPerson = detectedPerson;
    }

    public boolean isHotAnomaly() {
        return isHotAnomaly;
    }

    public void setHotAnomaly(boolean hotAnomaly) {
        isHotAnomaly = hotAnomaly;
    }

    public List<Anomaly> getAnomalies() {
        return anomalies;
    }

    public void setAnomalies(List<Anomaly> anomalies) {
        this.anomalies = anomalies;
    }
}
