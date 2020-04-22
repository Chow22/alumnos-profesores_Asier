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

				Curso c = new Curso();
				c.setId(rs.getInt("id"));
				c.setNombre(rs.getString("nombre"));
				c.setImagen(rs.getString("imagen"));
				c.setPrecio(Float.parseFloat(rs.getString("precio")));

				registros.add(c);

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
					c.setImagen(rs.getString("imagen"));
					c.setPrecio(rs.getFloat("precio"));
					
					registros.add(c);				
				}	
			}	
			
		} catch (SQLException e) {
			e.printStackTrace();		
		}
		return registros;
	}
	
	
	@Override
	public Curso getById(int id) throws Exception {
		String sql="SELECT id, nombre, precio, imagen FROM curso WHERE id = ?; ";
		Curso registro = null;
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(sql);
		) {

			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			try( ResultSet rs = pst.executeQuery() ){			
				
				if( rs.next() ) {					
					Curso c = new Curso();
					c.setId(rs.getInt("id"));
					c.setNombre(rs.getString("nombre"));
					c.setImagen(rs.getString("imagen"));
					c.setPrecio(rs.getFloat("precio"));
					
					registro=c;	
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
	public Curso delete(int id) throws Exception, SQLException {
		String sql = "DELETE FROM Curso WHERE id = ?; ";
		Curso registro = null;
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
	public Curso insert(Curso pojo) throws Exception, SQLException {
		Connection con = ConnectionManager.getConnection();
		PreparedStatement ps = con
				.prepareStatement("INSERT INTO Curso ( nombre, avatar, sexo) VALUES ( ?, ?, ? );");

		ps.setString(1, pojo.getNombre());
		ps.setString(2, pojo.getImagen());
		ps.setFloat(3, pojo.getPrecio());

		ps.executeUpdate();

		return pojo;
	}

	@Override
	public Curso update(Curso pojo) throws Exception, SQLException {

		Connection con = ConnectionManager.getConnection();
		PreparedStatement ps = con.prepareStatement("UPDATE Curso SET nombre=?,avatar=?,sexo=? WHERE id=?");

		ps.setString(1, pojo.getNombre());
		ps.setString(2, pojo.getImagen());
		ps.setFloat(3, pojo.getPrecio());
		ps.setInt(4, pojo.getId());

		ps.executeUpdate();

		return pojo;
	}


}
