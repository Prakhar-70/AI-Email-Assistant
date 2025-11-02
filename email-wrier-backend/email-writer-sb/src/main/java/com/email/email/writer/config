package com.email.email.writer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                            // ✅ Frontend hosted on Vercel
                            "https://ai-email-assistant-eta.vercel.app",
                            // ✅ Chrome Extension (allows any extension origin)
                            "chrome-extension://nkphoahdhikpdhgaknihibljdkbchiaa", 
                            // ✅ Local dev frontend (optional)
                            "http://localhost:3000",
                            // ✅ Gmail domain (for your content script)
                            "https://mail.google.com"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .exposedHeaders("Access-Control-Allow-Origin")
                        .allowCredentials(true);
            }
        };
    }
}

