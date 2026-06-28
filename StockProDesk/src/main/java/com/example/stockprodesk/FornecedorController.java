package com.example.stockprodesk;

import DTO.FornecedorDTO;
import com.google.gson.Gson;
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
import java.nio.charset.StandardCharsets;

public class FornecedorController {

    @FXML
    private TextField txtCnpj;

    @FXML
    private TextField txtRazaoSocial;
    @FXML
    private TextField txtNomeFantasia;
    @FXML
    private TextField txtEmail;

    @FXML
    private void onBuscarButtonClick(ActionEvent event) throws IOException {

        try {
            URL url = new URL("https://api.opencnpj.org/" + txtCnpj.getText());

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");


            if (conn.getResponseCode() == 200) {
                // o getInputStream trás os bytes puros enquanto o InputStreamReader transforma eles em caracteres legíveis
                //O Buffered acumula esses caracteres e permite a divisão por linhas
            /*try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                StringBuilder resposta = new StringBuilder();//basicamente serve como uma string editável
                String linha;
                //linha é utilizada para pegar as linhas separadas do buffered com a repetição para passar pro resposta
                while ((linha = br.readLine()) != null) {
                    resposta.append(linha);
                }

             */

                //Basicamente faz tudo o de cima só que em uma linha só
                String jsonResposta = new String(conn.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

                //deu um problema de não ter permissão de acessar a pasta DTO que foi resolvido botando "opens"
                Gson gson = new Gson();
                FornecedorDTO fornecedor = gson.fromJson(jsonResposta, FornecedorDTO.class);

                txtRazaoSocial.setText(fornecedor.getRzsocial());
                txtNomeFantasia.setText(fornecedor.getNomef());
                txtEmail.setText(fornecedor.getEmail());
            } else if (conn.getResponseCode() == 404) {
                showMessage("CNPJ não encontrado!", Alert.AlertType.WARNING);
            } else {
                showMessage("Erro na API externa. Código HTTP: " + conn.getResponseCode(), Alert.AlertType.ERROR);
            }
        } catch (IOException e) {
            e.printStackTrace();
            showMessage("Erro de conexão.", Alert.AlertType.ERROR);
        }
    }

    @FXML
    private void onSalvarButtonClick(ActionEvent event) throws IOException {

        URL url = new URL("http://localhost:8080/fornecedores/desk");

        HttpURLConnection conn =(HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type","application/json");
        conn.setDoOutput(true);

        String json = "{\n" +
                "  \"rzsocial\": \""+txtRazaoSocial.getText()+"\",\n" +
                "  \"nomef\": \""+txtNomeFantasia.getText()+"\",\n" +
                "  \"cnpj\": \""+txtCnpj.getText()+"\",\n" +
                "  \"email\": \""+txtEmail.getText()+"\",\n" +
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

    private void showMessage(String mensagem, Alert.AlertType tipo) {
        Alert alert = new Alert(tipo);
        alert.setTitle("CEP");
        alert.setHeaderText(null);
        alert.setContentText(mensagem);
        alert.showAndWait();
    }
}