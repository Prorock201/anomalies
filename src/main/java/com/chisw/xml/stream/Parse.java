package com.chisw.xml.stream;

import com.chisw.dto.JsonToFrontEnd;
import com.chisw.dto.StreamDTO;
import com.chisw.xml.anomaly.*;
import com.chisw.xml.anomaly.Anomalies;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by user on 3/21/2016.
 */
public class Parse {


    public static JsonToFrontEnd parseURl() {
        String urlString = "http://api.leadspotting.com/LSAPI/LeadSpottingApi.jsp?Command=getStreamAnomalies";
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

        return convert(lsResponseType);
    }


    private static JsonToFrontEnd convert(LSResponse lsResponse) {
        List<StreamDTO> streamDTOs = convertToStreamDtoList(lsResponse);
        String [] strings = splitSummary(lsResponse);
        return new JsonToFrontEnd(strings[0], strings[1] , addAnomalyToStream(streamDTOs));

    }


    private static List<StreamDTO> convertToStreamDtoList(LSResponse lsResponse) {
        String[] strings = splitSummary(lsResponse);


        List<StreamDTO> streamDTOList = new ArrayList<>();
        for (Stream stream : lsResponse.getStream()) {
            streamDTOList.add(new StreamDTO(stream.getImage(), stream.getName(), stream.getID().longValue(), stream.getUrl()));

        }

        return streamDTOList;
    }

    private static List<StreamDTO> addAnomalyToStream(List<StreamDTO> streamDTOList) {

        List<com.chisw.xml.anomaly.Anomaly> list = new ArrayList<>();
        List<StreamDTO> newStream = new ArrayList<>();
        for(StreamDTO stream: streamDTOList){
            com.chisw.xml.anomaly.LSResponse streamAnomaly = com.chisw.xml.anomaly.Parse.getStreamAnomaly((int) stream.getId());
            if(!(streamAnomaly.getAnomalies().getAnomaly().isEmpty())){
                stream.setAnomalies(streamAnomaly.getAnomalies().getAnomaly());

            }
            newStream.add(stream);
        }




/*
        for (Iterator<StreamDTO> iterator = streamDTOList.iterator(); iterator.hasNext(); ) {
            StreamDTO streamDTO1 = iterator.next();
            lsResponse.getAnomalies().getAnomaly().stream().
                    filter(anomaly -> streamDTO1.getId() == Long.valueOf(anomaly.getStreamId())).
                    forEach(anomaly -> {streamDTO1.getAnomalies().add(anomaly);
                                        if (anomaly.getDesc().equals("People identided")) {
                                          streamDTO1.setDetectedPerson(true);
                                         }
            });
        }*/
        return newStream;
    }




        /*return new JsonToFrontEnd(strings[0], strings[1] ,lsResponse.getStream(), lsResponse.getAnomalies().getAnomaly());*/


    private static String[] splitSummary(LSResponse lsResponse) {
        String[] strings = lsResponse.getSummary().split("Last");
        String swap = strings[1];
        strings[1] = "Last" + swap;
        return strings;
    }

}
