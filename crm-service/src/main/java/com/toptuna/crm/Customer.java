package com.toptuna.crm;
import java.util.List;

public record Customer(
  String id, String restaurantName, String ownerName, String type,
  String location, List<String> languages, String segment,
  double avgOrderValue, String paymentTerms, List<String> tags
) {}
