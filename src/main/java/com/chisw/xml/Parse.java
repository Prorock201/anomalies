package com.chisw.xml;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import java.io.File;
import java.io.StringReader;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by user on 3/21/2016.
 */
public class Parse {


    public static JsonToFrontEnd parseURl() {
        String urlString = "";
        JAXBContext jaxbContext = null;
        try {
            jaxbContext = JAXBContext.newInstance(LSResponse.class);
        } catch (JAXBException e) {
            e.printStackTrace();
        }

       /* URL url = null;
        try {
            url = new URL(urlString);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }*/
        Unmarshaller jaxbUnmarshaller = null;
        try {
            jaxbUnmarshaller = jaxbContext.createUnmarshaller();
        } catch (JAXBException e) {
            e.printStackTrace();
        }
        File file = new File("D:\\LeadSpottingApi.jsp.xml");
        LSResponse lsResponseType = null;
        try {
            lsResponseType = (LSResponse) jaxbUnmarshaller.unmarshal(file);
        } catch (JAXBException e) {
            e.printStackTrace();
        }


        return convert(lsResponseType);
    }

    private static JsonToFrontEnd convert(LSResponse lsResponse) {
        String [] strings = splitSummary(lsResponse);
        return new JsonToFrontEnd(strings[0], strings[1] ,lsResponse.getStream(), lsResponse.getAnomalies().getAnomaly());

    }

    private static String[] splitSummary(LSResponse lsResponse) {
        String[] strings = lsResponse.getSummary().split("Last");
        String swap = strings[1];
        strings[1] = "Last" + swap;
        return strings;
    }

}
