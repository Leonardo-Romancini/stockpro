package com.example.stockprodesk;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class UsuarioController {

    @FXML
    private TextField txtNome;

    @FXML
    private TextField txtEmail;

    @FXML
    private TextField txtCNPJ;

    @FXML
    private TextField txtSenha;

    @FXML
    private void onVoltarButtonClick(ActionEvent event) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
        Scene scene = new Scene(loader.load());
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setScene(scene);
    }

    @FXML
    private void onCadastroButtonClick(ActionEvent event) throws IOException {

        URL url = new URL("http://localhost:8080/usuarios/adm");

        HttpURLConnection conn =(HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type","application/json");
        conn.setDoOutput(true);

        String json = "{\n" +
                "  \"nome\": \""+txtNome.getText()+"\",\n" +
                "  \"email\": \""+txtEmail.getText()+"\",\n" +
                "  \"senha\": \""+txtSenha.getText()+"\",\n" +
                "  \"cnpj\": \""+txtCNPJ.getText()+"\",\n" +
                "  \"secretKey\": \"eodjotrlazjirtorihjaoarijt\"\n" +
                "}";

        try(OutputStream os = conn.getOutputStream()){
            os.write(json.getBytes());
        }

        var code = conn.getResponseCode();
        if ( code == 200) {
            showMessage("Sucesso ao salvar!", Alert.AlertType.INFORMATION);

            FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
            Scene scene = new Scene(loader.load());
            Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            stage.setScene(scene);
        } else {
            showMessage("Falha ao salvar!", Alert.AlertType.INFORMATION);
        }

        conn.disconnect();

    }

    private void showMessage(String mensagem, Alert.AlertType tipo){
        Alert alert = new Alert(tipo);
        alert.setTitle("Login");
        alert.setHeaderText(null);
        alert.setContentText(mensagem);
        alert.showAndWait();
    }
}
