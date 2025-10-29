package com.email.email.writer;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    public final EmailGeneratorService emailGeneratorService;

        @PostMapping("/generate")
        ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
            String response = emailGeneratorService.generateEmailReply(emailRequest);
            return ResponseEntity.ok(response);
        }

}
