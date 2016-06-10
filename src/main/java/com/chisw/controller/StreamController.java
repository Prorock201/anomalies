package com.chisw.controller;

import com.chisw.dto.JsonToFrontEnd;
import com.chisw.xml.Parse;
import org.springframework.web.bind.annotation.*;

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


}
