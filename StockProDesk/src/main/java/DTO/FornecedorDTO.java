package DTO;

//deu problema de importação que teve que ser resolvido com o "requires" no modulo
import com.google.gson.annotations.SerializedName;

public class FornecedorDTO {

    @SerializedName("razao_social")
    private String rzsocial;

    //esse SerializedName é para quando o nome da variável é diferente do nome do campo do retorno da requisição
    @SerializedName("nome_fantasia")
    private String nomef;

    private String email;


    public FornecedorDTO() {
    }

    public String getRzsocial() { return rzsocial; }
    public void setRzsocial(String rzsocial) { this.rzsocial = rzsocial; }

    public String getNomef() { return nomef; }
    public void setNomef(String nomef) { this.nomef = nomef; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}