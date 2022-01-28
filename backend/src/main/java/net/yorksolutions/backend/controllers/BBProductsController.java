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
            "image,images,color,dollarSavings,details,includedItemList,features,upc,url";
    private String sort = "&sort=customerReviewCount.dsc,customerReviewAverage.dsc,startDate.dsc";
    private String classes = "PREMIUM FPTV,VIDEO GAME HARDWARE,GAME PERIPHERALS,HOME FURNITURE,GAMING LAPTOPS,GAMING DESKTOPS,CARDS/COMPONENTS," +
            "PC GAMING ACCYS";
    private String subClasses = "TV STANDS,SOUNDBARS,GAMING MONITORS,GRAPHICS,GAMING MICE,GAMING KEYBOARD,GAMING HEADSET,GAMING ACCYS,CC MICROPHONES,CC LIGHTING";
    private String categoryPathNames = "Webcams,Condenser Microphones,LED Lighting";
    private String oneYearAgo = LocalDate.now().minusYears(1).toString();

    @CrossOrigin
    @GetMapping("/bySku")
    Product prodBySku(@RequestHeader long sku) {
        RestTemplate rest = new RestTemplate();
        String url = "https://api.bestbuy.com/v1/products/" + sku + ".json?show=" + fields + keyParam;
        return rest.getForObject(url, Product.class);
    }

    @CrossOrigin
    @GetMapping("/byCategory")
    ProductList productsByCategory(@RequestHeader String category, Integer pageNum) {
        RestTemplate rest = new RestTemplate();
        var pageParam = pageNum == null ? "" : "&page=" + pageNum;
        String url = "https://api.bestbuy.com/v1/products(categoryPath.name=\"" + category + "\")?format=json&show=" + fields + "&pageSize=20" + pageParam + sort + keyParam;
        System.out.println(url);
        return rest.getForObject(url, ProductList.class);
    }

    @CrossOrigin
    @GetMapping("/search")
    ProductList search(@RequestHeader String search, Integer pageNum) {
        RestTemplate rest = new RestTemplate();
        var pageParam = pageNum == null ? "" : "&page=" + pageNum;
        var searchTerms = search.split(" ");
        var searchParams = "";
        for (int i = 0; i < searchTerms.length; i++) {
            var searchKey = i == 0 ? "search=" : "&search=";
            searchParams += searchKey + searchTerms[i];
        }
        String url = "https://api.bestbuy.com/v1/products(" + searchParams + ")?format=json&show=" + fields + "&pageSize=20" + pageParam + sort + keyParam;
        return rest.getForObject(url, ProductList.class);
    }

    @CrossOrigin
    @GetMapping("/byClass")
    ProductList productsByClass(@RequestHeader String className, Integer pageNum) {
        RestTemplate rest = new RestTemplate();
        var extraParams = "";
        var pageParam = pageNum == null ? "" : "&page=" + pageNum;
        if (className.equals("PREMIUM FPTV")) extraParams += "&startDate>" + oneYearAgo;
        String url = "https://api.bestbuy.com/v1/products(class=" + className + extraParams + ")?format=json&show=" + fields + "&pageSize=20" + pageParam + sort + keyParam;
        return rest.getForObject(url, ProductList.class);
    }

    @CrossOrigin
    @GetMapping("/byClassAndCategory")
    ProductList productsByClassAndCategory(@RequestHeader String className, @RequestHeader String category, Integer pageNum) {
        RestTemplate rest = new RestTemplate();
        var extraParams = "";
        var pageParam = pageNum == null ? "" : "&page=" + pageNum;
        if (className.equals("PREMIUM FPTV")) extraParams += "&startDate>" + oneYearAgo;
        String url = "https://api.bestbuy.com/v1/products(class=" + className + "&categoryPath.name=\"" + category + "\"" + extraParams + ")?format=json&show=" + fields + "&pageSize=20" + pageParam + sort + keyParam;
        return rest.getForObject(url, ProductList.class);
    }

    @CrossOrigin
    @GetMapping("/bySubclassAndCategory")
    ProductList productsBySubclassAndCategory(@RequestHeader String subclass, @RequestHeader String category, Integer pageNum) {
        RestTemplate rest = new RestTemplate();
        var pageParam = pageNum == null ? "" : "&page=" + pageNum;
        String url = "https://api.bestbuy.com/v1/products(subclass=" + subclass + "&categoryPath.name=\"" + category + "\")?format=json&show=" + fields + "&pageSize=20" + pageParam + sort + keyParam;
        return rest.getForObject(url, ProductList.class);
    }

    @CrossOrigin
    @GetMapping("/bySubclass")
    ProductList productsBySubclass(@RequestHeader String subclass, Integer pageNum) {
        RestTemplate rest = new RestTemplate();
        var pageParam = pageNum == null ? "" : "&page=" + pageNum;
        String url = "https://api.bestbuy.com/v1/products(subclass=" + subclass + ")?format=json&show=" + fields + "&pageSize=20" + pageParam + sort + keyParam;
        return rest.getForObject(url, ProductList.class);
    }

    @CrossOrigin
    @PostMapping("/byClasses")
    ProductList productsByClasses(@RequestBody List<String> classList, Integer pageNum) {
        RestTemplate rest = new RestTemplate();
        var classParams = "";
        for (var c : classList) {
            classParams += c + ",";
        }
        classParams = classParams.substring(0, classParams.length() - 1);
        var pageParam = pageNum == null ? "" : "&page=" + pageNum;
        String url = "https://api.bestbuy.com/v1/products(class in(" + classParams + "))?format=json&show=" + fields + "&pageSize=20" + pageParam + sort + keyParam;
        return rest.getForObject(url, ProductList.class);
    }
}
