package com.ipartek.formacion.model;

import java.util.ArrayList;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class Persona {

	private int id;	
	
	@Size( min=2, max = 50, message = "minimo 2 maximo 50 carcateres" )
	private String nombre;	
	
	@NotEmpty(message = "No puede estar el campo vacio" )
	private String avatar;
	
	// @Pattern(regexp = "" )
	private String sexo;
	private int rol;
	
	private ArrayList<Curso> cursos;
	
	public Persona() {
		super();
		this.id = 0;
		this.nombre = "";		
		this.avatar = "avatar1.png";
		this.sexo = "";
		this.rol = 1;
		
		this.cursos = new ArrayList<Curso>();
	}

	public Persona(int id, String nombre, String avatar, String sexo, int rol) {		
		this();
		this.id = id;
		this.nombre = nombre;
		this.avatar = avatar;
		this.sexo = sexo;
		this.rol = rol;
		
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public int getRol() {
		return rol;
	}

	public void setRol(int rol) {
		this.rol = rol;
	}

	public ArrayList<Curso> getCursos() {
		return cursos;
	}

	public void setCursos(ArrayList<Curso> cursos) {
		this.cursos = cursos;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((avatar == null) ? 0 : avatar.hashCode());
		result = prime * result + ((cursos == null) ? 0 : cursos.hashCode());
		result = prime * result + id;
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		result = prime * result + rol;
		result = prime * result + ((sexo == null) ? 0 : sexo.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Persona other = (Persona) obj;
		if (avatar == null) {
			if (other.avatar != null)
				return false;
		} else if (!avatar.equals(other.avatar))
			return false;
		if (cursos == null) {
			if (other.cursos != null)
				return false;
		} else if (!cursos.equals(other.cursos))
			return false;
		if (id != other.id)
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		if (rol != other.rol)
			return false;
		if (sexo == null) {
			if (other.sexo != null)
				return false;
		} else if (!sexo.equals(other.sexo))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Persona [id=" + id + ", nombre=" + nombre + ", avatar=" + avatar + ", sexo=" + sexo + ", rol=" + rol
				+ ", cursos=" + cursos + "]";
	}
	
	

	
	
}
