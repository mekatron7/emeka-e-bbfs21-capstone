package net.yorksolutions.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Embeddable
public class RenovationPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    public Long id;

    @JsonProperty
    public Long userId;

    @JsonProperty
    public String planName;

    @JsonProperty
    @Enumerated(EnumType.STRING)
    public RenovationType type;

    @JsonProperty
    @ElementCollection
    public List<Item> items;

    @JsonProperty
    public Float budget;

    @JsonProperty
    public LocalDateTime dateCreated;

    @JsonProperty
    public String notes;

    public RenovationPlan() {
    }

    public RenovationPlan(Long userId, String planName, RenovationType type) {
        this.userId = userId;
        this.planName = planName;
        this.type = type;
        this.dateCreated = LocalDateTime.now();
    }
}
