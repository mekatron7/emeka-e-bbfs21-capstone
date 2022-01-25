package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.Item;
import net.yorksolutions.backend.models.RenovationPlan;
import net.yorksolutions.backend.models.RenovationType;
import net.yorksolutions.backend.repositories.ItemRepo;
import net.yorksolutions.backend.repositories.RenovationRepo;
import net.yorksolutions.backend.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/renovations")
public class RenovationsController {
    @Autowired
    UserRepo userRepo;

    @Autowired
    RenovationRepo renovationRepo;

    @Autowired
    ItemRepo itemRepo;

    @CrossOrigin
    @PutMapping("/newRenovation")
    String newRenovation(@RequestHeader Long id, @RequestHeader String type) {
        var user = userRepo.findById(id).orElseThrow();
        String defaultName = "Home Theater Plan";
        RenovationType renovationType = RenovationType.HOME_THEATER;
        var defaultItemSpots = new ArrayList<Item>();

        if (type.equals("pc")) {
            defaultName = "PC Gamer Plan";
            renovationType = RenovationType.PC;
        } else if (type.equals("pcs")) {
            defaultName = "PC Streamer Plan";
            renovationType = RenovationType.PC_STREAMER;
        }
        var renovation = new RenovationPlan(id, defaultName, renovationType);

        switch(renovationType) {
            case HOME_THEATER:
                defaultItemSpots.add(new Item("TV", renovation.id));
                defaultItemSpots.add(new Item("Sound System", renovation.id));
                defaultItemSpots.add(new Item("Console", renovation.id));
                defaultItemSpots.add(new Item("TV Stand", renovation.id));
                break;
            case PC:
                defaultItemSpots.add(new Item("PC", renovation.id));
                defaultItemSpots.add(new Item("Keyboard", renovation.id));
                defaultItemSpots.add(new Item("Mouse", renovation.id));
                defaultItemSpots.add(new Item("Monitor", renovation.id));
                defaultItemSpots.add(new Item("Headset", renovation.id));
                break;
            case PC_STREAMER:
                defaultItemSpots.add(new Item("PC", renovation.id));
                defaultItemSpots.add(new Item("Keyboard", renovation.id));
                defaultItemSpots.add(new Item("Mouse", renovation.id));
                defaultItemSpots.add(new Item("Monitor", renovation.id));
                defaultItemSpots.add(new Item("Headset", renovation.id));
                defaultItemSpots.add(new Item("Camera", renovation.id));
                defaultItemSpots.add(new Item("Microphone", renovation.id));
                defaultItemSpots.add(new Item("Lighting", renovation.id));
                defaultItemSpots.add(new Item("Stream Deck", renovation.id));
        }

        renovation.items.addAll(defaultItemSpots);
        user.planList.add(renovation);
        renovationRepo.save(renovation);
        userRepo.save(user);
        return "success";
    }

    @CrossOrigin
    @PutMapping("/editRenovation")
    String editRenovation(@RequestBody RenovationPlan renovation) {
        renovationRepo.save(renovation);
        return "success";
    }

    @CrossOrigin
    @PutMapping("/editItem")
    String editItem(@RequestBody Item item) {
        itemRepo.save(item);
        return "success";
    }

    @CrossOrigin
    @DeleteMapping("/deleteRenovation")
    String deleteRenovation(@RequestHeader Long id) {
        renovationRepo.deleteById(id);
        return "success";
    }

    @CrossOrigin
    @DeleteMapping("/deleteItem")
    String deleteItem(@RequestHeader Long id) {
        itemRepo.deleteById(id);
        return "success";
    }

    @CrossOrigin
    @GetMapping("/getRenovations")
    List<RenovationPlan> getRenovations(@RequestHeader Long userId) {
        return userRepo.findById(userId).get().planList;
    }
}
