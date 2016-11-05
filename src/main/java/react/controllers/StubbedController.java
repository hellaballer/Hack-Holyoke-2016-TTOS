package react.controllers;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.LinkedList;
import java.util.List;

/**
 * GET request that accepts a string of words and returns the path to the video
 */
@Controller
@RequestMapping("/api")
public class StubbedController {
    @RequestMapping(method = RequestMethod.GET, value = "stub")
    HttpEntity<String> stub(@RequestParam("paramValue") String paramValue){
        return new ResponseEntity<>("URL_TO_VIDEO", HttpStatus.OK);
    }
}
