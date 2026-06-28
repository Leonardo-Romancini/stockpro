package com.example.stockprodesk;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.io.IOException;

public class LoginController {
    @FXML
    private TextField txtLogin;

    @FXML
    private TextField txtSenha;

    @FXML
    private void onLoginButtonClick(ActionEvent event) throws IOException {

        if (txtLogin.getText().equals("admin")&& txtSenha.getText().equals("123")){
            showMessage("Login efetuado com sucesso!", Alert.AlertType.INFORMATION);

            FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
            Scene scene = new Scene(loader.load());
            Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            stage.setScene(scene);
        } else {
            showMessage("Usuário e senha inválido!", Alert.AlertType.INFORMATION);
        }

    }

    private void showMessage(String mensagem, Alert.AlertType tipo){
        Alert alert = new Alert(tipo);
        alert.setTitle("Login");
        alert.setHeaderText(null);
        alert.setContentText(mensagem);
        alert.showAndWait();
    }
}
