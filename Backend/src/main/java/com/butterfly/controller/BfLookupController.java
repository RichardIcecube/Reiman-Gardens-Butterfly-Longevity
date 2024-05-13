package com.butterfly.controller;

import com.butterfly.entity.BfLookup;
import com.butterfly.repository.BfLookupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*") // Add this annotation to enable CORS
public class BfLookupController {

    @Autowired
    private BfLookupRepository bfLookupRepository;

    @GetMapping("/bflookup")
    public List<BfLookup> getBfLookup() {
        return bfLookupRepository.findAll();
    }

    @PostMapping("/bflookup")
    public String addBfLookup(@RequestBody BfLookup bfLookup) {
        bfLookupRepository.save(bfLookup);
        return "Entry added successfully.";
    }

    @DeleteMapping("/bflookup")
    public String wipeDatabase() {
        bfLookupRepository.deleteAll();
        return "Database wiped successfully.";
    }

    // @PostMapping("/sciName/$name")
    // public BfLookup getBySci(@RequestParam String name) {
    //     return bfLookupRepository.findBySci(name);
    // }

    // @PostMapping("/normName/$name")
    // public BfLookup getByNorm(@RequestParam String name) {
    //     return bfLookupRepository.findByNorm(name);
    // }
    
}
