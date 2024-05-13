package com.butterfly.service;

import com.butterfly.entity.Butterfly;
import com.butterfly.repository.ButterflyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ButterflyService {

  private final ButterflyRepository butterflyRepository;

  @Autowired
  public ButterflyService(ButterflyRepository butterflyRepository) {
    this.butterflyRepository = butterflyRepository;
  }

  public List<Butterfly> getAllButterflies() {
    return butterflyRepository.findAll();
  }

  public Butterfly findButterflyByAlpha(String alpha) {
    return butterflyRepository.findByAlphaCode(alpha);
  }

  public Butterfly getButterflyById(Long id) {
    Optional<Butterfly> optionalButterfly = butterflyRepository.findById(id);
    return optionalButterfly.orElse(null);
  }

  public Butterfly createButterfly(Butterfly butterfly) {
    return butterflyRepository.save(butterfly);
  }

  public Butterfly updateButterfly(Long id, Butterfly butterfly) {
    Butterfly updatedButterfly = getButterflyById(id);

    if (updatedButterfly != null) {
      if (!updatedButterfly.getAlphaCode().equals(butterfly.getAlphaCode())) {
        if (butterflyRepository.findByAlphaCode(butterfly.getAlphaCode()) == null)
          updatedButterfly.setAlphaCode(butterfly.getAlphaCode());
        else
          return null;
      }
      updatedButterfly.setNormName(butterfly.getNormName());
      updatedButterfly.setSciName(butterfly.getSciName());
      updatedButterfly.setCreationDate(butterfly.getCreationDate());
      updatedButterfly.setDeathDate(butterfly.getDeathDate());
      updatedButterfly.setStatus(butterfly.getStatus());
      updatedButterfly.setTotViews(butterfly.getTotViews());
      return butterflyRepository.save(updatedButterfly);
    }
    return null;
  }

  public List<Butterfly> getButterfliesByStatus(String status) {
    return butterflyRepository.findByStatus(status);
  }

  public void deleteButterfly(Long id) {
    butterflyRepository.deleteById(id);
  }

  public void deleteButterflyBySciName(String sciName) {
    butterflyRepository.deleteBySciName(sciName);
  }

  public void clearButterflyRepository() {
    butterflyRepository.deleteAll();
  }
}