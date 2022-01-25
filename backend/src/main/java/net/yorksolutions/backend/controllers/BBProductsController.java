package net.yorksolutions.backend.controllers;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.yorksolutions.backend.models.Product;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class BBProductsController {
    private static class ProductList {
        @JsonProperty
        int from;
        @JsonProperty
        int to;
        @JsonProperty
        int currentPage;
        @JsonProperty
        int total;
        @JsonProperty
        int totalPages;
        @JsonProperty
        Float queryTime;
        @JsonProperty
        Float totalTime;
        @JsonProperty
        boolean partial;
        @JsonProperty
        String canonicalUrl;
        @JsonProperty
        List<Product> products;
    }

    private String keyParam = "&apiKey=rZF37GU0d0GrH2JG44TOVzYo";
    private String fields = "sku,name,regularPrice,salePrice,customerReviewCount,customerReviewAverage,manufacturer,modelNumber," +
            "image,images,color,dollarSavings,details,includedItemList,features,upc";
    private String sort = "&sort=customerReviewCount.dsc,customerReviewAverage.dsc,startDate.dsc";
    private String classes = "PREMIUM FPTV,VIDEO GAME HARDWARE,GAME PERIPHERALS,HOME FURNITURE,GAMING LAPTOPS,GAMING DESKTOPS,CARDS/COMPONENTS," +
            "PC GAMING ACCYS";
    private String subClasses = "TV STANDS,SOUNDBARS,GAMING MONITORS,GRAPHICS,GAMING MICE,GAMING KEYBOARD,GAMING HEADSET,GAMING ACCYS,CC LIGHTING";
    private String categoryPathNames = "Webcams,Condenser Microphones,LED Lighting";
    private String oneYearAgo = LocalDate.now().minusYears(1).toString();

    @CrossOrigin
    @GetMapping("/bySku")
    Product prodBySku(int sku) {
        RestTemplate rest = new RestTemplate();
        String url = "https://api.bestbuy.com/v1/products/" + sku + ".json?show=all" + keyParam;
        var response = rest.getForObject(url, Product.class);
        return response;
    }

    @CrossOrigin
    @GetMapping("/byCategory")
    Object productsByCategory(String category) {
        RestTemplate rest = new RestTemplate();
        String url = "https://api.bestbuy.com/v1/products(categoryPath.name=\"" + category + "\")?format=json&pageSize=50" + sort + keyParam;
        System.out.println(url);
        return rest.getForObject(url, Object.class);
    }

    @CrossOrigin
    @GetMapping("/search")
    Object search(@RequestParam String search, String category) {
        RestTemplate rest = new RestTemplate();
        String url = category == null ? "https://api.bestbuy.com/v1/products(search=" + search + ")?format=json" + keyParam :
                "https://api.bestbuy.com/v1/products(search=" + search + "&categoryPath.name=\"" + category + "\")?format=json" + sort + keyParam;
        var response = rest.getForObject(url, Object.class);
        return response;
    }

    @CrossOrigin
    @GetMapping("/byClass")
    ProductList productsByClass(String className) {
        RestTemplate rest = new RestTemplate();
        var extraParams = "";
        if (className.equals("PREMIUM FPTV")) extraParams += "&startDate>" + oneYearAgo;
        String url = "https://api.bestbuy.com/v1/products(class=" + className + extraParams + ")?format=json&show=" + fields + "&pageSize=20" + sort + keyParam;
        var response = rest.getForObject(url, ProductList.class);
        System.out.println(oneYearAgo);
        return response;
    }

    @CrossOrigin
    @GetMapping("/byClassAndCategory")
    ProductList productsByClassAndCategory(@RequestParam String className, @RequestParam String category) {
        RestTemplate rest = new RestTemplate();
        var extraParams = "";
        if (className.equals("PREMIUM FPTV")) extraParams += "&startDate>" + oneYearAgo;
        String url = "https://api.bestbuy.com/v1/products(class=" + className + "&categoryPath.name=\"" + category + "\"" + extraParams + ")?format=json&show=" + fields + "&pageSize=20" + sort + keyParam;
        var response = rest.getForObject(url, ProductList.class);
        System.out.println(oneYearAgo);
        return response;
    }

    @CrossOrigin
    @GetMapping("/bySubclassAndCategory")
    ProductList productsBySubclassAndCategory(@RequestParam String subclass, @RequestParam String category) {
        RestTemplate rest = new RestTemplate();
        String url = "https://api.bestbuy.com/v1/products(subclass=" + subclass + "&categoryPath.name=\"" + category + "\")?format=json&show=" + fields + "&pageSize=20" + sort + keyParam;
        var response = rest.getForObject(url, ProductList.class);
        System.out.println(oneYearAgo);
        return response;
    }

    @CrossOrigin
    @GetMapping("/bySubclass")
    Object productsBySubclass(String subclass) {
        RestTemplate rest = new RestTemplate();
        String url = "https://api.bestbuy.com/v1/products(subclass=" + subclass + ")?format=json" + sort + keyParam;
        var response = rest.getForObject(url, Object.class);
        return response;
    }
}
