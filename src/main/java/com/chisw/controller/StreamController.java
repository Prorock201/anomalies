package com.chisw.controller;

import com.chisw.xml.LSResponse;
import com.chisw.xml.Parse;
import com.chisw.xml.Stream;
import org.springframework.stereotype.Controller;
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
    public LSResponse getStreams(){
        return Parse.parseURl();
    }


}
