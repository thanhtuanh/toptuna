package com.toptuna.gateway;
import org.springframework.web.bind.annotation.*; @RestController
public class HealthController { @GetMapping("/health") public String ok(){ return "OK"; } }
