package com.toptuna.export;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/export")
public class ExportController {

  @GetMapping("/health")
  public String health(){ return "OK"; }

  @GetMapping("/datev/invoices")
  public Map<String, Object> exportDatevInvoices(@RequestParam String from, @RequestParam String to){
    return Map.of(
      "format", "DATEV",
      "period", from + " bis " + to,
      "records", 156,
      "totalAmount", 48750.80,
      "file", "datev_rechnungen_" + from + "_" + to + ".csv",
      "debtors", List.of(
        Map.of("debtorNo", "10001", "name", "Saigon Sushi Berlin", "amount", 2485.50),
        Map.of("debtorNo", "10002", "name", "Golden Dragon", "amount", 1325.80),
        Map.of("debtorNo", "10003", "name", "Thai Lotus München", "amount", 890.00)
      )
    );
  }

  @GetMapping("/admin/dashboard")
  public Map<String, Object> getAdminDashboard(){
    return Map.of(
      "tagesumsatz", 3250.80,
      "offeneBestellungen", 12,
      "tourenAuslastung", "85%",
      "kundenGesamt", 91,
      "neueKundenWoche", 3,
      "topProdukte", List.of("TT-SAL-FI-001", "TT-SHR-BT-02630", "TT-TUN-LO-003"),
      "regionen", Map.of(
        "Berlin", 45, "Heidelberg", 28, "München", 18
      )
    );
  }
}
