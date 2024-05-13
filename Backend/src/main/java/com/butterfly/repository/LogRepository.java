package com.butterfly.repository;

import com.butterfly.entity.Butterfly;
import com.butterfly.entity.Log;
import com.butterfly.entity.User;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {
    // Additional custom query methods can be defined here if needed
    List<Log> findByUser(User user);
    List<Log> findByButterfly(Butterfly butterfly);
    List<Log> findByAction(String action);
    List<Log> findByCreationDateBetween(Date startDate, Date endDate);
    List<Log> findByUser_UserType(String type);

    List<Log> findByCreationDateBetweenAndAction(Date startDate, Date endDate, String action);


    List<Log> findByUserOrderByCreationDateDesc(User user);
    List<Log> findByButterflyOrderByCreationDateDesc(Butterfly butterfly);
    List<Log> findByActionOrderByCreationDateDesc(String action);

    List<Log> findByButterfly_StatusOrderByCreationDateDesc(String status);

    List<Log> findByButterflyAndActionOrderByCreationDateDesc(Butterfly butterfly, String action);

    List<Log> findByButterflyAndButterfly_StatusOrderByCreationDateDesc(Butterfly butterfly, String status);

    List<Log> findByButterfly_SciNameOrderByCreationDateDesc(String sciName);

    List<Log> findByButterfly_SciNameAndButterfly_StatusOrderByCreationDateDesc(String sciName, String status);

    // List<Log> findByButterflyAction(Butterfly butterfly, String action);
}
