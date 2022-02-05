package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.User;
import net.yorksolutions.backend.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    UserRepo userRepo;

//    @Autowired
//    BBProductsController productsController;

    @CrossOrigin
    @PostMapping("/register")
    String register(@RequestBody User newUser) {
        var user = userRepo.findByEmail(newUser.email);
        if (user.isPresent())
            return "Sorry, an account with this email already exists.";
        userRepo.save(newUser);
        return "success";
    }

    @CrossOrigin
    @PostMapping("/login")
    HashMap<String, Object> login(@RequestBody User user) {
        var response = new HashMap<String, Object>();
        var foundUser = userRepo.findByEmailAndPassword(user.email, user.password);
        if (foundUser.isEmpty()) {
            response.put("message", "The credentials you entered aren't valid. Please try again.");
            return response;
        }
//        var theUser = foundUser.get();
//        theUser.planList.forEach(renovationPlan -> {
//            renovationPlan.items.forEach(item -> {
//                if (item.sku != null)
//                    item.productInfo = productsController.prodBySku(item.sku);
//            });
//        });
        response.put("message", "success");
        response.put("user", foundUser.get());
        return response;
    }

    @CrossOrigin
    @PutMapping("/edit")
    String editUser(@RequestBody User user) {
        var foundUser = userRepo.findByEmail(user.email);
        if (foundUser.isPresent() && !foundUser.get().email.equals(user.email))
            return "Sorry, an account with this email already exists.";
        userRepo.save(user);
        return "success";
    }

    @CrossOrigin
    @DeleteMapping("/delete")
    String deleteUser(@RequestHeader Long id) {
        userRepo.findById(id).orElseThrow();
        userRepo.deleteById(id);
        return "success";
    }

    @CrossOrigin
    @GetMapping("/getUser")
    User getUser(@RequestHeader Long id) {
        return userRepo.findById(id).orElseThrow();
    }
}
