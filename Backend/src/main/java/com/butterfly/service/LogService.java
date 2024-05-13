package com.butterfly.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.butterfly.repository.LogRepository;
import com.butterfly.entity.Log;
import java.util.List;
import java.util.Optional;
import com.butterfly.service.ButterflyService;
import com.butterfly.service.UserService;
import com.butterfly.entity.Butterfly;
import com.butterfly.entity.User;
import com.butterfly.entity.PublicBFView;
import java.util.Date;
import java.util.Calendar;


@Service
public class LogService {

    private final LogRepository logRepository;
    private final ButterflyService butterflyService;
    private final UserService userService;

    @Autowired
    public LogService(LogRepository logRepository, ButterflyService butterflyService, UserService userService) {
        this.logRepository = logRepository;
        this.butterflyService = butterflyService;
        this.userService = userService;
    }

    public List<Log> getAllLogs() { // DELETE BEFORE FINALIZING
        return logRepository.findAll();
    }

    public List<Log> getLogsByUserType(String type) {
        return logRepository.findByUser_UserType(type);
    }

    public Log getLogById(Long id) {
        return logRepository.findById(id)
                .orElse(null);
    }
    public void anonymizeLogs(List<Log> foundLogs) {
        for(int i =0; i < foundLogs.size(); i++) {
            Log curLog = foundLogs.get(i);
            Log tmpLog = new Log();
            tmpLog.setAction(curLog.getAction());
            tmpLog.setButterfly(curLog.getButterfly());
            tmpLog.setId(curLog.getId());
            tmpLog.setCreationDate(curLog.getCreationDate());
            User tmp = new User();
            tmp.setUsername(curLog.getUser().getUsername());
            tmp.setUserType(curLog.getUser().getUserType());
            tmpLog.setUser(tmp);
            foundLogs.set(i, tmpLog);
        }
    }

    public List<Log> getLogsByAction(String action) {
        return logRepository.findByAction(action);
    }


    public List<Log> getLogsByButterfly(Butterfly butterfly) {
        return logRepository.findByButterfly(butterfly);
    }

    public List<Log> getLogsByDate(Date givenDate) {
        // Set the start time to midnight of the given date
        Calendar startOfDay = Calendar.getInstance();
        startOfDay.setTime(givenDate);
        startOfDay.set(Calendar.HOUR_OF_DAY, 0);
        startOfDay.set(Calendar.MINUTE, 0);
        startOfDay.set(Calendar.SECOND, 0);

        // Set the end time to midnight of the next day
        Calendar endOfDay = Calendar.getInstance();
        endOfDay.setTime(givenDate);
        endOfDay.add(Calendar.DAY_OF_MONTH, 1); // Move to the next day
        endOfDay.set(Calendar.HOUR_OF_DAY, 0);
        endOfDay.set(Calendar.MINUTE, 0);
        endOfDay.set(Calendar.SECOND, 0);

        return logRepository.findByCreationDateBetween(startOfDay.getTime(), endOfDay.getTime());
    }

    public List<Log> getLogsByDateAction(Date givenDate, String action) {
        // Set the start time to midnight of the given date
        Calendar startOfDay = Calendar.getInstance();
        startOfDay.setTime(givenDate);
        startOfDay.set(Calendar.HOUR_OF_DAY, 0);
        startOfDay.set(Calendar.MINUTE, 0);
        startOfDay.set(Calendar.SECOND, 0);

        // Set the end time to midnight of the next day
        Calendar endOfDay = Calendar.getInstance();
        endOfDay.setTime(givenDate);
        endOfDay.add(Calendar.DAY_OF_MONTH, 1); // Move to the next day
        endOfDay.set(Calendar.HOUR_OF_DAY, 0);
        endOfDay.set(Calendar.MINUTE, 0);
        endOfDay.set(Calendar.SECOND, 0);

        return logRepository.findByCreationDateBetweenAndAction(startOfDay.getTime(), endOfDay.getTime(), action);
    }

    public List<Log> getLogsByButterflyDateSorted(Butterfly butterfly) {
        return logRepository.findByButterflyOrderByCreationDateDesc(butterfly);
    }

    public List<Log> getLogsByButterflySpeciesAlive(String sciName) {
        return logRepository.findByButterfly_SciNameAndButterfly_StatusOrderByCreationDateDesc(sciName, "alive");
    }

    public List<Log> getLogsByButterflySpecies(String sciName) {
      return logRepository.findByButterfly_SciNameOrderByCreationDateDesc(sciName);
  }

    public List<Log> getLogsByButterflyStatus(Butterfly butterfly, String status) {
        return logRepository.findByButterflyAndButterfly_StatusOrderByCreationDateDesc(butterfly, status);
    }

    public List<Log> getLogsByButterflyStatus(String status){
        return logRepository.findByButterfly_StatusOrderByCreationDateDesc(status);
    }


    public List<Log> getLogsByUsername(String username) {
        User foundUser = userService.getByUsername(username);
        List<Log> foundLogs = logRepository.findByUser(foundUser);
        anonymizeLogs(foundLogs);
        return foundLogs;
    }

    public Log createLog(Log log) {
        return logRepository.save(log);
    }

    public Log updateLog(Long id, Log updatedLog) {
        Optional<Log> optionalLog = logRepository.findById(id);
        if (optionalLog.isPresent()) {
            Log log = optionalLog.get();
            log.setAction(updatedLog.getAction());
            // Update other fields as needed
            return logRepository.save(log);
        }
        return null;
    }

    public Log createLogViaUserAlphaAction(String alphaCode, String user, String action) {
        PublicBFView entry = new PublicBFView(alphaCode, user);
        Butterfly refButterfly = butterflyService.findButterflyByAlpha(entry.getAlphaCode());
        User refUser = userService.getByUsername(entry.getUser());
        refButterfly.setTotViews(refButterfly.getTotViews() + 1);
        Log newLog = new Log(refButterfly, refUser, action);
        createLog(newLog); // Save log to repository
        return newLog;
      }

      public Log createLogViaBFView(PublicBFView entry, String action) {
        Butterfly refButterfly = butterflyService.findButterflyByAlpha(entry.getAlphaCode());
        User refUser = userService.getByUsername(entry.getUser());
        refButterfly.setTotViews(refButterfly.getTotViews() + 1);
        Log newLog = new Log(refButterfly, refUser, action);
        createLog(newLog); // Save log to repository
        return newLog;
    }

    public Log createLogViaBFViewDate(PublicBFView entry, String action, Date date) {
        Butterfly refButterfly = butterflyService.findButterflyByAlpha(entry.getAlphaCode());
        User refUser = userService.getByUsername(entry.getUser());
        refButterfly.setTotViews(refButterfly.getTotViews() + 1);
        Log newLog = new Log(refButterfly, refUser, action);
        createLog(newLog); // Save log to repository
        return newLog;
    }

    public void deleteLog(Long id) {
        logRepository.deleteById(id);
    }

    public void clearLogs() {
        logRepository.deleteAll();
    }
}
