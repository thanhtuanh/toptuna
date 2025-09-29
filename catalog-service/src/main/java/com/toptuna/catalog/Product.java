package com.toptuna.catalog;
public record Product(
  String sku, String nameDe, String nameEn, String nameVi, String category,
  String unit, double basePriceEur, String origin, String allergens, String notes
) {}
