package com.chisw.xml.objectsstream;

import com.chisw.dto.ObjectDTO;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by user on 3/21/2016.
 */
public class ParseObject {


    public static List<ObjectDTO> parseURl() {
        String urlString = "http://api.leadspotting.com/LSAPI/LeadSpottingApi.jsp?Command=getStreamObjects";
        JAXBContext jaxbContext = null;
        try {
            jaxbContext = JAXBContext.newInstance(com.chisw.xml.objectsstream.LSResponse.class);
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
        com.chisw.xml.objectsstream.LSResponse lsResponseType = null;
        try {
            lsResponseType = (com.chisw.xml.objectsstream.LSResponse) jaxbUnmarshaller.unmarshal(url);
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        return convert(lsResponseType);
    }





    private static List<ObjectDTO> convert(LSResponse lsResponse) {
        List<ObjectDTO> streamDTOList = new ArrayList<>();
        for (Object object : lsResponse.getObject()) {
            boolean value = false;
            if(object.active.shortValue() == 1){
                value = true;
            }
            streamDTOList.add(new ObjectDTO(object.getID().longValue(), object.getName(), value));

        }

        return streamDTOList;
    }







}