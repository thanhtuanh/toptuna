package com.toptuna.catalog;
import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/catalog")
public class ProductController {
  private final ProductCsvLoader loader;
  public ProductController(ProductCsvLoader l){ this.loader = l; }

  @GetMapping("/products")
  public List<Product> products(@RequestParam(required=false) String q,
                                @RequestParam(required=false) String category){
    return loader.search(q, category);
  }
}
