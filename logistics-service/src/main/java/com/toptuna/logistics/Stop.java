package com.toptuna.logistics;
import java.time.LocalDateTime;

public record Stop(
  String orderId, String restaurantName, String address,
  LocalDateTime eta, LocalDateTime deliveredAt, 
  String temperatureNote, String status
) {}
