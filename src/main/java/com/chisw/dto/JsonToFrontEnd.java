package com.chisw.dto;

import com.chisw.dto.StreamDTO;

import java.util.List;

/**
 * Created by user on 4/1/2016.
 */
public class JsonToFrontEnd {

    private String summaryToday;
    private String summaryLast;
    private List<StreamDTO> streams;

    public JsonToFrontEnd() {
    }

    public JsonToFrontEnd(String summaryToday, String summaryLast, List<StreamDTO> streams) {
        this.summaryToday = summaryToday;
        this.summaryLast = summaryLast;
        this.streams = streams;
    }

    public String getSummaryToday() {
        return summaryToday;
    }

    public void setSummaryToday(String summaryToday) {
        this.summaryToday = summaryToday;
    }

    public String getSummaryLast() {
        return summaryLast;
    }

    public void setSummaryLast(String summaryLast) {
        this.summaryLast = summaryLast;
    }

    public List<StreamDTO> getStreams() {
        return streams;
    }

    public void setStreams(List<StreamDTO> streams) {
        this.streams = streams;
    }
}
