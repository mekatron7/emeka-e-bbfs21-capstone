package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.Item;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ItemRepo extends CrudRepository<Item, Long> {
    @Transactional
    void deleteByPlanId(Long planId);
}
