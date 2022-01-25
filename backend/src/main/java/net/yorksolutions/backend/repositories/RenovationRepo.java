package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.RenovationPlan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RenovationRepo extends CrudRepository<RenovationPlan, Long> {
}
