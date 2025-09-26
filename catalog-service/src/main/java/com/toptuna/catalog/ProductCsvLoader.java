package com.toptuna.catalog;
import org.apache.commons.csv.*; import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource; import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct; import java.io.*; import java.nio.charset.StandardCharsets;
import java.util.*; import java.util.stream.Collectors;

@Component
public class ProductCsvLoader {
  @Value("${toptuna.catalog.seedFile}") private Resource csv;
  private List<Product> products = new ArrayList<>();

  @PostConstruct
  void load() throws Exception {
    try (Reader r = new BufferedReader(new InputStreamReader(csv.getInputStream(), StandardCharsets.UTF_8))) {
      Iterable<CSVRecord> recs = CSVFormat.DEFAULT
        .withHeader("sku","name_de","name_vi","category","unit","base_price_eur","origin","allergens","notes")
        .withFirstRecordAsHeader().parse(r);
      for (CSVRecord rec : recs) {
        products.add(new Product(
          rec.get("sku"), rec.get("name_de"), rec.get("name_vi"), rec.get("category"),
          rec.get("unit"), Double.parseDouble(rec.get("base_price_eur")),
          rec.get("origin"), rec.get("allergens"), rec.get("notes")
        ));
      }
    }
  }

  public List<Product> all(){ return products; }

  public List<Product> search(String q, String category){
    return products.stream().filter(p -> {
      boolean ok = true;
      if (q!=null && !q.isBlank()) {
        String hay = (p.nameDe()+" "+p.nameVi()+" "+p.sku()).toLowerCase();
        ok &= hay.contains(q.toLowerCase());
      }
      if (category!=null && !category.isBlank()) ok &= category.equalsIgnoreCase(p.category());
      return ok;
    }).collect(Collectors.toList());
  }
}
