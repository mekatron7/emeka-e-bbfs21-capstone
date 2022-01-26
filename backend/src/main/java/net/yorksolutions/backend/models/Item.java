package net.yorksolutions.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Embeddable
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    public Long id;

    @JsonProperty
    public String itemSpotName;

    @JsonProperty
    public Long planId;

    @JsonProperty
    public Integer sku;

    @JsonProperty
    public boolean purchased;

    @JsonProperty
    public LocalDateTime dateAdded;

    @JsonProperty
    public LocalDateTime datePurchased;

    @JsonProperty
    public boolean defaultItemSpot;

    public Item() {
    }

    public Item(String itemSpotName, Long planId) {
        this.itemSpotName = itemSpotName;
        this.planId = planId;
        this.defaultItemSpot = true;
    }
}
