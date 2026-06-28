module com.example.stockprodesk {
    requires javafx.controls;
    requires javafx.fxml;
    requires com.google.gson;

    opens DTO to com.google.gson, javafx.fxml;

    opens com.example.stockprodesk to javafx.fxml;
    exports com.example.stockprodesk;
}