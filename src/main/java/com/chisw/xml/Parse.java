package com.chisw.xml;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.File;

/**
 * Created by user on 3/21/2016.
 */
public class Parse {

    public static void main(String[] args) throws JAXBException {
        File file = new File("D:\\projects\\stream_project\\src\\main\\java\\com\\chisw\\xml\\example");
        JAXBContext jaxbContext = JAXBContext.newInstance(LSResponse.class);

        Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
        LSResponse lsResponseType = (LSResponse) jaxbUnmarshaller.unmarshal(file);
        System.out.println(lsResponseType);
    }
}
