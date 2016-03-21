package com.chisw.xml;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by user on 3/21/2016.
 */
public class Parse {


    public static LSResponse parseURl(){
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
        LSResponse lsResponseType = null;
        try {
            lsResponseType = (LSResponse) jaxbUnmarshaller.unmarshal(url);
        } catch (JAXBException e) {
            e.printStackTrace();
        }
        return  lsResponseType;
    }
}
