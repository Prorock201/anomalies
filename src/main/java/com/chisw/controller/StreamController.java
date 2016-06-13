package com.chisw.controller;

import com.chisw.dto.JsonToFrontEnd;
import com.chisw.dto.ObjectDTO;
import com.chisw.xml.anomaliesstream.Parse;
import com.chisw.xml.objectsstream.ParseObject;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by user on 3/28/2016.
 */

@RestController
public class StreamController {


    @CrossOrigin
    @RequestMapping(value = "/streams", method = RequestMethod.GET, produces="application/json")
    @ResponseBody
    public JsonToFrontEnd getStreams(){
        JsonToFrontEnd jsonToFrontEnd = Parse.parseURl();
        return jsonToFrontEnd;
    }

    @CrossOrigin
    @RequestMapping(value = "/objects", method = RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<ObjectDTO> getObjects(){

        return ParseObject.parseURl();
    }



}
