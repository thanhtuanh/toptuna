package com.toptuna.logistics;
import java.time.LocalDate;
import java.util.List;

public record Route(
  String id, LocalDate date, String driver, String status,
  List<Stop> stops, String haccp_notes
) {}
