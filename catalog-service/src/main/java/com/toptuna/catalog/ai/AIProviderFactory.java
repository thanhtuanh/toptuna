package com.toptuna.catalog.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AIProviderFactory {
    
    @Value("${ai.provider:auto}")
    private String preferredProvider;
    
    private final List<AIProvider> providers;
    
    public AIProviderFactory(OpenAIProvider openAI, ClaudeProvider claude, FallbackProvider fallback) {
        this.providers = List.of(openAI, claude, fallback);
    }
    
    public AIProvider getProvider() {
        // Specific provider requested
        if (!"auto".equals(preferredProvider)) {
            return providers.stream()
                .filter(p -> p.getProviderName().toLowerCase().contains(preferredProvider.toLowerCase()))
                .filter(AIProvider::isAvailable)
                .findFirst()
                .orElse(getFallbackProvider());
        }
        
        // Auto-select first available provider
        return providers.stream()
            .filter(AIProvider::isAvailable)
            .findFirst()
            .orElse(getFallbackProvider());
    }
    
    private AIProvider getFallbackProvider() {
        return providers.get(providers.size() - 1); // Last one is always fallback
    }
    
    public String getActiveProviderInfo() {
        return getProvider().getProviderName();
    }
}
