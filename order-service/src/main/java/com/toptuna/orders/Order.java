package com.toptuna.orders;
import java.time.LocalDate;

public record Order(
  String id, String customerId, String restaurantName, 
  LocalDate orderDate, double totalAmount, String status, LocalDate deliveryDate
) {}
