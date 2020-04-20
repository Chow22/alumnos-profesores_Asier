package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ipartek.formacion.model.Persona;

public class PersonaDAO implements IDAO<Persona> {
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
		String sql = "SELECT id, nombre, avatar, sexo FROM persona ORDER BY id DESC LIMIT 500";

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(sql);
				ResultSet rs = pst.executeQuery();

		) {

			while (rs.next()) {

				Persona p = new Persona();
				p.setId(rs.getInt("id"));
				p.setNombre(rs.getString("nombre"));
				p.setAvatar(rs.getString("avatar"));
				p.setSexo(rs.getString("sexo"));

				registros.add(p);

			}

		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registros;
	}

	@Override
	public Persona getById(int id) throws Exception {
		ArrayList<Persona> registros = new ArrayList<Persona>();
		String sql = "SELECT id, nombre, avatar, sexo FROM Persona 	WHERE id=" + id + ";";
		Persona p = new Persona();

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(sql);
				ResultSet rs = pst.executeQuery();

		) {

			while (rs.next()) {

				p.setId(rs.getInt("id"));
				p.setNombre(rs.getString("nombre"));
				p.setAvatar(rs.getString("avatar"));
				p.setSexo(rs.getString("sexo"));

			}

		} catch (SQLException e) {

			e.printStackTrace();
		}

		return p;
	}

	@Override
	public Persona delete(int id) throws Exception, SQLException {
		String sql = "DELETE FROM persona WHERE id = ?; ";
		Persona registro = null;
		registro = getById(id);

		try (Connection con = ConnectionManager.getConnection(); PreparedStatement pst = con.prepareStatement(sql);) {

			pst.setInt(1, id);

			int affetedRows = pst.executeUpdate();
			if (affetedRows != 1) {
				throw new Exception("No se puede eliminar registro " + id);
			}

		} catch (SQLException e) {

			throw new Exception("No se puede eliminar registro " + e.getMessage());
		}

		return registro;
	}

	@Override
	public Persona insert(Persona pojo) throws Exception, SQLException {
		Connection con = ConnectionManager.getConnection();
		PreparedStatement ps = con
				.prepareStatement("INSERT INTO persona ( nombre, avatar, sexo) VALUES ( ?, ?, ? );");

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

}
