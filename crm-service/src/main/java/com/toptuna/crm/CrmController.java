package com.toptuna.crm;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/crm")
public class CrmController {

  @GetMapping("/health")
  public String health(){ return "OK"; }

  @GetMapping("/customers/segments")
  public Map<String, List<Customer>> getCustomerSegments(){
    List<Customer> sushi = List.of(
      new Customer("rest_001", "Saigon Sushi Berlin", "Nguyen Van Duc", "Sushi", 
        "Berlin", List.of("vi", "de"), "Premium", 485.0, "30 Tage", List.of("Stammkunde")),
      new Customer("rest_004", "Hanoi Sushi House", "Pham Thi Lan", "Sushi",
        "Berlin", List.of("vi"), "Premium", 520.0, "30 Tage", List.of("Neukunde"))
    );
    
    List<Customer> chinese = List.of(
      new Customer("rest_002", "Golden Dragon", "Tran Thi Mai", "Chinesisch",
        "Heidelberg", List.of("vi", "de"), "Standard", 325.0, "14 Tage", List.of("Stammkunde")),
      new Customer("rest_005", "Mekong Palace", "Vo Van Thanh", "Chinesisch",
        "München", List.of("vi"), "Premium", 380.0, "30 Tage", List.of("Expansion"))
    );
    
    return Map.of("Sushi", sushi, "Chinesisch", chinese);
  }

  @GetMapping("/campaigns/active")
  public List<Map<String, Object>> getActiveCampaigns(){
    return List.of(
      Map.of(
        "id", "camp_001",
        "name", "München Expansion",
        "segment", "Alle",
        "message_de", "Neue Liefergebiete in München - Jetzt bestellen!",
        "message_vi", "Khu vực giao hàng mới ở München - Đặt hàng ngay!",
        "validUntil", "2024-10-31"
      ),
      Map.of(
        "id", "camp_002", 
        "name", "Sushi Premium Aktion",
        "segment", "Sushi",
        "message_de", "Premium Lachs & Thunfisch - 10% Rabatt bei Mindestbestellung 500€",
        "message_vi", "Cá hồi & cá ngừ cao cấp - Giảm 10% khi đặt tối thiểu 500€",
        "validUntil", "2024-10-15"
      )
    );
  }

  @GetMapping("/customers/{customerId}/history")
  public Map<String, Object> getCustomerHistory(@PathVariable String customerId){
    return Map.of(
      "customerId", customerId,
      "totalOrders", 24,
      "avgOrderValue", 485.0,
      "lastOrder", "2024-09-25",
      "favoriteProducts", List.of("TT-SAL-FI-001", "TT-TUN-LO-003"),
      "loyaltyPoints", 1250,
      "notes", List.of(
        "Bevorzugt Lieferung morgens 8-10 Uhr",
        "Zahlt immer pünktlich",
        "Interessiert an Bio-Produkten"
      )
    );
  }
}
