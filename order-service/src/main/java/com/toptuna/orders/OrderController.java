package com.toptuna.orders;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;

@RestController @RequestMapping("/api/orders")
public class OrderController {

  @GetMapping("/health")
  public String health(){ return "OK"; }

  @GetMapping("/recent")
  public List<Order> getRecentOrders(){
    return List.of(
      new Order("ord_001", "rest_001", "Saigon Sushi Berlin", 
        LocalDate.of(2024,9,20), 485.50, "Geliefert", LocalDate.of(2024,9,21)),
      new Order("ord_002", "rest_002", "Golden Dragon", 
        LocalDate.of(2024,9,22), 325.80, "Geliefert", LocalDate.of(2024,9,23)),
      new Order("ord_003", "rest_003", "Thai Lotus München", 
        LocalDate.of(2024,9,24), 290.00, "In Bearbeitung", LocalDate.of(2024,9,26)),
      new Order("ord_004", "rest_001", "Saigon Sushi Berlin", 
        LocalDate.of(2024,9,25), 520.00, "Bestätigt", LocalDate.of(2024,9,27))
    );
  }

  @GetMapping("/customer/{customerId}")
  public List<Order> getCustomerOrders(@PathVariable String customerId){
    return getRecentOrders().stream()
      .filter(o -> o.customerId().equals(customerId))
      .toList();
  }
}
