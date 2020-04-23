package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ipartek.formacion.model.Noticia;

public class NoticiaDAO implements IDAO<Noticia> {
	private final static NoticiaDAO INSTANCIA = new NoticiaDAO();

	private NoticiaDAO() {

	}

	public static NoticiaDAO getInstancia() {
		return INSTANCIA;
	}

	// FIN SINGLETON

	@Override
	public List<Noticia> getAll() {

		ArrayList<Noticia> registros = new ArrayList<Noticia>();
		String sql = "SELECT * FROM noticia ORDER BY id LIMIT 500;";

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(sql);
				ResultSet rs = pst.executeQuery();

		) {

			while (rs.next()) {

				Noticia noti = new Noticia();
				noti.setId(rs.getInt("id"));
				noti.setTitulo(rs.getString("titulo"));
				noti.setFecha(rs.getDate("fecha"));
				noti.setContenido(rs.getString("contenido"));

				registros.add(noti);

			}

		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registros;
	}

	@Override
	public Noticia getById(int id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Noticia delete(int id) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Noticia insert(Noticia pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Noticia update(Noticia pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}
	



}
