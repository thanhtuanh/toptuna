package com.toptuna.catalog.ai;

public interface AIProvider {
    String generateText(String prompt);
    String getProviderName();
    boolean isAvailable();
}
