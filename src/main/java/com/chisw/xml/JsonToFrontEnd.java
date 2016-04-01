package com.chisw.xml;

import java.util.List;

/**
 * Created by user on 4/1/2016.
 */
public class JsonToFrontEnd {

    private String summaryToday;
    private String summaryLast;
    private List<Stream> stream;
    private List<Anomaly> anomalies;

    public JsonToFrontEnd() {
    }

    public JsonToFrontEnd(String summaryToday, String summaryLast, List<Stream> stream, List<Anomaly> anomalies) {
        this.summaryToday = summaryToday;
        this.summaryLast = summaryLast;
        this.stream = stream;
        this.anomalies = anomalies;
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

    public List<Stream> getStream() {
        return stream;
    }

    public void setStream(List<Stream> stream) {
        this.stream = stream;
    }

    public List<Anomaly> getAnomalies() {
        return anomalies;
    }

    public void setAnomalies(List<Anomaly> anomalies) {
        this.anomalies = anomalies;
    }
}
