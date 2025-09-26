package com.toptuna.logistics;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController @RequestMapping("/api/logistics")
public class LogisticsController {

  @GetMapping("/health")
  public String health(){ return "OK"; }

  @GetMapping("/routes/today")
  public List<Route> getTodayRoutes(){
    return List.of(
      new Route("route_001", LocalDate.now(), "Nguyen Van Duc", "In Zustellung",
        List.of(
          new Stop("ord_001", "Saigon Sushi Berlin", "Kantstraße 12, Berlin", 
            LocalDateTime.now().plusHours(2), null, "Kühlkette 2°C", "Geplant"),
          new Stop("ord_002", "Golden Dragon", "Hauptstraße 45, Heidelberg",
            LocalDateTime.now().plusHours(4), null, "Kühlkette 2°C", "Geplant")
        ), "Kühlfahrzeug TK-001, Temperatur überwacht"),
      new Route("route_002", LocalDate.now(), "Tran Van Minh", "Kommissioniert",
        List.of(
          new Stop("ord_003", "Thai Lotus München", "Maximilianstraße 8, München",
            LocalDateTime.now().plusHours(6), null, "Kühlkette 2°C", "Kommissioniert")
        ), "Kühlfahrzeug TK-002")
    );
  }

  @GetMapping("/routes/{routeId}/packlist")
  public Map<String, Object> getPacklist(@PathVariable String routeId){
    return Map.of(
      "routeId", routeId,
      "driver", "Nguyen Van Duc",
      "date", LocalDate.now().toString(),
      "items", List.of(
        Map.of("sku", "TT-SAL-FI-001", "qty", 15, "restaurant", "Saigon Sushi"),
        Map.of("sku", "TT-TUN-LO-003", "qty", 8, "restaurant", "Saigon Sushi"),
        Map.of("sku", "TT-SHR-BT-02630", "qty", 12, "restaurant", "Golden Dragon")
      ),
      "haccp", "Kühlkette durchgehend 2°C, Fahrzeug TK-001"
    );
  }

  @PostMapping("/routes/{routeId}/stops/{stopId}/deliver")
  public Map<String, String> markDelivered(@PathVariable String routeId, 
                                          @PathVariable String stopId,
                                          @RequestBody Map<String, String> notes){
    return Map.of(
      "status", "Geliefert",
      "deliveredAt", LocalDateTime.now().toString(),
      "temperatureNote", notes.getOrDefault("temperature", "2°C OK"),
      "signature", "Empfangen von: " + notes.getOrDefault("recipient", "Restaurant")
    );
  }
}
