package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Curso;

public class CursoDAO implements IDAO<Curso> {
	private static final Logger LOGGER = Logger.getLogger(CursoDAO.class.getCanonicalName());
	// SINGLETON

	private final static CursoDAO INSTANCIA = new CursoDAO();

	private CursoDAO() {

	}

	public static CursoDAO getInstancia() {
		return INSTANCIA;
	}

	// FIN SINGLETON

	@Override
	public List<Curso> getAll() {

		ArrayList<Curso> registros = new ArrayList<Curso>();
		String sql = "SELECT * FROM curso ORDER BY id LIMIT 500;";

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(sql);
				ResultSet rs = pst.executeQuery();

		) {

			while (rs.next()) {

				Curso p = new Curso();
				p.setId(rs.getInt("id"));
				p.setNombre(rs.getString("nombre"));
				p.setPrecio(Float.parseFloat(rs.getString("precio")));

				registros.add(p);

			}

		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registros;
	}
	
	public List<Curso> getPorNombre( String buscador ) {
		LOGGER.info("getPorNombre");		
		ArrayList<Curso> registros = new ArrayList<Curso>();
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement("SELECT * FROM curso WHERE nombre LIKE ? ORDER BY id DESC LIMIT 500; ");
				) {

			pst.setString(1,"%"+buscador+"%");
			
			try( ResultSet rs = pst.executeQuery() ){
				LOGGER.info(pst.toString());			
				while( rs.next() ) {	
					
					Curso c = new Curso();
					c.setId(rs.getInt("id"));
					c.setNombre(rs.getString("nombre"));
					c.setPrecio(Float.parseFloat(rs.getString("precio")));
					
					registros.add(c);				
				}	
			}	
			
		} catch (SQLException e) {
			e.printStackTrace();		
		}
		return registros;
	}
	
	
//
//	@Override
//	public Curso getById(int id) throws Exception {
//		ArrayList<Curso> registros = new ArrayList<Curso>();
//		String sql = "SELECT id, nombre, avatar, sexo FROM Curso 	WHERE id=" + id + ";";
//		Curso p = new Curso();
//
//		try (Connection con = ConnectionManager.getConnection();
//				PreparedStatement pst = con.prepareStatement(sql);
//				ResultSet rs = pst.executeQuery();
//
//		) {
//
//			while (rs.next()) {
//
//				p.setId(rs.getInt("id"));
//				p.setNombre(rs.getString("nombre"));
//				p.setAvatar(rs.getString("avatar"));
//				p.setSexo(rs.getString("sexo"));
//
//			}
//
//		} catch (SQLException e) {
//
//			e.printStackTrace();
//		}
//
//		return p;
//	}
//
//	@Override
//	public Curso delete(int id) throws Exception, SQLException {
//		String sql = "DELETE FROM Curso WHERE id = ?; ";
//		Curso registro = null;
//		registro = getById(id);
//
//		try (Connection con = ConnectionManager.getConnection(); PreparedStatement pst = con.prepareStatement(sql);) {
//
//			pst.setInt(1, id);
//
//			int affetedRows = pst.executeUpdate();
//			if (affetedRows != 1) {
//				throw new Exception("No se puede eliminar registro " + id);
//			}
//
//		} catch (SQLException e) {
//
//			throw new Exception("No se puede eliminar registro " + e.getMessage());
//		}
//
//		return registro;
//	}
//
//	@Override
//	public Curso insert(Curso pojo) throws Exception, SQLException {
//		Connection con = ConnectionManager.getConnection();
//		PreparedStatement ps = con
//				.prepareStatement("INSERT INTO Curso ( nombre, avatar, sexo) VALUES ( ?, ?, ? );");
//
//		ps.setString(1, pojo.getNombre());
//		ps.setString(2, pojo.getAvatar());
//		ps.setString(3, pojo.getSexo());
//
//		ps.executeUpdate();
//
//		return pojo;
//	}
//
//	@Override
//	public Curso update(Curso pojo) throws Exception, SQLException {
//
//		Connection con = ConnectionManager.getConnection();
//		PreparedStatement ps = con.prepareStatement("UPDATE Curso SET nombre=?,avatar=?,sexo=? WHERE id=?");
//
//		ps.setString(1, pojo.getNombre());
//		ps.setString(2, pojo.getAvatar());
//		ps.setString(3, pojo.getSexo());
//		ps.setInt(4, pojo.getId());
//
//		ps.executeUpdate();
//
//		return pojo;
//	}

	@Override
	public Curso getById(int id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Curso delete(int id) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Curso insert(Curso pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Curso update(Curso pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

}
