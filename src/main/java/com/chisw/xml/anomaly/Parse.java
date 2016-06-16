package com.chisw.xml.anomaly;


import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

/**
 * Created by user on 6/16/2016.
 */
public class Parse {

    public static List<Anomaly> getStreamAnomalyByDate(long streamId, int date, int month) {
        String urlString = "http://api.leadspotting.com/LSAPI/LeadSpottingApi.jsp?Command=getStreamAnomaliesPerDate&StreamId=" + streamId +" &StartDate=" + date + "&EndDate=" + month;
        JAXBContext jaxbContext = null;
        try {
            jaxbContext = JAXBContext.newInstance(LSResponse.class);
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        URL url = null;
        try {
            url = new URL(urlString);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        Unmarshaller jaxbUnmarshaller = null;
        try {
            jaxbUnmarshaller = jaxbContext.createUnmarshaller();
        } catch (JAXBException e) {
            e.printStackTrace();
        }
       /* File file = new File("D:\\LeadSpottingApi.jsp.xml");*/
        LSResponse lsResponseType = null;
        try {
            lsResponseType = (LSResponse) jaxbUnmarshaller.unmarshal(url);
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        return lsResponseType.getAnomalies().getAnomaly();
    }


    public static LSResponse getStreamAnomaly(int streamId) {
        String urlString = "http://api.leadspotting.com/LSAPI/LeadSpottingApi.jsp?Command=getStreamAnomaliesPerDate&StreamId=" + streamId;
        JAXBContext jaxbContext = null;
        try {
            jaxbContext = JAXBContext.newInstance(LSResponse.class);
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        URL url = null;
        try {
            url = new URL(urlString);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        Unmarshaller jaxbUnmarshaller = null;
        try {
            jaxbUnmarshaller = jaxbContext.createUnmarshaller();
        } catch (JAXBException e) {
            e.printStackTrace();
        }
       /* File file = new File("D:\\LeadSpottingApi.jsp.xml");*/
        LSResponse lsResponseType = null;
        try {
            lsResponseType = (LSResponse) jaxbUnmarshaller.unmarshal(url);
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        return lsResponseType;
    }
}
