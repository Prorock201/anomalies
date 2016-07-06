package com.chisw.controller;

import com.chisw.dto.JsonToFrontEnd;
import com.chisw.dto.ObjectDTO;
import com.chisw.dto.StreamDTO;
import com.chisw.xml.objectsstream.ParseObject;
import com.chisw.xml.stream.Parse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
public class StreamController {



    @RequestMapping(value = "/streams", method = RequestMethod.GET, produces="application/json")
    @ResponseBody
    public JsonToFrontEnd getStreams(){
        JsonToFrontEnd jsonToFrontEnd = Parse.parseURl();
        return jsonToFrontEnd;
    }


    @RequestMapping(value = "/objects", method = RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<ObjectDTO> getObjects(){

        return ParseObject.parseURl();
    }

    @RequestMapping(value = "/updateStream", method = RequestMethod.POST)
    public ResponseEntity<StreamDTO> getEducationById(@RequestBody StreamDTO streamDTO,
                                                      @RequestParam("date") long time) {

        StreamDTO newStream = streamDTO;
        Date d = new Date(time * 1000);
        int day = d.getDay();
        int month = d.getMonth();
        newStream.setAnomalies(com.chisw.xml.anomaly.Parse.getStreamAnomalyByDate(newStream.getId(), day, month ));
        return ResponseEntity.ok(newStream);
    }





}
