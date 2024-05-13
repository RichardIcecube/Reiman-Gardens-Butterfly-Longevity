package com.butterfly.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.butterfly.service.ButterflyService;
import com.butterfly.service.UserService;
import com.butterfly.service.LogService;
import com.butterfly.entity.Butterfly;
import com.butterfly.entity.PublicBFView;
import com.butterfly.entity.MinimalUser;

import java.util.Date;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/butterflies")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ButterflyController {

  private final ButterflyService butterflyService;
  private final UserService userService;
  private final LogService logService;

  @Autowired
  public ButterflyController(ButterflyService butterflyService, UserService userService, LogService logService) {
    this.butterflyService = butterflyService;
    this.userService = userService;
    this.logService = logService;
  }

  @GetMapping
  public ResponseEntity<List<Butterfly>> getAllButterflies() {
    List<Butterfly> butterflies = butterflyService.getAllButterflies();
    return new ResponseEntity<>(butterflies, HttpStatus.OK);
  }

  @PostMapping("/view")
  public ResponseEntity<PublicBFView> createView(@RequestBody PublicBFView entry) {
    if (butterflyService.findButterflyByAlpha(entry.getAlphaCode()) == null)
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    else
      logService.createLogViaBFView(entry, "Public Sighting");
    return new ResponseEntity<PublicBFView>(entry, HttpStatus.OK);
  }

  @PostMapping("/alpha")
  public Butterfly getByAlpha(@RequestBody MinimalUser alpha) {
    return butterflyService.findButterflyByAlpha(alpha.getUsername());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Butterfly> getButterflyById(@PathVariable("id") Long id) {
    Butterfly butterfly = butterflyService.getButterflyById(id);
    if (butterfly != null) {
      return new ResponseEntity<>(butterfly, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping
  public ResponseEntity<Butterfly[]> createButterfly(@RequestBody Butterfly[] butterfly) {
    Butterfly[] createdButterfly = new Butterfly[butterfly.length];
    for (int i = 0; i < butterfly.length; i++) {
      // Set creation date
      if (butterfly[i].getAlphaCode() != null) {
        if (butterflyService.findButterflyByAlpha(butterfly[i].getAlphaCode()) == null) {
          if (butterfly[i].getSciName() == null || butterfly[i].getNormName() == null
              || butterfly[i].getAlphaCode() == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
          if (butterfly[i].getCreationDate() == null)
            butterfly[i].setCreationDate(new Date());
          if (butterfly[i].getTotViews() == null)
            butterfly[i].setTotViews(0);
          if(butterfly[i].getUser() == null || butterfly[i].getUser().isEmpty()) {
            butterfly[i].setUser("None...");
          }
          butterfly[i].setStatus("alive");
          butterfly[i].setAlphaCode(butterfly[i].getAlphaCode().toUpperCase());
          createdButterfly[i] = butterflyService.createButterfly(butterfly[i]);
        } else {
          return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
      }
      PublicBFView entry = new PublicBFView(butterfly[i].getAlphaCode(), butterfly[i].getUser());
      logService.createLogViaBFView(entry, "Butterfly created");
    }
    return new ResponseEntity<>(createdButterfly, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Butterfly> updateButterfly(@PathVariable("id") Long id, @RequestBody Butterfly updatedButterfly) {
    Butterfly updated = butterflyService.updateButterfly(id, updatedButterfly);
    if (updated != null) {
      return new ResponseEntity<>(updated, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteButterflyById(@PathVariable("id") Long id) {
    butterflyService.deleteButterfly(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @DeleteMapping("/sciName/{sciName}")
  public ResponseEntity<Void> deleteButterflyBySciName(@PathVariable("sciName") String sciName) {
    butterflyService.deleteButterflyBySciName(sciName);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
