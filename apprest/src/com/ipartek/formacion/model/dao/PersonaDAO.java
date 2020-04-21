package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.api.controller.CursoController;
import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.Persona;

public class PersonaDAO implements IDAO<Persona> {
	private static final Logger LOGGER = Logger.getLogger(CursoController.class.getCanonicalName());
	// SINGLETON

	private final static PersonaDAO INSTANCIA = new PersonaDAO();

	private PersonaDAO() {

	}

	public static PersonaDAO getInstancia() {
		return INSTANCIA;
	}

	// FIN SINGLETON

	@Override
	public List<Persona> getAll() {

		ArrayList<Persona> registros = new ArrayList<Persona>();
		HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();
		String sql = "SELECT p.id as persona_id, p.nombre as persona_nombre, p.avatar as persona_avatar, p.sexo as persona_sexo, c.id as curso_id, c.nombre as curso_nombre,"
				+ " c.precio as curso_precio, c.imagen  as curso_imagen FROM (persona p LEFT JOIN persona_has_curso pc ON p.id = pc.persona_id) LEFT JOIN curso c ON pc.curso_id = c.id LIMIT 500; ";

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(sql);
				ResultSet rs = pst.executeQuery();

		) {

			while (rs.next()) {
				mapper(rs, hmPersonas);
			}

		} catch (SQLException e) {

			e.printStackTrace();
		}

		return new ArrayList<Persona>(hmPersonas.values());
	}

	@Override
	public Persona getById(int id) throws Exception {
		String sql = "SELECT p.id as persona_id, p.nombre as persona_nombre, p.avatar as persona_avatar, p.sexo as persona_sexo, c.id as curso_id, c.nombre as curso_nombre,"
				+ " c.precio as curso_precio, c.imagen  as curso_imagen FROM (persona p LEFT JOIN persona_has_curso pc ON p.id = pc.persona_id) LEFT JOIN curso c ON pc.curso_id = c.id WHERE p.id="+ id + ";";

		Persona registro = null;
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(sql);
		) {

			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			try( ResultSet rs = pst.executeQuery() ){
			
				HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();
				if( rs.next() ) {					
					mapper(rs, hmPersonas);
				}else {
					throw new Exception("Registro no encontrado para id = " + id);
				}
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registro;
	}

	@Override
	public Persona delete(int id) throws Exception, SQLException {
		Persona registro = null;
		String sql = "DELETE FROM persona WHERE id = ?; ";
		// recuperar persona antes de eliminar
		registro = getById(id);

		try (Connection con = ConnectionManager.getConnection(); PreparedStatement pst = con.prepareStatement(sql);) {

			pst.setInt(1, id);

			int affetedRows = pst.executeUpdate();
			if (affetedRows != 1) {
				throw new Exception("No se puede eliminar registro " + id);
			}

		} catch (SQLException e) {

			throw new SQLException("No se puede eliminar registro " + e.getMessage());
		}

		return registro;
	}

	@Override
	public Persona insert(Persona pojo) throws Exception, SQLException {
		Connection con = ConnectionManager.getConnection();
		PreparedStatement ps = con.prepareStatement("INSERT INTO persona ( nombre, avatar, sexo) VALUES ( ?, ?, ? );");

		ps.setString(1, pojo.getNombre());
		ps.setString(2, pojo.getAvatar());
		ps.setString(3, pojo.getSexo());

		ps.executeUpdate();

		return pojo;
	}

	@Override
	public Persona update(Persona pojo) throws Exception, SQLException {

		Connection con = ConnectionManager.getConnection();
		PreparedStatement ps = con.prepareStatement("UPDATE persona SET nombre=?,avatar=?,sexo=? WHERE id=?");

		ps.setString(1, pojo.getNombre());
		ps.setString(2, pojo.getAvatar());
		ps.setString(3, pojo.getSexo());
		ps.setInt(4, pojo.getId());

		ps.executeUpdate();

		return pojo;
	}

	private void mapper(ResultSet rs, HashMap<Integer, Persona> hm) throws SQLException {

		int key = rs.getInt("persona_id");

		Persona p = hm.get(key);

		// si no existe en el hm se crea
		if (p == null) {

			p = new Persona();
			p.setId(key);
			p.setNombre(rs.getString("persona_nombre"));
			p.setAvatar(rs.getString("persona_avatar"));
			p.setSexo(rs.getString("persona_sexo"));

		}

		// se añade el curso
		int idCurso = rs.getInt("curso_id");
		if (idCurso != 0) {
			Curso c = new Curso();
			c.setId(idCurso);
			c.setNombre(rs.getString("curso_nombre"));
			c.setPrecio(rs.getFloat("curso_precio"));
			c.setImagen(rs.getString("curso_imagen"));
			p.getCursos().add(c);
		}

		// actualizar hashmap
		hm.put(key, p);

	}

}
