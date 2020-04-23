package com.ipartek.formacion.api.controller;

import java.util.ArrayList;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Noticia;
import com.ipartek.formacion.model.dao.NoticiaDAO;


@Path("/noticias")
@Produces("application/json")
@Consumes("application/json")
public class NoticiaController {

	private static final Logger LOGGER = Logger.getLogger(NoticiaController.class.getCanonicalName());


	private ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	private Validator validator = factory.getValidator();

	@Context
	private ServletContext context;


	public NoticiaController() {
		super();
	}
	@GET
	public Response getAll() {
		
		LOGGER.info("getAll noticias");		
		ArrayList<Noticia> registros = new ArrayList<Noticia>(); 
		NoticiaDAO noticiaDAO = NoticiaDAO.getInstancia();
		
		registros = (ArrayList<Noticia>) noticiaDAO.getAll();			

		Response response = Response.status(Status.OK).entity(registros).build();
		
		return response;
	}
	

}
