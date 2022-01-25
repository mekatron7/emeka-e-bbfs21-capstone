package net.yorksolutions.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Product {
    private static class Image {
        @JsonProperty
        String href;
        @JsonProperty
        int width;
        @JsonProperty
        int height;
        @JsonProperty
        boolean primary;
    }

    private static class Detail {
        @JsonProperty
        String name;
        @JsonProperty
        List<String> values;
    }

    private static class IncludedItem {
        @JsonProperty
        String includedItem;
    }

    private static class Feature {
        @JsonProperty
        String feature;
    }

    @JsonProperty
    int sku;
    @JsonProperty
    String name;
    @JsonProperty
    Float regularPrice;
    @JsonProperty
    Float salePrice;
    @JsonProperty
    int customerReviewCount;
    @JsonProperty
    Float customerReviewAverage;
    @JsonProperty
    String manufacturer;
    @JsonProperty
    String modelNumber;
    @JsonProperty
    String image;
    @JsonProperty
    List<Image> images;
    @JsonProperty
    String color;
    @JsonProperty
    Float dollarSavings;
    @JsonProperty
    List<Detail> details;
    @JsonProperty
    List<IncludedItem> includedItemList;
    @JsonProperty
    List<Feature> features;
    @JsonProperty
    String upc;
}
